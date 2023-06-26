import { useRouter } from 'next/router';
import styles from '~/pages/play/index.module.scss';
import QuizProgressBar from '~/components/play/quizProgressBar';
import QuizCardList from '~/components/play/quizCardList';
import { QuizCardListType } from '~/components/play/quizCardList';
import { useQuery } from '@tanstack/react-query';
import { getQuizSetListAPI, getQuizSetAPI } from '~/apis/initial';
import { DQButton } from '~/components/reusable/DQButton'
import { useEffect,useMemo, useState } from "react";
import ForwardArrow from '~/images/caret-forward.svg';
import Splash from '~/pages/splash';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { RootState } from '~/store/store'
import { setQuizInfo } from '~/store/slices/inProgressQuizIdSlice';

const Play = () => {
    const dispatch = useAppDispatch();
    const { value: { quizSetId } } = useAppSelector((state:RootState) => state.inProgressQuizId);
    const { query: { step, id } } = useRouter()
    const { data: getQuizSetData, isLoading, isError, refetch } = useQuery(['getQuizSetAPI'], () => getQuizSetAPI(quizSetId), {
        staleTime: 3000,
        cacheTime: Infinity,
        retry: 3,
        onSuccess: ({ data: { quizIdList } }) => dispatch(setQuizInfo({ quizId: quizIdList[Number(step) - 1], quizSetId })),
    });

    useEffect(function updateQuizIdInQuizInfo(){
        if(isLoading || isError) return

        dispatch(setQuizInfo({ quizId: getQuizSetData.data.quizIdList[Number(step) - 1], quizSetId }));
    }, [step])

    return (
        <div>
            {isLoading && <Splash />}
            {!isLoading && (
                <>
                    <QuizProgressBar
                        maxValue={[...getQuizSetData.data.quizIdList].length}
                        currentValue={Number(step)}
                    />
                    <QuizCardList
                        maxValue={[...getQuizSetData.data.quizIdList].length}
                        type={QuizCardListType.play}
                    />
                </>
            )}
        </div>
    )
}

export default Play;
