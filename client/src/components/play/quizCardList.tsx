import { useState, useMemo } from "react";
import { useRouter } from 'next/router';
import styles from '~/components/play/quizCardList.module.scss';
import QuizCard, { QuizCardType } from '~/components/play/quizCard';
import QuizProgressBar from '~/components/play/quizProgressBar';
import { DQButton } from '~/components/reusable/DQButton'
import { RESULT } from '~/constants/routing';
import { isEmpty } from 'lodash';

import { useAppSelector } from '~/hooks/useAppSelector';
import { RootState } from '~/store/store'

import ForwardArrow from '~/images/caret-forward.svg';
import UpArrow from '~/images/caret-up.svg';
import DownArrow from '~/images/caret-down.svg';

enum QuizCardListType {
  play = 'play',
  incorrect = 'incorrect',
}

interface QuizCardListProps {
  type: QuizCardListType;
}

const quizCardList = ({ type }: QuizCardListProps) => {
  const { asPath, push, query: { step } } = useRouter()
  const [selectOption, setSelectOption] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isPlay = type === QuizCardListType.play;

  const nextPage = () => {
    // TODO : 정답 체크 api 호출 후 then 내부에 state 초기화를 위해 setSelectOption([]) 추가
    setSelectOption([])

    if(Number(step) === 10){
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
          {['1', '2', '3', '4'].map((e, index) => {
            const key = `${e}${index}`
            const type = selectOption.includes(index) ? QuizCardType.select : QuizCardType.default

            return <QuizCard key={key} type={type} title={e} onClick={() => setSelectOption([index])}/>
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
  }, [isPlay, selectOption])

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
        <h1 className={styles.quizTitle}>실행 컨텍스트(Execution context)가 쌓이는 위치는 어디일까요?</h1>
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
