import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import styles from '~/components/play/quizCardList.module.scss';
import QuizCard, { QuizCardType } from '~/components/play/quizCard';
import QuizProgressBar from '~/components/play/quizProgressBar';
import { DQButton } from '~/components/reusable/DQButton'
import { RESULT } from '~/constants/routing';
import { getQuizQuestionAPI, getQuizOptionListAPI, setUserAnswerAPI, getQuizAnwserListAPI } from '~/apis/initial';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store'
import { addUserAnswerList, resetUserAnswerList, userAnswerValue } from '~/store/slices/userAnswerListSlice';
import ForwardArrow from '~/images/caret-forward.svg';
import UpArrow from '~/images/caret-up.svg';
import DownArrow from '~/images/caret-down.svg';
import { setQuizResult, resetQuizResult } from '~/store/slices/quizResultSlice';
import CodeBlock from '~/components/play/CodeBlock';

interface QuizOptionType {
    "id": number,
    "content": string,
    "value": number,
    "createdAt": string,
    "updatedAt": string
}

enum QuizCardListType {
    play = 'play',
    incorrect = 'incorrect',
}

interface QuizCardListProps {
    quizId?: string;
    type: QuizCardListType;
    title: string;
    options?: QuizOptionType[];
    code?: string;
    commentary?: string;
    answerOptionId?: number;
    userAnswerOptionId?: number;
    quizLen?: number;
}

const QuizCardList = ({ type, title, options, code, commentary, quizId, answerOptionId, userAnswerOptionId, quizLen }: QuizCardListProps) => {
    const { asPath, push, query: { step } } = useRouter()
    const dispatch = useAppDispatch();
    const {
        userAnswerList: {
            value: userAnswerListValue
        },
        inProgressQuizId: {
            value: { quizSetId },
        }
    } = useAppSelector((state:RootState) => state);
    const [selectOptionId, setSelectOptionId] = useState<number[]>([])
    const [answerOptionValue, setAnswerOptionValue] = useState<string>('');
    const [isCommentaryOpen, setIsCommentaryOpen] = useState<boolean>(false);
    const isPlay = type === QuizCardListType.play;
    const isIncorrect = type === QuizCardListType.incorrect;

    const { data: getQuizOptionListData, isLoading: isOptionListLoad, isError: isOptionListError, refetch: optionListRefetch } = useQuery(
        ['getQuizOptionListAPI', quizSetId, String(quizId)],
        () => getQuizOptionListAPI(quizSetId, String(quizId)), {
            retry: 3,
            enabled: isIncorrect,
        },
    );

    const { mutate : setUserAnswerAPIMutation } = useMutation((value: userAnswerValue[]) => setUserAnswerAPI(quizSetId, value), {
        onSuccess: ({ data: { correctCount, inCorrectCount } }) => dispatch(setQuizResult({ correctCount, inCorrectCount })),
    });

    useEffect(function resetSelectOption(){
        setSelectOptionId([]);
    }, [quizId])

    useEffect(function submitUserAnswer (){
        const isLastStep = Number(step) === quizLen;
        const isSolvedAllQuizs = userAnswerListValue.length === quizLen

        if(!isLastStep || !isSolvedAllQuizs) return;

        setUserAnswerAPIMutation(userAnswerListValue);
    }, [userAnswerListValue, quizLen])

    const setUserAnswer = () => {
        const optionId = selectOptionId.length === 1 ? selectOptionId[0] : selectOptionId

        dispatch(addUserAnswerList({ quizId, selectedOptionId: optionId }));
    }

    const moveNextPage = () => {
        const baseUrl = asPath.slice(0, -1)
        const nextStep = Number(step) + 1

        return push(`${baseUrl}${nextStep}`)
    }

    const moveResultPage = () => {
        return push(RESULT.href);
    }

    const clickedNextButton = () => {
        setUserAnswer();

        if(Number(step) === quizLen){
            moveResultPage();
        } else {
            moveNextPage();
        }
    }

    const quizOptionList = useMemo(() => {
        if(isIncorrect && !isOptionListLoad && !isOptionListError){
            return getQuizOptionListData?.data.map(({ id: optionId, content, value }: QuizOptionType) => {
                if(userAnswerOptionId === optionId){
                    return <QuizCard title={content} type={QuizCardType.select} disabeld />;
                }

                if(answerOptionId === optionId){
                    setAnswerOptionValue(content);
                    return <QuizCard title={content} type={QuizCardType.answer} disabeld />;
                }

                return <QuizCard title={content} disabeld/>
            });
        }

         return options?.map((quizOption: any, index: any) => {
            const key = `${quizOption}${index}`
            const type = selectOptionId.includes(quizOption.id) ? QuizCardType.select : QuizCardType.default

            return <QuizCard key={key} type={type} title={quizOption.content} onClick={() => setSelectOptionId([quizOption.id])}/>
        })
    }, [isPlay, options, selectOptionId, getQuizOptionListData])

    const bottomButton = useMemo(() => {
        if(isPlay){
            return (
                <DQButton onClick={clickedNextButton} disabled={isEmpty(selectOptionId)}>
                    <ForwardArrow />
                    <span className={styles.buttonTitle}>다음 문제 풀기</span>
                </DQButton>
            )
        }

        return (
            <DQButton onClick={() => setIsCommentaryOpen(prev => !prev)}>
                {isCommentaryOpen ? <UpArrow /> : <DownArrow />}
                <span className={styles.buttonTitle}>문제 해설 보기</span>
            </DQButton>
        )
    }, [isPlay, isCommentaryOpen, selectOptionId])

    const commentaryBlock = useMemo(() => {
        if(!isIncorrect || !isCommentaryOpen) return

        return (
            <div className={styles.commentaryWrapper}>
                <div className={styles.answerWrapper}>
                    <ForwardArrow />
                    <span className={styles.answer}>정답 : {answerOptionValue}</span>
                </div>
                <span className={styles.description}>{commentary}</span>
            </div>
        )
    }, [isIncorrect, isCommentaryOpen, answerOptionValue])

    return (
        <div>
            <div className={styles.playWrapper}>
                <div className={styles.quizTitleCodeBlockWrapper}>
                    <h1 className={styles.quizTitle}>{title}</h1>
                    {code && <CodeBlock code={code} />}
                </div>
                <div className={styles.quizCardWrapper}>{quizOptionList}</div>
                <div className={styles.buttonWrapper}>{bottomButton}</div>
                <>{commentaryBlock}</>
            </div>
        </div>
    )
}

export default QuizCardList
export type { QuizOptionType }
export { QuizCardListType }
