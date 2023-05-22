import { useMemo } from "react";
import wrapper from '~/store/index';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { decrement, increment } from '~/store/countSlice';
import { RootState } from '~/store'
import styles from '~/pages/index.module.scss'
import QuizProgressBar from '~/components/quizProgressBar'
import { useState } from 'react'
import ModalPortal from '~/components/Modal/modalPortal';
import LoginModal from '~/components/Modal/LoginModal/LoginModal';

const categoryList = ['Javascript', 'Comming Soon..', 'Comming Soon..', 'Comming Soon..']

const Index =()=>{
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.counter);
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
            <QuizProgressBar maxValue={10} currentValue={5}/>
            <div className={styles.categoryWrapper}>{categoryListCard}</div>
            <button onClick={() => setModalOpen(true)}>로그인</button>
            {modalOpen && (
                <ModalPortal>
                    <LoginModal onClose={() => setModalOpen(false)} />
                </ModalPortal>
            )}
            {/*<span>{value}</span>*/}
            {/*<div>*/}
            {/*    <button onClick={()=>dispatch(increment())}>+</button>*/}
            {/*    <button onClick={()=>dispatch(decrement())}>-</button>*/}
            {/*</div>*/}
        </div>
    )
}

export default Index;
