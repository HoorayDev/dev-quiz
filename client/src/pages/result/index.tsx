import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DQButton } from '~/components/reusable/DQButton';
import styles from '~/pages/result/styles/index.module.scss';
import Forward from '~/images/caret-forward.svg';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store';
import { show,hide } from '~/store/slices/toast';
import { INCORRECT, HOME } from '~/constants/routing';
import { Toast } from '~/components/Portal/Toast/toast';
import { DQInput } from '~/components/reusable/DQInput';

const Result: FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state:RootState) => state.toast);
  const { push } = useRouter();
  console.log(value)


  return <div>
    <h1 className={styles.title}>채점 결과를 확인해보세요!</h1>
    <div className={styles.resultGrid}>
      <div className={`${styles.block} ${styles.correct}`}>
        <p className={styles.blockText}>정답</p>
        <p className={styles.blockNumber}>3</p>
      </div>
      <div className={`${styles.block} ${styles.wrong}`}>
        <p className={styles.blockText}>오답</p>
        <p className={styles.blockNumber}>7</p>
      </div>
    </div>

    <div className={styles.buttonContainer}>
      <DQButton hasIcon onClick={()=> push(HOME.href)}>홈으로</DQButton>
      <DQButton hasIcon onClick={()=> dispatch(show('test'))}>결과 공유하기</DQButton>
      <DQButton hasIcon onClick={()=> push(INCORRECT.href)}>틀린문제 확인하기</DQButton>
      <Toast
        config={{ duration: 3000 }}
      > TOAST TEST </Toast>
    </div>
    <div className={styles.inputContainer}>
      <DQInput type="subscription" onSubmit={()=>{console.log('구독!')}} />
      <p>・ 문제 업데이트 시 알림 받을 이메일을 입력</p>
    </div>
  </div>;
};

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});
export default Result;