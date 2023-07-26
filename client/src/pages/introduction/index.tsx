import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useMemo } from 'react';
import { DefaultStaticProps } from '~/pages/_app';
import styles from './styles/index.module.scss';
import LinkedIn from '~/images/linkedin_logo.svg';
import Tistory from '~/images/tistory_logo.svg';

const memberArr = [
  {
    name: '1호',
    description: '3년차 서버개발자, \n 고양이(걸오)님을 부양하기 위해 열심히 살아가고 있습니다.',
    sosial: [
      {
        url: 'https://2ruk.tistory.com/',
        icon: <Tistory width={28} height={28}/>,
      },
      {
        url: 'https://www.linkedin.com/in/호영-최-1b356a237/',
        icon: <LinkedIn width={28} height={28}/>,
      }
    ],
  },
  {
    name: '미아',
    description: '할 수 있겠다는 마음가짐은 눈앞의 문제에 대한 긴장을 늦추는데 도움이 됩니다. 스스로에게 보내는 이 응원 메세지로 개발자로서 해결해야 하는 미션 뿐 만 아니라 생애 맞닥뜨린 크고 작은 어려움을 어렵지 않게 바라보고 있습니다.',
    sosial: [],
  },
  {
    name: '제이',
    description: '개발 트렌드는 아주 빠르게 변화하고 있습니다. 빠른 변화에 적응하기 위해서 혼자가 아닌 함께하는 가치를 깨닫는 것이 중요하다고 생각합니다. 함께하는 가치를 깨닫고 혼자가 아닌 모든 개발자들이 함께 성장할 수 있는 서비스를 만들고 싶습니다.',
    sosial: [],
  }
]

const Index = ()=>{
  const image = 'https://d32kg0ommnjq4u.cloudfront.net/public/members.webp';
  const blur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+ftnPQAJUANuKf/F0wAAAABJRU5ErkJggg==';

  const memberList = useMemo(() => {
    return memberArr.map(({ name, description, sosial }) => {
      const socialList = sosial.length > 0 && <div>{sosial.map(({ url, icon }) => <a href={url}>{icon}</a>)}</div>

      return (
          <div>
            <div className={styles.nameTitle}>
              <h3>{name}</h3>
              <>{socialList}</>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
      )
    })
  }, [memberArr])

  return (
      <div className={styles.pageLayout}>
        <div className={styles.imageContainer}>
          <Image
              src={image}
              placeholder="blur"
              objectFit="contain"
              layout="fill"
              quality={100}
              blurDataURL={blur}
              alt="Picture of the author"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <div className={styles.title}>
              <h2>안녕하세요!</h2> <br/>
              <div className={styles.innerTitle}>
                <h2 className={styles.underline}>DevQuiz</h2><h2>를 소개합니다.</h2>
              </div>
            </div>
            <p>
              Javascript를 가볍게 실력 체크 해보면 어떨까? 에서 시작된 프로젝트입니다. 앞으로 소셜로그인 기능과 당신의 점수는 상위 몇프로인지 보여주고, 퀴즈 언어를 확장하는 등 차근차근 업데이트를 해 갈 예정이에요.<br/>
              실무에서 사용해 온 스킬셋과 함께 도전하고 싶었던 몇가지를 얹어서 기술스택을 선정했습니다.<br/>
            </p>
          </div>

          <div>
            <div className={styles.title}>
              <h2 className={styles.underline}>멤버 소개</h2>
            </div>

            <div className={styles.members}>{memberList}</div>
          </div>
        </div>
      </div>
  )
};

const getStaticProps: GetStaticProps<DefaultStaticProps> = async () => ({
  props: {
    hasAppHeader: true,
  },
});

export default Index;
export { getStaticProps };
