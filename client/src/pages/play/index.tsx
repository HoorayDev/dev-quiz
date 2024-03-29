import { useEffect, useMemo } from "react";
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import styles from '~/pages/play/index.module.scss';
import Spinner from '~/components/reusable/Spinner';
import QuizProgressBar from '~/components/play/quizProgressBar';
import QuizCardList from '~/components/play/quizCardList';
import { QuizCardListType, QuizOptionType } from '~/components/play/quizCardList';
import { getQuizSetAPI, getQuizQuestionAPI, getQuizOptionListAPI } from '~/apis/initial';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { RootState } from '~/store/store'
import { setQuizInfo } from '~/store/slices/inProgressQuizIdSlice';
import RefreshWarningModal from '~/hooks/useRefreshWarning';
import { HOME } from '~/constants/routing';

const Play = () => {
    const dispatch = useAppDispatch();
    const { value: { quizSetId } } = useAppSelector((state:RootState) => state.inProgressQuizId);
    const { query: { step }, push } = useRouter()
    const { value: userAnswerListValue } = useAppSelector((state:RootState) => state.userAnswerList);
    const { data: getQuizSetData, isLoading: isQuizSetLoad, isError: isQuizSetError, refetch: isQuizSetRefetch } = useQuery(
        ['getQuizSetAPI'],
        () => getQuizSetAPI(quizSetId), {
            staleTime: 3000,
            cacheTime: Infinity,
            retry: 2,
            onSuccess: ({ data: { quizIdList } }) => dispatch(setQuizInfo({ quizId: quizIdList[Number(step) - 1], quizSetId })),
        }
    );
    const { data: getQuizQuestionData, isLoading: isQuestionLoad, isError: isQuestionError, refetch: questionRefetch } = useQuery(
        ['getQuizQuestionAPI', quizSetId, getQuizSetData?.data.quizIdList[Number(step) - 1]],
        () => getQuizQuestionAPI(quizSetId, getQuizSetData?.data.quizIdList[Number(step) - 1]), {
            enabled: !!getQuizSetData?.data.quizIdList[Number(step) - 1],
            retry: 2,
        },
    );
    const { data: getQuizOptionListData, isLoading: isOptionListLoad, isError: isOptionListError, refetch: optionListRefetch } = useQuery(
        ['getQuizOptionListAPI', quizSetId, getQuizSetData?.data.quizIdList[Number(step) - 1]],
        () => getQuizOptionListAPI(quizSetId, getQuizSetData?.data.quizIdList[Number(step) - 1]), {
            enabled: !!getQuizSetData?.data.quizIdList[Number(step) - 1],
            retry: 2,
        },
    );

    const isLoading = useMemo(() => {
        return isQuizSetLoad || isQuestionLoad || isOptionListLoad
    }, [isQuizSetLoad, isQuestionLoad, isOptionListLoad])

    const isError = useMemo(() => {
        return isQuizSetError || isQuestionError || isOptionListError
    }, [isQuizSetError, isQuestionError, isOptionListError])

    useEffect(function updateQuizIdInQuizInfo(){
        if(isLoading || isError) return

        dispatch(setQuizInfo({ quizId: getQuizSetData?.data.quizIdList[Number(step) - 1], quizSetId }));
        questionRefetch();
        optionListRefetch();
    }, [step])

    useEffect(function redirectHome(){
        if(!isError) return

        push(HOME.href);
    }, [isError])

    return (
        <div>
            <RefreshWarningModal isOpen={true}/>
            {isLoading && (
                <div className={styles.spinnerContainer}>
                    <Spinner />
                </div>
            )}
            {!isLoading && !isError && (
                <>
                    <QuizProgressBar
                        maxValue={[...getQuizSetData?.data.quizIdList].length}
                        currentValue={Number(step)}
                    />
                    <QuizCardList
                        type={QuizCardListType.play}
                        title={getQuizQuestionData?.data.title}
                        code={getQuizQuestionData?.data.code}
                        options={getQuizOptionListData?.data}
                        quizId={getQuizQuestionData?.data.id}
                        quizLen={getQuizSetData?.data.quizIdList.length}
                    />
                </>
            )}
        </div>
    )
}

export default Play;
