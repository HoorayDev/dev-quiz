import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { useMemo, useEffect, useState } from "react";
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { add } from '~/store/incorrectSlice';
import { RootState } from '~/store/store'
import styles from '~/pages/index.module.scss'
import ModalPortal from '~/components/Portal/modalPortal';
import LoginModal from '~/components/Portal/LoginModal/LoginModal';
import { DQButton } from '~/components/reusable/DQButton';
import { PLAY } from '~/constants/routing'
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getQuizSetAPI, setUserIdAPI } from '~/apis/initial';
import { upperFirst } from 'lodash';

const Index =()=>{
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>();
  const [selectCategory, setSelectCategory] = useState<string>();
  const { push } = useRouter()
  // TODO : api 완성 후 url 교체
  const { data: getQuizSetData, isLoading, isError } = useQuery(['getQuizSet'], getQuizSetAPI);

  const quizSetList = useMemo(() => {
      if(isLoading || isError) return

      const baseLength = 4
      const comingSoonArr = new Array(baseLength - getQuizSetData.length).fill({ category: 'Coming Soon..'});
      const quizArr = [...getQuizSetData, ...comingSoonArr];

      return quizArr.map((data: any, index: any) => {
          const { category } = data;
          const key = `${category}${index}`;
          const isComingSoon = category === 'Coming Soon..';
          const cardStyle = isComingSoon ?
              `${styles.card} ${styles.comingSoon}` :
              styles.card;

          return (
              <button key={key} className={cardStyle} disabled={isComingSoon} onClick={() => {
                  setSelectCategory(category)
                  setLoginModalOpen(true)
              }}>
                  {upperFirst(category)}
              </button>
          )
      })
  }, [getQuizSetData])

    const modalSubmit = (value: string) => {
        setUserIdAPI(value)
            .then(data => {
                setLoginModalOpen(false)
                push(`${PLAY.href}?type=${selectCategory}&step=1`)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <div className={styles.categoryWrapper}>
                {quizSetList}
            </div>
            {loginModalOpen && (
                <LoginModal onSubmit={({ value }) => modalSubmit(value)} onClose={() => setLoginModalOpen(false)} />
            )}
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
