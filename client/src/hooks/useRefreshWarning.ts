import { useEffect } from 'react';

interface RefreshWarningModalProps {
    isOpen: boolean;
}

const RefreshWarningModal = ({ isOpen } : RefreshWarningModalProps) => {
    if(!isOpen) return null

    const handleBeforeUnload = (e:BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    },[])

    return null;
};

export default RefreshWarningModal;
