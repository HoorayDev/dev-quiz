import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import VersionContainer from '~/components/patchNote/versionContainer';
import styles from '~/pages/patchNote/styles/index.module.scss';

const versionData = [
  { date: '2023.07',
    version: '0.1.0',
    title:'Dev Quiz 출시!',
    update: [
    {
      version: '0.1.0',
      content: [
        '[기능] - 자바스크립트 퀴즈 모음 제공',
        '[기능] - 객관식 퀴즈 제공',
        '[기능] - 오답, 정답에 대한 분석 기능 제공',
      ]
    },
    // {
    //   version: '0.1.5',
    //   content: ['이후 업데이트 내용을', '작성해주세요']
    // },
  ] },
  // { date: '2023.04', version: '0.2.0', update: [
  //     {
  //       content: ['큰 단위 버전이 바뀌면', '오브젝트를 구분하여', '내용을 작성해주세요']
  //     },
  //   ] }
]

const Index = ()=>{
  return <div className={styles.pageLayout}>
    {
      versionData.map((el, index) =>
        <>
          <VersionContainer key={index} data={el}/>
          <hr />
        </>
      )
    }
  </div>
};

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});


export default Index;
export { getStaticProps };
