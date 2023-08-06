import styles from '~/pages/splash.module.scss'
import Logo from '~/images/hooray_logo.svg'

const Splash = ()=>{
  return <div className={styles.loader}>
      <Logo color={'black'}/>
      <p>page loading ...</p>
  </div>
}

export default Splash;
