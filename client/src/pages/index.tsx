import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { useMemo } from "react";
import { RootState } from '~/store/store';
import styles from '~/pages/index.module.scss'
import QuizProgressBar from '~/components/quizProgressBar'
import { useState } from 'react'
import ModalPortal from '~/components/Portal/modalPortal';
import LoginModal from '~/components/Portal/LoginModal/LoginModal';
import { DQButton } from '~/components/reusable/DQButton';

const categoryList = ['Javascript', 'Comming Soon..', 'Comming Soon..', 'Comming Soon..']

const Index =()=>{
  const [modalOpen, setModalOpen] = useState<boolean>(); // TODO : modal 사용 예시를 위해 넣어둠

  const categoryListCard = useMemo(() => {
      return categoryList.map((categoryName) => {
          const isCommingSoon = categoryName === 'Comming Soon..'
          const cardStyle = isCommingSoon ?
              `${styles.card} ${styles.commingSoon}` :
              styles.card
          const cardUrl = `${categoryName}`

          return (
              <button className={cardStyle} disabled={isCommingSoon} onClick={() => console.log(cardUrl)}>
                  {categoryName}
              </button>
          )
      })
  }, [categoryList])

    return (
        <div>
            <div className={styles.categoryWrapper}>{categoryListCard}</div>
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
