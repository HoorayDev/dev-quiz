import styles from '~/components/play/quizProgressBar.module.scss'

interface QuizProgressBarProps {
    maxValue: number;
    currentValue: number;
}

const QuizProgressBar = (props: QuizProgressBarProps) => {
    const { maxValue, currentValue } = props

    return (
        <div className={styles.progressBarWrapper}>
            <div className={`${styles.currentProgress} ${styles[`q${currentValue}`]}`} />
            <div className={styles.tooltipWrapper}>
                <span className={`${styles.tooltip} ${styles[`q${currentValue}`]}`}>{currentValue}/{maxValue}</span>
            </div>
        </div>
    )
}

export default QuizProgressBar
