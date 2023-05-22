import { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import { VersionContainer } from './components/versionContainer';
import styles from './styles/index.module.scss';

const versionData = [
  { date: '2023.03', version: '0.1.0', update: [
    {
      version: '0.1.0',
      content: ['어쩌고', '저쩌고']
    },
    {
      version: '0.1.5',
      content: ['어쩌고', '저쩌고']
    },
  ] },
  { date: '2023.04', version: '0.2.0', update: [
      {
        content: ['어쩌고', '저쩌고', '이러쿵','저러쿵']
      },
    ] }
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