import { FC, ReactNode } from 'react';
import styles from '~/components/reusable/DQButton.module.scss';
import Forward from '~/images/caret-forward.svg';

interface DQButtonProps {
  children: ReactNode;
  hasIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const DQButton: FC<DQButtonProps> = ({
  children,
  onClick,
  hasIcon = false,
  disabled = false,
}) => {
  return (
      <button
          className={`${styles.dqButton} ${styles[disabled ? 'disabled' : '']}`}
          onClick={onClick}
          disabled={disabled}
      >
        {hasIcon && <Forward />}
        {children}
      </button>
  )
};

export { DQButton };
