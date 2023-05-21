import { useMemo } from "react";
import wrapper from '~/store/index';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { decrement, increment } from '~/store/countSlice';
import { RootState } from '~/store'
import styles from '~/pages/index.module.scss'

const categoryList = ['Javascript', 'Comming Soon..', 'Comming Soon..', 'Comming Soon..']

const Index =()=>{
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state:RootState) => state.counter);

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
          {/*<span>{value}</span>*/}
          {/*<div>*/}
          {/*    <button onClick={()=>dispatch(increment())}>+</button>*/}
          {/*    <button onClick={()=>dispatch(decrement())}>-</button>*/}
          {/*</div>*/}
      </div>
  )
}

export default Index;
