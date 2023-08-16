import { FC } from 'react';
import styles from '~/components/reusable/DQFooter.module.scss';

const DQFooter: FC = () => {
  return (
      <div className={styles.footerWrapper}>
        <p className={styles.copyRight}>© 2023 Hooray. All Rights Reserved.</p>
      </div>
  )
}

export { DQFooter };
