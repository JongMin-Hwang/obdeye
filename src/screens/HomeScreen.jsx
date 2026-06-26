import styles from './HomeScreen.module.css';

const SCORE = 82;
const CIRCUMFERENCE = 2 * Math.PI * 75;
const offset = CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE;

export default function HomeScreen({ goScreen }) {
  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.logo}>OBD<span>EYE</span></div>
          <div className={styles.greeting}>안녕하세요, 김운전님 👋</div>
        </div>
        <div className={styles.notifBtn} onClick={() => goScreen('vehicle')}>
          🔔
          <div className={styles.notifDot} />
        </div>
      </div>

      <div className={styles.scroll}>
        {/* Score Ring */}
        <div className={styles.scoreSection}>
          <div className={styles.scoreLabel}>오늘의 운전 안전 점수</div>
          <div className={styles.ringWrap}>
            <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="90" cy="90" r="75" fill="none" stroke="#1A2030" strokeWidth="12" />
              <circle
                cx="90" cy="90" r="75" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00C6FF" />
                  <stop offset="100%" stopColor="#7B61FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className={styles.ringCenter}>
              <div className={styles.scoreNum}>{SCORE}</div>
              <div className={styles.scoreSlash}>/ 100</div>
            </div>
          </div>
          <div className={styles.gradeTag}>🥇 GOLD 등급</div>
          <div
            style={{fontSize:'12px',color:'var(--accent)',marginTop:'10px',cursor:'pointer'}}
            onClick={() => goScreen('aiscore')}
          >AI 점수 산출 근거 보기 →</div>
        </div>

        {/* Stats */}
        <div className={styles.statRow}>
          {[
            { icon: '🛣️', val: '43', color: 'var(--accent)', desc: '주행 km' },
            { icon: '⚡', val: '2', color: 'var(--yellow)', desc: '급가속 횟수' },
            { icon: '😴', val: '0', color: 'var(--green)', desc: '졸음 감지' },
          ].map((s) => (
            <div className={styles.statCard} key={s.desc}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statVal} style={{ color: s.color }}>{s.val}</div>
              <div className={styles.statDesc}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className={styles.sectionTitle}>최근 알림</div>
        <div className={styles.alertCard} style={{ borderColor: 'rgba(255,107,53,0.35)', background: 'linear-gradient(135deg,rgba(255,107,53,0.12),rgba(255,107,53,0.05))' }}>
          <div className={styles.alertIcon} style={{ background: 'rgba(255,107,53,0.2)' }}>🔧</div>
          <div className={styles.alertBody}>
            <div className={styles.alertTitle} style={{ color: '#FF8C5A' }}>엔진 점검 예고</div>
            <div className={styles.alertDesc}>DTC P0420 — 배기 시스템 이상 감지됨</div>
          </div>
          <div className={styles.alertTime}>2시간 전</div>
        </div>
        <div className={styles.alertCard} style={{ borderColor: 'rgba(0,198,255,0.2)', background: 'linear-gradient(135deg,rgba(0,198,255,0.08),rgba(0,198,255,0.03))' }}>
          <div className={styles.alertIcon} style={{ background: 'rgba(0,198,255,0.12)' }}>✅</div>
          <div className={styles.alertBody}>
            <div className={styles.alertTitle} style={{ color: 'var(--accent)' }}>이번 주 목표 달성!</div>
            <div className={styles.alertDesc}>7일 연속 안전점수 80점 이상 유지</div>
          </div>
          <div className={styles.alertTime}>어제</div>
        </div>

        {/* Feature Grid */}
        <div className={styles.sectionTitle} style={{ marginTop: 4 }}>바로가기</div>
        <div className={styles.featureGrid}>
          {[
            { icon: '📡', title: '실시간 모니터링', sub: 'OBD + 졸음 감지', badge: 'LIVE', badgeColor: 'green', accent: 'blue', screen: 'monitor' },
            { icon: '📊', title: '운전 리포트', sub: '주간 습관 분석', badge: '이번 주', badgeColor: 'purple', accent: 'purple', screen: 'report' },
            { icon: '🚗', title: '차량 상태', sub: '고장 예측 · DTC', badge: '1건 주의', badgeColor: 'warn', accent: 'orange', screen: 'vehicle' },
            { icon: '🏆', title: '보험 연동', sub: 'UBI 점수 공유', badge: '-12% 할인', badgeColor: 'green', accent: 'green', screen: 'insurance' },
          ].map((f) => (
            <div
              key={f.title}
              className={`${styles.featureCard} ${styles[f.accent]}`}
              onClick={() => f.screen && goScreen(f.screen)}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureSub}>{f.sub}</div>
              <div className={`${styles.featureBadge} ${styles[f.badgeColor + 'Badge']}`}>{f.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
