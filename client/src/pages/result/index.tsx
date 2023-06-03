import { FC, ReactNode } from 'react';
import { DQButton } from '~/components/reusable/DQButton';

const Result: FC = () => {
  return <div>
    <h1>채점 결과를 확인해보세요!</h1>
    <div>
      <div>
        <p>정답</p>
        <p>3</p>
      </div>
      <div>
        <p>오답</p>
        <p>7</p>
      </div>
    </div>

    <div>
      <DQButton>홈으로</DQButton>
      <DQButton>결과 공유하기</DQButton>
      <DQButton>틀린문제 확인하기</DQButton>
    </div>
    <div>
      <input type="text" placeholder='문제 업데이트 시 알림 받을 이메일을 입력해주세요!' />
      <p>문제 업데이트 시 알림 받을 이메일을 입력</p>
    </div>
  </div>;
};

// getStaticProps : hasAppBar , hasAppFooter
export default Result;