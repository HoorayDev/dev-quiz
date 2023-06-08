import styles from '~/components/play/quizCard.module.scss'

enum QuizCardType {
    default = 'default',
    answer = 'answer',
    select = 'select',
}

interface QuizCardProps {
    title: string
    type?: QuizCardType;
    onClick?: () => void;
    disabeld?: boolean;
}

const QuizCard = ({ title, type = QuizCardType.default, onClick, disabeld }: QuizCardProps) => {
    return (
        <button className={`${styles.quizCard} ${styles[type]}`} onClick={onClick} disabled={disabeld}>{title}</button>
    )
}

export default QuizCard
export { QuizCardType }
