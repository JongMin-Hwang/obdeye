import { useState, useEffect } from 'react';
import styles from './MonitorScreen.module.css';

const SPEED_DATA = [68, 72, 75, 71, 74, 76, 70, 73];
const RPM_DATA = [2100, 2340, 2500, 2200, 2400, 2600, 2150, 2350];

export default function MonitorScreen() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SPEED_DATA.length), 2000);
    return () => clearInterval(t);
  }, []);

  const speed = SPEED_DATA[idx];
  const rpm = RPM_DATA[idx];

  const gauges = [
    { label: '속도', val: speed, unit: 'km/h', pct: (speed / 150) * 100, color: 'var(--accent)' },
    { label: 'RPM', val: rpm.toLocaleString(), unit: 'rpm', pct: (rpm / 6000) * 100, color: 'var(--accent2)' },
    { label: '냉각수온', val: 88, unit: '°C', pct: 73, color: 'var(--green)' },
    { label: '스로틀', val: 34, unit: '%', pct: 34, color: 'var(--yellow)' },
  ];

  const driverStatus = [
    { icon: '👁️', label: '눈 감김 (PERCLOS)', val: '정상 (12%)', type: 'ok' },
    { icon: '😐', label: '주의집중 상태', val: '집중', type: 'ok' },
    { icon: '😮‍💨', label: '하품 감지', val: '1회 감지', type: 'warn' },
  ];

  const drivePattern = [
    { icon: '🟢', label: '급가속', val: '없음', type: 'ok' },
    { icon: '🟢', label: '급제동', val: '없음', type: 'ok' },
    { icon: '🟡', label: '과속 구간', val: '1.2km', type: 'warn' },
    { icon: '🟢', label: '정속 주행 비율', val: '78%', type: 'ok' },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>실시간 모니터링</div>
          <div className={styles.sub}>OBD-II 연결됨 · 블루투스</div>
        </div>
        <div className={styles.liveBadge}>
          <div className={styles.liveDot} />
          LIVE
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.gaugeGrid}>
          {gauges.map((g) => (
            <div className={styles.gaugeCard} key={g.label}>
              <div className={styles.gaugeLabel}>{g.label}</div>
              <div className={styles.gaugeVal} style={{ color: g.color }}>
                {g.val}<span className={styles.gaugeUnit}>{g.unit}</span>
              </div>
              <div className={styles.barWrap}>
                <div className={styles.bar} style={{ width: `${Math.min(g.pct, 100)}%`, background: g.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionTitle}>운전자 상태 (DMS)</div>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Face Tracking 분석</div>
          {driverStatus.map((s) => (
            <div className={styles.statusItem} key={s.label}>
              <div className={`${styles.statusIcon} ${styles[s.type]}`}>{s.icon}</div>
              <div className={styles.statusLabel}>{s.label}</div>
              <div className={`${styles.statusVal} ${styles[s.type]}`}>{s.val}</div>
            </div>
          ))}
        </div>

        <div className={styles.sectionTitle}>주행 패턴 분석</div>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>이번 구간</div>
          {drivePattern.map((s) => (
            <div className={styles.statusItem} key={s.label}>
              <div className={`${styles.statusIcon} ${styles[s.type]}`}>{s.icon}</div>
              <div className={styles.statusLabel}>{s.label}</div>
              <div className={`${styles.statusVal} ${styles[s.type]}`}>{s.val}</div>
            </div>
          ))}
        </div>

        <div className={styles.scoreBar}>
          <div>
            <div className={styles.scoreSub}>현재 구간 점수</div>
            <div className={styles.scoreBig}>89점</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className={styles.scoreSub}>오늘 누적</div>
            <div className={styles.scoreSmall}>82점</div>
            <div className={styles.scoreChange}>▲ +3점</div>
          </div>
        </div>
      </div>
    </div>
  );
}
