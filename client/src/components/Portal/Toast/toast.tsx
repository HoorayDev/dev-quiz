import React, { FC, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store';
import cn from "clsx";
import { show,hide } from '~/store/slices/toast';
import styles from '~/components/Portal/Toast/toast.module.scss';

enum ToastType {
  primary = 'primary',
  error = 'error',
}

interface DQToastProps {
  type?: ToastType,
  config? : {
    duration? : number;
    role? : 'status' | 'error';
  }
}

const Toast : FC<DQToastProps> =({
  type = ToastType.primary,
  config = {},
}) => {
  const dispatch = useAppDispatch();
  const { duration = 3500, role = "status" } = config;

  const { message, show } = useAppSelector((state:RootState) => state.toast);

  useEffect(() => {
    if (!duration || !show) {
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(hide());
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show, duration, hide]);

  return createPortal(
    <div className={cn(styles.toast, styles[type], show && styles.show )}>
        <p>
          {message}
        </p>
    </div>
    ,
    document.getElementById('toasts-portal') as HTMLElement
  );
}

export { Toast, ToastType };
