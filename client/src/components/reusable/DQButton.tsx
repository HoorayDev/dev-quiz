import { FC, ReactNode } from 'react';
import styles from '~/components/reusable/DQButton.module.scss';
import Forward from '~/images/caret-forward.svg';

interface DQButtonProps {
  children: ReactNode;
  onClick: ()=> void;
  hasIcon?: boolean;
};

const DQButton: FC<DQButtonProps> = ({
  children,
  onClick,
  hasIcon = false,
}) => {
  return <button className={styles.dqButton} onClick={onClick}>
    {hasIcon && <Forward />}
    {children}
  </button>
};

export { DQButton };