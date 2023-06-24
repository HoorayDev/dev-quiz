import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import styles from '~/pages/incorrect/index.module.scss';
import QuizCardList from '~/components/play/quizCardList';
import { QuizCardListType } from '~/components/play/quizCardList';

const Incorrect = () => {
    return (
        <div>
            <QuizCardList type={QuizCardListType.incorrect} maxValue={10} />
        </div>
    )
}

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
    props: {
        hasAppHeader: true,
    },
});

export default Incorrect
export { getStaticProps };
