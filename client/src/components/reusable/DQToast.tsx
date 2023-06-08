import React, { FC, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
// import cn from "clsx";
// import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { RootState } from '~/store/store';
import { show,hide } from '~/store/slices/toast';

interface DQToastProps {
  config? : {
    duration? : number;
    role? : 'status' | 'error';
  }
  children: ReactNode;
}

const DQToast : FC<DQToastProps> =({
  config = {},
  children,
}) => {
  const dispatch = useAppDispatch();
  const { duration = 3500, role = "status" } = config;

  const { message, show } = useAppSelector((state:RootState) => state.toast);

  useEffect(() => {
    if (!duration || !show) {
      console.log('??')
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(hide());
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show, duration, hide]);


  return <>
    {show && <div style={{
      width:'500px',
      height:'500px',
      backgroundColor:'red',
    }}><h1>test</h1></div>}
  </>

  // return createPortal(
  //   <AnimatePresence>
  //     {isShown && (
  //       <motion.div
  //         key={uniqueId}
  //         layout
  //         initial={{ opacity: 0, y: 50, scale: 0.3 }}
  //         animate={{ opacity: 1, y: 0, scale: 1 }}
  //         exit={{ opacity: 0, y: 20, scale: 0.5 }}
  //         className={cn("toast", className)}
  //         role={role}
  //       >
  //         {children}
  //       </motion.div>
  //     )}
  //   </AnimatePresence>,
  //   document.querySelector("#toasts-portal")
  // );
}

export { DQToast };
