import wrapper from '~/store/index';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { decrement, increment } from '~/store/countSlice';
import { RootState } from '~/store'

const Index =()=>{
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.counter);

  return (
      <div>
        <div>
          <span>{value}</span>
          <div>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
          </div>
        </div>
      </div>
  )
}

export default Index;
