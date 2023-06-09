import styles from './loginModal.module.scss';
import { useForm } from "react-hook-form";
import Input from '~/components/Input/input'

interface ILoginModalCloseBtnType {
    onClose: () => void;
}

const LoginModal = ({ onClose }: ILoginModalCloseBtnType) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className={styles.loginModalWrapper}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>닉네임을 입력해주세요!</h1>
                <div className={styles.inputWrapper}>
                    <Input type={'login'} onSubmit={(data) => {console.log(data)}}/>
                </div>
                <button type='button' className={styles.closeBtn} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
