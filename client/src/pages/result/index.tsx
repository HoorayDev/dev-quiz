import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { FC, ReactNode, useEffect, useState } from 'react';
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
import { subscribeAPI } from '~/apis/initial';
import { useQuery } from '@tanstack/react-query';
import RefreshWarningModal from '~/hooks/useRefreshWarning';
import InfoCollectionAgreementModal from '~/components/Portal/InfoCollectionAgreementModal/InfoCollectionAgreementModal';

const Result: FC = () => {
  const dispatch = useAppDispatch();
  const {
    toast: { message },
    quizResult: { value: { correctCount, inCorrectCount } }
  } = useAppSelector((state: RootState) => state);
  const { push } = useRouter();
  const [subEamil, setSubEmail] = useState<string|undefined>(undefined);
  const [agree, setAgree] = useState<boolean>(false);
  const [infoCollectionModalOpen, setInfoCollectionModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery(['subscription', subEamil], () => {
    subEamil && subscribeAPI(subEamil);
  }, {
    enabled: !!subEamil
  });

  useEffect(function redirectHome(){
    if(correctCount || inCorrectCount) return

    push(HOME.href);
  }, [correctCount, inCorrectCount])

  return (
      <div className={styles.pageLayout}>
        <h1 className={styles.title}>채점 결과를 확인해보세요!</h1>
        <div className={styles.resultGrid}>
          <div className={`${styles.block} ${styles.correct}`}>
            <div className={styles.texts}>
              <p className={styles.blockText}>정답</p>
              <p className={styles.blockNumber}>{correctCount}</p>
            </div>
          </div>
          <div className={`${styles.block} ${styles.wrong}`}>
            <div className={styles.texts}>
              <p className={styles.blockText}>오답</p>
              <p className={styles.blockNumber}>{inCorrectCount}</p>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <DQButton hasIcon onClick={() => push(HOME.href)}>홈으로</DQButton>
          {/* TODO : reveal on next feature */}
          {/*<DQButton hasIcon onClick={() => dispatch(show('test'))}>결과 공유하기</DQButton>유*/}
          <DQButton hasIcon onClick={() => push(INCORRECT.href)}>문제 해설 보기</DQButton>
        </div>
        <div className={styles.inputContainer}>
          <DQInput type='subscription' onSubmit={({ value }) => {
            // TODO : Email 주소 validation
            if(!agree) dispatch(show('⚠️ 개인정보 수집동의가 필요해요!'));
            else {
              setSubEmail(value)
              dispatch(show('🤓 문제지 구독 감사합니다!'));
            }
          }}
          />
          <div className={styles.agreementInputDuo}>
            <input type="checkbox"
              value="agree"
              className={styles.agreeCheckbox}
              checked={agree}
              onClick={() => setAgree(value =>!value) }
            />
            <label
              htmlFor="agreement"
              className={styles.agreeLabel}
              onClick={()=>setInfoCollectionModalOpen(true)}
            >
              개인정보 수집동의
            </label>
          </div>
        </div>
        {infoCollectionModalOpen && (
          <InfoCollectionAgreementModal onClose={() => setInfoCollectionModalOpen(false)} />
        )}
        <Toast
            config={{ duration: 3000 }}
        />
      </div>
  )
};

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});
export default Result;
