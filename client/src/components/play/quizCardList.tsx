import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery, useQueries } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import styles from '~/components/play/quizCardList.module.scss';
import QuizCard, { QuizCardType } from '~/components/play/quizCard';
import QuizProgressBar from '~/components/play/quizProgressBar';
import { DQButton } from '~/components/reusable/DQButton'
import { RESULT } from '~/constants/routing';
import { getQuizQuestionAPI, getQuizOptionListAPI } from '~/apis/initial';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store'
import { add } from '~/store/userAnswerListSlice';

import ForwardArrow from '~/images/caret-forward.svg';
import UpArrow from '~/images/caret-up.svg';
import DownArrow from '~/images/caret-down.svg';

enum QuizCardListType {
  play = 'play',
  incorrect = 'incorrect',
}

interface QuizCardListProps {
  type: QuizCardListType;
  quizId: string;
  quizSetId: string;
  maxValue: number;
}

const quizCardList = ({ type, quizId, quizSetId, maxValue }: QuizCardListProps) => {
  const { asPath, push, query: { step } } = useRouter()
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.userAnswerList);
  const [selectOption, setSelectOption] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isPlay = type === QuizCardListType.play;

  const playQueryOption = {
    retry: 3,
    enabled: isPlay,
  }

  const { data: getQuizQuestionData, isLoading: isQuestionLoad, isError: isQuestionError, refetch: questionRefetch } = useQuery(
      ['getQuizQuestionAPI'],
      () => getQuizQuestionAPI(quizSetId, quizId),
      playQueryOption,
  );
  const { data: getQuizOptionListData, isLoading: isOptionListLoad, isError: isOptionListError, refetch: optionListRefetch } = useQuery(
      ['getQuizOptionListAPI'],
      () => getQuizOptionListAPI(quizSetId, quizId),
      playQueryOption,
  );

  useEffect(() => {
    questionRefetch();
    optionListRefetch();
  }, [quizSetId, quizId])

  useEffect(() => {
    // console.log('하이')
    setSelectOption([])
  }, [quizSetId, quizId])

  const nextPage = () => {
    const checkMultiSelect = selectOption.length === 1 ? selectOption[0] : selectOption
    dispatch(add({ quizId, selectedOption: checkMultiSelect }));

    if(Number(step) === maxValue){
      return push(RESULT.href)
    }

    const baseUrl = asPath.slice(0, -1)
    const nextStep = Number(step) + 1

    return push(`${baseUrl}${nextStep}`)
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
        <DQButton onClick={nextPage} disabled={isEmpty(selectOption)}>
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

export default quizCardList
export { QuizCardListType }
