import styles from './loginModal.module.scss';
import { useForm } from "react-hook-form";
import { DQInput } from '~/components/reusable/DQInput';
import ModalPortal from '~/components/Portal/modalPortal';

interface ILoginModalCloseBtnType {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

const LoginModal = ({ onSubmit, onClose }: ILoginModalCloseBtnType) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <ModalPortal>
            <div className={styles.loginModalWrapper}>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>닉네임을 입력해주세요!</h1>
                    <div className={styles.inputWrapper}>
                        <DQInput type={'login'} onSubmit={onSubmit}/>
                    </div>
                    <button type='button' className={styles.closeBtn} onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </ModalPortal>
    );
};

export default LoginModal;
