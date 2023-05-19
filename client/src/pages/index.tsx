import wrapper from '../store/index';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { decrement, increment } from '../store/countSlice';
import { RootState } from '../store'
import styles from '../styles/index.module.scss'
import { useState } from 'react'
import ModalPortal from '~/components/Modal/modalPortal';
import LoginModal from '~/components/Modal/LoginModal/LoginModal';

const Index =()=>{
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.counter);
  const [modalOpen, setModalOpen] = useState<boolean>(); // TODO : modal 사용 예시를 위해 넣어둠

  return (
      <div>
        <div>
            <button onClick={() => setModalOpen(true)}>로그인</button>
          <span className={styles.movieList}>{value}</span>
          <div>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
          </div>
            {modalOpen && (
                <ModalPortal>
                    <LoginModal onClose={() => setModalOpen(false)} />
                </ModalPortal>
            )}
        </div>
      </div>
  )
}

export default Index;
