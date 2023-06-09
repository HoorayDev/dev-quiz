import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface IModalPortalProps {
    children: ReactNode;
}

const ModalPortal = ({ children }: IModalPortalProps) => {
    const el = document.getElementById('modal-root') as HTMLElement;

    return ReactDom.createPortal(children, el);
};

export default ModalPortal;
