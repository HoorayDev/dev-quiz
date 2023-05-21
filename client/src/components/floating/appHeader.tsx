import { FC } from "react";
import styles from '~/components/floating/appHeader.module.scss';

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  return <nav className={`${styles.nav} ${styles.flexRow}`}>
    <div className={`${styles.flexRow} ${styles.navTitle}`}>
      {/* TODO : svg */}
      <div>🥑</div>
      <div>Hooray</div>
    </div>
    <div className={`${styles.flexRow} ${styles.navMenu}`}>
      <p>홈</p>
      <p>팀소개</p>
      <p>패치노트</p>
    </div>
  </nav>
}

export { AppHeader };