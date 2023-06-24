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

const Play = () => {
    const { query: { step, id } } = useRouter()
    const { data: getQuizSetData, isLoading, isError } = useQuery(['getQuizSetAPI'], () => getQuizSetAPI(id as string), {
        staleTime: 3000,
        cacheTime: Infinity,
        retry: 3,
    });

    const quizIdList: string[] = useMemo(() => {
        if(isLoading || isError) return []

        return getQuizSetData.data.quizIdList
    }, [getQuizSetData])

    return (
        <div>
            {isLoading && <Splash />}
            {!isLoading && (
                <>
                    <QuizProgressBar
                        maxValue={quizIdList.length}
                        currentValue={Number(step)}
                    />
                    <QuizCardList
                        type={QuizCardListType.play}
                        quizSetId={id as string}
                        maxValue={quizIdList.length}
                        quizId={quizIdList[Number(step) - 1]}
                    />
                </>
            )}
        </div>
    )
}

export default Play;
