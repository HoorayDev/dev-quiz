import { FC } from "react";
import { useRouter } from 'next/router';
import styles from '~/components/floating/appHeader.module.scss';
import Logo from '~/images/hooray_logo.svg'
import { HOME, PATCH_NOTE,  } from '~/constants/routing'

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  const { push } = useRouter();
  return <nav className={`${styles.nav} ${styles.flexRow}`}>
    <Logo className={styles.logo}/>
    <div className={`${styles.flexRow} ${styles.navMenu}`}>
      <p onClick={()=>push(HOME.href)}>홈</p>
      <p>팀소개</p>
      <p onClick={()=>push(PATCH_NOTE.href)}>패치노트</p>
    </div>
  </nav>
}

export { AppHeader };
