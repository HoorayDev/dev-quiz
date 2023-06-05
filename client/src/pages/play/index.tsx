import { useRouter } from 'next/router';
import styles from '~/pages/play/index.module.scss';
import QuizProgressBar from '~/components/play/quizProgressBar';
import QuizCardList from '~/components/play/quizCardList';
import { QuizCardListType } from '~/components/play/quizCardList';

const Play = () => {
    const { query: { step } } = useRouter()

    return (
        <div>
            <QuizProgressBar maxValue={10} currentValue={Number(step)}/>
            <QuizCardList type={QuizCardListType.play} />
        </div>
    )
}

export default Play;
