import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { useMemo, useEffect, useState } from "react";
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store'
import styles from '~/pages/index.module.scss'
import ModalPortal from '~/components/Portal/modalPortal';
import LoginModal from '~/components/Portal/LoginModal/LoginModal';
import { DQButton } from '~/components/reusable/DQButton';
import { PLAY } from '~/constants/routing'
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getQuizSetListAPI, setLoginAPI, getQuizSetAPI } from '~/apis/initial';
import { upperFirst } from 'lodash';
import { Toast, ToastType } from '~/components/Portal/Toast/toast';
import { show,hide } from '~/store/slices/toast';
import { setQuizInfo, resetQuizInfo } from '~/store/slices/inProgressQuizIdSlice';
import { resetUserAnswerList } from '~/store/slices/userAnswerListSlice';

const Index =()=>{
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state:RootState) => state.toast);
  const { push } = useRouter()

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [selectQuizSetId, setSelectQuizSetId] = useState<string>();

  const { data: getQuizSetListData, isLoading, isError } = useQuery(['getQuizSet'], () => getQuizSetListAPI(), {
      staleTime: 3000,
      cacheTime: Infinity,
      retry: 3,
  });

  const quizSetList = useMemo(() => {
      const quizSetList = getQuizSetListData?.data?.list ?? [];
      const baseLength = 4
      const comingSoonArr = new Array(baseLength - quizSetList.length).fill({ category: 'Coming Soon..'});
      const quizArr = [...quizSetList, ...comingSoonArr];

      return quizArr.map((data: any, index: any) => {
          const { category, id } = data;
          const key = `${category}${index}`;
          const isComingSoon = category === 'Coming Soon..';
          const cardStyle = isComingSoon ?
              `${styles.card} ${styles.comingSoon}` :
              styles.card;

          return (
              <button key={key} className={cardStyle} disabled={isComingSoon} onClick={() => {
                  dispatch(resetQuizInfo());
                  setSelectQuizSetId(id)
                  setLoginModalOpen(true)
              }}>
                  {upperFirst(category)}
              </button>
          )
      })
  }, [getQuizSetListData])

    const modalSubmit = (value: string) => {
        setLoginAPI(value)
            .then(data => {
                dispatch(resetUserAnswerList());
                dispatch(setQuizInfo({ quizSetId: selectQuizSetId }));
                setLoginModalOpen(false);
                push(`${PLAY.href}?step=1`);
            })
            .catch(err => {
                console.error(err)
                setLoginModalOpen(false);

                if(err.response.status === 400){
                  return dispatch(show('이미 존재하는 유저입니다.'));
                }

                return dispatch(show('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.'));
            });
    }

    return (
        <div>
            <div className={styles.categoryWrapper}>
                {quizSetList}
            </div>
            {loginModalOpen && (
                <LoginModal onSubmit={({ value }) => modalSubmit(value)} onClose={() => setLoginModalOpen(false)} />
            )}
            <Toast
                type={ToastType.error}
                config={{ duration: 3000 }}
            />
        </div>
    )
}

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});


export default Index;
export { getStaticProps };
