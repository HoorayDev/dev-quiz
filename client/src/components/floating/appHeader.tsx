import { FC } from "react";
import styles from '~/components/floating/appHeader.module.scss';
// import Logo from '~/images/hooray_logo.svg'

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  return <nav className={`${styles.nav} ${styles.flexRow}`}>
    {/*<Logo />*/}
    <div className={`${styles.flexRow} ${styles.navMenu}`}>
      <p>홈</p>
      <p>팀소개</p>
      <p>패치노트</p>
    </div>
  </nav>
}

export { AppHeader };
