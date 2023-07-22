import { GetStaticProps } from 'next';
import { useMemo, useEffect, useState } from "react";
import { DefaultStaticProps } from '~/pages/_app';
import { useQuery, useQueries } from '@tanstack/react-query';
import { RootState } from '~/store/store'
import styles from '~/pages/incorrect/index.module.scss';
import { getQuizAnwserListAPI, getQuizOptionListAPI } from '~/apis/initial';
import { useAppSelector } from '~/hooks/useAppSelector';
import Splash from '~/pages/splash';
import QuizCardList from '~/components/play/quizCardList';
import { QuizCardListType, QuizOptionType } from '~/components/play/quizCardList';
import Spinner from '~/components/reusable/Spinner';

interface IncorrectListType {
    answerOptionId: number;
    code: string;
    commentary: string;
    content: string;
    description: string;
    id: number;
    isCorrect: number;
    quizSetId: number;
    title: string;
    userAnswerOptionId: number;
}

const Incorrect = () => {
    const [newList, setNewList] = useState([]);
    const { value: { quizSetId } } = useAppSelector((state:RootState) => state.inProgressQuizId);
    const { data: getQuizAnwserListData , isLoading, isError } = useQuery(
        ['getQuizAnwserListAPI', quizSetId],
        () => getQuizAnwserListAPI(quizSetId),
        {
            retry: 3,
        },
    );

    const icorrectList = useMemo(() => {
        return getQuizAnwserListData?.data.list.map(({ id, code , commentary, content, answerOptionId, userAnswerOptionId }: IncorrectListType) => {
            return (
                <QuizCardList
                    type={QuizCardListType.incorrect}
                    code={code}
                    commentary={commentary}
                    title={content}
                    answerOptionId={answerOptionId}
                    userAnswerOptionId={userAnswerOptionId}
                    quizId={String(id)}
                />
            )
        })
    }, [getQuizAnwserListData])

    return (
        <div>
            {isLoading && (
                <div className={styles.spinnerContainer}>
                    <Spinner />
                </div>
            )}
            {!isLoading && icorrectList}
        </div>
    )
}

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
    props: {
        hasAppHeader: true,
    },
});

export default Incorrect
export { getStaticProps };
