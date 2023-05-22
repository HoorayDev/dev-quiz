import { FC, ReactNode } from 'react';
import styles from '~/components/reusable/DQButton.module.scss';

interface DQButtonProps {
  children: ReactNode;
};

const DQButton: FC<DQButtonProps> = ({
  children
}) => {
  return <button className={styles.dqButton}>{children}</button>
};

export { DQButton };