import { FC } from "react";
import { useRouter } from 'next/router';
import styles from '~/components/floating/appHeader.module.scss';
import Logo from '~/images/hooray_logo.svg'
import { HOME, PATCH_NOTE, INTRODUCTION } from '~/constants/routing'

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  const { push } = useRouter();
  return (
      <nav className={`${styles.nav} ${styles.flexRow}`}>
        <Logo className={styles.logo} onClick={()=>push(HOME.href)}/>
        <div className={`${styles.flexRow} ${styles.navMenu}`}>
          <div onClick={()=>push(HOME.href)}>
            <p>홈</p>
          </div>
          <div onClick={()=>push(INTRODUCTION.href)}>
            <p>팀소개</p>
          </div>
          <div onClick={()=>push(PATCH_NOTE.href)}>
            <p>패치노트</p>
          </div>
        </div>
      </nav>
  )
}

export { AppHeader };
