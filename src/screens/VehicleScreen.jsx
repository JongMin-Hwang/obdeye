import styles from './VehicleScreen.module.css';

const HEALTH = [
  { label: '엔진', score: 74, color: 'var(--yellow)', status: '주의' },
  { label: '브레이크', score: 91, color: 'var(--green)', status: '양호' },
  { label: '배터리', score: 88, color: 'var(--green)', status: '양호' },
];

const DTC = [
  { code: 'P0420', desc: '촉매 변환기 효율 저하', detail: '배기 시스템 이상 · 즉시 점검 권장', sev: 'red', action: '정비소 찾기' },
  { code: 'P0171', desc: '연료 시스템 희박 감지', detail: '흡기 누기 가능성 · 2주 내 점검', sev: 'yellow', action: '상세 보기' },
];

const PREDICT = [
  { icon: '🔧', title: '엔진 오일 교환', sub: '예상 시점: 약 1,200km 후', dday: 'D-14', color: 'var(--yellow)' },
  { icon: '🛞', title: '타이어 교체 권장', sub: '마모도 68% · 앞바퀴 우선', dday: 'D-45', color: 'var(--muted)' },
];

export default function VehicleScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>차량 상태</div>
          <div className={styles.sub}>고장 예측 · DTC 분석</div>
        </div>
        <div className={styles.connBadge}>OBD 연결</div>
      </div>

      <div className={styles.scroll}>
        {/* Vehicle Card */}
        <div className={styles.vehicleCard}>
          <div className={styles.vehicleName}>현대 아반떼 CN7</div>
          <div className={styles.vehicleSub}>2022년형 · 1.6 가솔린 · 총 42,850km</div>
          <div className={styles.tags}>
            <div className={`${styles.tag} ${styles.tagGood}`}>정비 양호</div>
            <div className={`${styles.tag} ${styles.tagWarn}`}>1건 주의</div>
            <div className={`${styles.tag} ${styles.tagInfo}`}>다음 점검 D-12</div>
          </div>
          <div className={styles.carEmoji}>🚗</div>
        </div>

        {/* Health */}
        <div className={styles.healthGrid}>
          {HEALTH.map((h) => (
            <div className={styles.healthCard} key={h.label}>
              <div className={styles.healthLabel}>{h.label}</div>
              <div className={styles.healthScore} style={{ color: h.color }}>{h.score}</div>
              <div className={styles.healthStatus} style={{ color: h.color }}>{h.status}</div>
            </div>
          ))}
        </div>

        {/* DTC */}
        <div className={styles.sectionTitle}>DTC 진단 코드</div>
        {DTC.map((d) => (
          <div className={styles.dtcItem} key={d.code}>
            <div className={`${styles.dtcDot} ${styles[d.sev]}`} />
            <div className={styles.dtcBody}>
              <div className={styles.dtcCode}>{d.code}</div>
              <div className={styles.dtcDesc}>{d.desc}</div>
              <div className={styles.dtcDetail}>{d.detail}</div>
            </div>
            <div className={styles.dtcAction}>{d.action}</div>
          </div>
        ))}

        {/* Prediction */}
        <div className={styles.sectionTitle} style={{ marginTop: 8 }}>AI 고장 예측</div>
        <div className={styles.predictList}>
          {PREDICT.map((p, i) => (
            <div
              key={p.title}
              className={styles.predictItem}
              style={{ borderBottom: i < PREDICT.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div className={styles.predictIcon}>{p.icon}</div>
              <div className={styles.predictBody}>
                <div className={styles.predictTitle}>{p.title}</div>
                <div className={styles.predictSub}>{p.sub}</div>
              </div>
              <div className={styles.predictDday} style={{ color: p.color }}>{p.dday}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
