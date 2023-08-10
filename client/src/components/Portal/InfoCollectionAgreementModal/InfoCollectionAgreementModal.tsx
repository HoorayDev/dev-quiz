import styles from '../LoginModal/loginModal.module.scss';
import { useForm } from "react-hook-form";
import { DQInput } from '~/components/reusable/DQInput';
import ModalPortal from '~/components/Portal/modalPortal';

interface InfoCollectionAgreementModalProps {
  onClose: () => void;
}

const InfoCollectionAgreementModal = ({ onClose }: InfoCollectionAgreementModalProps) => {

  return (
    <ModalPortal>
      <div className={styles.loginModalWrapper}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            개인정보 수집 및 이용에 동의해주세요. <br/>
            문제 꾸러미가 업데이트되면 소식을 전해드릴게요.
          </h1>
          <br/>
          {/* TODO : Modal 공통 styles 모듈화하고 해당 모달 스타일 정돈 */}
          <div>
            <ul>
              <li>1. 수집목적 : 서비스 업데이트 소식 알림</li>
              <li>2. 수집 항목 : 이메일주소</li>
              <li>3. 보유 및 이용 기간 : 입력일로부터 1년</li>
            </ul>
          </div>
          <br/>
          <button type='button' className={styles.closeBtn} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default InfoCollectionAgreementModal;
