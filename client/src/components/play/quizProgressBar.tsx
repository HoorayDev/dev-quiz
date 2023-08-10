import { useState, useEffect } from 'react';
import styles from '~/components/play/quizProgressBar.module.scss';

interface QuizProgressBarProps {
    maxValue: number;
    currentValue: number;
}

const QuizProgressBar = (props: QuizProgressBarProps) => {
    const [isTop, setIsTop] = useState(true);
    const { maxValue, currentValue } = props

    const checkScrollDistance = () => {
        if(window.pageYOffset !== 0){
            return setIsTop(false)
        }

        setIsTop(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollDistance);

        return () => {
            window.removeEventListener('scroll', checkScrollDistance);
        }
    })

    return (
        <div className={styles.progressBarWrapper}>
            <div className={`${styles.currentProgress} ${styles[`q${currentValue}`]}`} />
            {isTop && (
                <div className={styles.tooltipWrapper}>
                    <span className={`${styles.tooltip} ${styles[`q${currentValue}`]}`}>{currentValue}/{maxValue}</span>
                </div>
            )}
        </div>
    )
}

export default QuizProgressBar
