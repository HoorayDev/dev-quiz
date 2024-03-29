import { useForm } from "react-hook-form";
import styles from '~/components/reusable/DQInput.module.scss'

interface InputProps {
    type: "login" | "subscription"
    onSubmit: (data: any) => void
}

const placeholder = {
    login: '닉네임을 입력해주세요!',
    subscription: '문제 업데이트 소식을 메일로 보내드릴게요.',
}

const DQInput = (props: InputProps) => {
    const { type, onSubmit } = props
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <form className={styles.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
            <input
                className={`${styles.input} ${styles[type]}`}
                placeholder={placeholder[type]}
                {...register("value")}
            />
            <button disabled={!watch('value')} className={styles.inputButton}>
                <div className={styles.rightArrow}>&#9658;</div>
            </button>
        </form>
    )
}

export { DQInput }
