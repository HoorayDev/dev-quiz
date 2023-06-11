import React, { FC, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store';
import cn from "clsx";
import { show,hide } from '~/store/slices/toast';
import styles from '~/components/Portal/Toast/toast.module.scss';

interface DQToastProps {
  config? : {
    duration? : number;
    role? : 'status' | 'error';
  }
  children: ReactNode;
}

const Toast : FC<DQToastProps> =({
  config = {},
  children,
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
    <div className={styles.toastsWrapper}>
      <AnimatePresence>
        {show && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className={cn(styles.toast, styles.primary)}
            role={role}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    ,
    document.getElementById('toasts-portal') as HTMLElement
  );
}

export { Toast };
