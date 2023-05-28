import Image, { GetStaticProps } from 'next';
import { DefaultStaticProps } from '~/pages/_app';
import styles from './styles/index.module.scss';
import membersImage from '~/images/members.webp'

const Index = ()=>{
return <div className={styles.pageLayout}>
  <div className={styles.imageContainer}>
    {/*<Image*/}
    {/*  src={membersImage}*/}
    {/*  placeholder="blur"*/}
    {/*  width={500}*/}
    {/*  height={500}*/}
    {/*  alt="Picture of the author"*/}
    {/*/>*/}
    image
  </div>
  <div className={styles.content}>
    <div className={styles.innerContent}>
      <div className={styles.title}>
        <h2>안녕하세요!</h2> <br/>
        <div className={styles.innerTitle}>
          <h2 className={styles.underline}>Hooray</h2><h2>팀을 소개합니다.</h2>
        </div>
      </div>

      <p>
        우리가 이 서비스를 만든 이유는 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라 <br/>
        블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
      </p>
    </div>

    <div>
      <div className={styles.title}>
        <h2 className={styles.underline}>멤버 소개</h2>
      </div>

      <p>
        우리가 이 서비스를 만든 이유는 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라 <br/>
        블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
      </p>
    </div>

  </div>

</div>
};

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});

export default Index;
export { getStaticProps };