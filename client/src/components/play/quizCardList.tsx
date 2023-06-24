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

enum QuizCardListType {
  play = 'play',
  incorrect = 'incorrect',
}

interface QuizCardListProps {
  type: QuizCardListType;
  maxValue?: number;
}

const QuizCardList = ({ type, maxValue }: QuizCardListProps) => {
  const { asPath, push, query: { step } } = useRouter()
  const dispatch = useAppDispatch();
  const {
    userAnswerList: {
      value: userAnswerListValue
    },
    inProgressQuizId: {
      value: { quizSetId, quizId },
    }
  } = useAppSelector((state:RootState) => state);
  const [selectOption, setSelectOption] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isPlay = type === QuizCardListType.play;
  const isIncorrect = type === QuizCardListType.incorrect;

  const { data: getQuizQuestionData, isLoading: isQuestionLoad, isError: isQuestionError, refetch: questionRefetch } = useQuery(
      ['getQuizQuestionAPI'],
      () => getQuizQuestionAPI(quizSetId, quizId),
      { retry: 3, enabled: isPlay },
  );
  const { data: getQuizOptionListData, isLoading: isOptionListLoad, isError: isOptionListError, refetch: optionListRefetch } = useQuery(
      ['getQuizOptionListAPI'],
      () => getQuizOptionListAPI(quizSetId, quizId),
      { retry: 3, enabled: isPlay },
  );
  const { data: getQuizAnwserListData, isLoading: isQuizAnwserListLoad, isError: isQuizAnwserListError, refetch: quizAnwserListRefetch } = useQuery(
      ['getQuizAnwserListAPI'],
      () => getQuizAnwserListAPI(quizSetId),
      { retry: 3, enabled: isIncorrect },
  );
  const { mutate : setUserAnswerAPIMutation } = useMutation((value: userAnswerValue[]) => setUserAnswerAPI(quizSetId, value), {
    onSuccess: ({ data: { correctCount, inCorrectCount } }) => dispatch(setQuizResult({ correctCount, inCorrectCount })),
  });

  useEffect(function refetchQuizData(){
    questionRefetch();
    optionListRefetch();
  }, [quizSetId, quizId])

  useEffect(function resetSelectOption(){
    setSelectOption([]);
  }, [quizSetId, quizId])

  useEffect(function submitUserAnswer (){
    if(userAnswerListValue.length !== maxValue) return;

    setUserAnswerAPIMutation(userAnswerListValue);
    dispatch(resetUserAnswerList());
  }, [userAnswerListValue])

  const setUserAnswer = () => {
    const checkMultiSelect = selectOption.length === 1 ? selectOption[0] : selectOption
    dispatch(addUserAnswerList({ quizId, selectedOption: checkMultiSelect }));
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

    if(Number(step) === maxValue){
      moveResultPage();
    } else {
      moveNextPage();
    }
  }

  const quizOption = useMemo(() => {
    if(isPlay){
      return (
        <>
          {getQuizOptionListData?.data.map((quizOption: any, index: any) => {
            const key = `${quizOption}${index}`
            const type = selectOption.includes(quizOption.value) ? QuizCardType.select : QuizCardType.default

            return <QuizCard key={key} type={type} title={quizOption.content} onClick={() => setSelectOption([quizOption.value])}/>
          })}
        </>
      )
    }

    return (
      <>
        <QuizCard title={'1'} type={QuizCardType.answer} disabeld/>
        <QuizCard title={'2'} disabeld/>
        <QuizCard title={'3'} type={QuizCardType.select} disabeld/>
        <QuizCard title={'4'} disabeld/>
      </>
    )
  }, [isPlay, getQuizOptionListData, selectOption])

  const bottomButton = useMemo(() => {
    if(isPlay){
      return (
        <DQButton onClick={clickedNextButton} disabled={isEmpty(selectOption)}>
          <ForwardArrow />
          <span className={styles.buttonTitle}>다음 문제 풀기</span>
        </DQButton>
      )
    }

    return (
      <DQButton onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? <UpArrow /> : <DownArrow />}
        <span className={styles.buttonTitle}>문제 해설 보기</span>
      </DQButton>
    )
  }, [isPlay, isOpen, selectOption])

  return (
    <div>
      <div className={styles.playWrapper}>
        <h1 className={styles.quizTitle}>{getQuizQuestionData?.data.title}</h1>
        <div className={styles.quizCardWrapper}>{quizOption}</div>
        <div className={styles.buttonWrapper}>{bottomButton}</div>

        {!isPlay && isOpen && (
          <div className={styles.commentaryWrapper}>
            <div className={styles.answerWrapper}>
              <ForwardArrow />
              <span className={styles.answer}>정답 : Call Stack</span>
            </div>
            <span className={styles.description}>어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCardList
export { QuizCardListType }
