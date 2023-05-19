import wrapper from '../store/index';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { decrement, increment } from '../store/countSlice';
import { RootState } from '../store';
import styles from '../styles/index.module.scss';
import { DQButton } from '../components/reusable/DQButton';

const Index =()=>{
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.counter);

  return (
      <div>
        <div>
          <h1>test</h1>
          <span className={styles.movieList}>{value}</span>
          <div>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
            {/* TODO : 방향 삼각형 아이콘 */}
            <DQButton>틀린 문제 확인하기</DQButton>
          </div>
        </div>
      </div>
  )
}

export default Index;
