import { useState } from 'react';
import styles from './OnboardingScreen.module.css';

const STEPS = [
  {
    icon: '🚗',
    title: 'OBDEYE에 오신 걸 환영해요',
    desc: 'OBD-II 동글과 AI가 결합해 운전 안전을 실시간으로 분석합니다.',
    sub: null,
  },
  {
    icon: '🔌',
    title: 'OBD-II 동글을 연결해주세요',
    desc: '차량 운전석 하단의 OBD-II 단자에 동글을 꽂아주세요.',
    sub: '단자 위치를 모르시면 차량 설명서를 확인하세요.',
  },
  {
    icon: '📱',
    title: '블루투스 연결 중...',
    desc: '동글과 스마트폰이 자동으로 페어링됩니다.',
    sub: null,
    loading: true,
  },
  {
    icon: '✅',
    title: '연결 완료!',
    desc: '차량 데이터 수신을 시작합니다. 이제 안전하게 주행하세요.',
    sub: null,
    done: true,
  },
];

export default function OnboardingScreen({ goScreen }) {
  const [step, setStep] = useState(0);
  const [connecting, setConnecting] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setConnecting(true);
      setStep(2);
      setTimeout(() => {
        setConnecting(false);
        setStep(3);
      }, 2000);
      return;
    }
    if (step === 3) {
      goScreen('home');
      return;
    }
    setStep(s => s + 1);
  };

  const current = STEPS[step];

  return (
    <div className={styles.screen}>
      {/* Progress */}
      <div className={styles.progress}>
        {STEPS.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i <= step ? styles.dotActive : ''}`} />
        ))}
      </div>

      <div className={styles.body}>
        <div className={`${styles.iconWrap} ${current.done ? styles.iconDone : ''}`}>
          <span className={styles.icon}>{current.icon}</span>
          {current.loading && <div className={styles.spinner} />}
        </div>
        <div className={styles.title}>{current.title}</div>
        <div className={styles.desc}>{current.desc}</div>
        {current.sub && <div className={styles.sub}>{current.sub}</div>}

        {step === 1 && (
          <div className={styles.obdCard}>
            <div className={styles.obdImg}>🚘</div>
            <div className={styles.obdLabel}>OBD-II 단자 위치</div>
            <div className={styles.obdDesc}>운전석 핸들 아래 — 보통 왼쪽 하단에 위치</div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.scanCard}>
            <div className={styles.scanRow}>
              <span>블루투스 신호 감지</span>
              <span className={styles.scanOk}>✅</span>
            </div>
            <div className={styles.scanRow}>
              <span>OBD 동글 페어링</span>
              <span className={connecting ? styles.scanSpin : styles.scanOk}>
                {connecting ? '⏳' : '✅'}
              </span>
            </div>
            <div className={styles.scanRow}>
              <span>차량 ECU 연결</span>
              <span className={connecting ? styles.scanPending : styles.scanOk}>
                {connecting ? '···' : '✅'}
              </span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.doneCard}>
            <div className={styles.doneRow}><span>차량</span><span className={styles.doneVal}>현대 아반떼 CN7</span></div>
            <div className={styles.doneRow}><span>OBD 펌웨어</span><span className={styles.doneVal}>v2.1.4</span></div>
            <div className={styles.doneRow}><span>신호 강도</span><span style={{color:'var(--green)', fontWeight:600}}>강함 ●●●</span></div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={handleNext}
          disabled={step === 2}
        >
          {step === 3 ? '시작하기 🚀' : step === 2 ? '연결 중...' : '다음'}
        </button>
        {step === 0 && (
          <div className={styles.skip} onClick={() => goScreen('home')}>건너뛰기</div>
        )}
      </div>
    </div>
  );
}
