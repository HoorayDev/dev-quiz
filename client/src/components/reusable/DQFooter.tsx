import { FC } from 'react';
import styles from '~/components/reusable/DQFooter.module.scss';

const DQFooter: FC = () => {
  return <div className={styles.footerWrapper}>© 2023 Hooray. All Rights Reserved.</div>
}

export { DQFooter };