import styles from './ReportScreen.module.css';

const DAYS = [
  { day: '월', score: 71, color: 'var(--accent2)' },
  { day: '화', score: 85, color: 'var(--accent)' },
  { day: '수', score: 78, color: 'var(--accent2)' },
  { day: '목', score: 91, color: 'var(--green)' },
  { day: '금', score: 88, color: 'var(--accent)' },
  { day: '토', score: 75, color: 'var(--yellow)' },
  { day: '일', score: 82, color: 'var(--accent)' },
];

const MAX_HEIGHT = 80;

const BREAKDOWN = [
  { icon: '⚡', label: '급가속 · 급제동', score: 78, color: 'var(--green)' },
  { icon: '🛣️', label: '정속 주행', score: 85, color: 'var(--accent)' },
  { icon: '😴', label: '졸음 · 주의산만', score: 92, color: 'var(--accent2)' },
  { icon: '🚦', label: '과속 준수', score: 70, color: 'var(--yellow)' },
];

export default function ReportScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>운전 리포트</div>
          <div className={styles.sub}>2026년 6월 4주차</div>
        </div>
        <div className={styles.monthBtn}>월간 보기</div>
      </div>

      <div className={styles.scroll}>
        {/* Grade Card */}
        <div className={styles.gradeCard}>
          <div className={styles.gradeWeek}>이번 주 최종 등급</div>
          <div className={styles.gradeBig}>🥇 GOLD</div>
          <div className={styles.gradeRow}>
            <div className={styles.gradeScore}>주간 평균 82점</div>
            <div className={styles.gradeChange}>▲ +5점 (지난주 대비)</div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={styles.barChart}>
          <div className={styles.chartTitle}>일별 안전 점수</div>
          <div className={styles.bars}>
            {DAYS.map((d) => {
              const h = (d.score / 100) * MAX_HEIGHT;
              return (
                <div className={styles.barCol} key={d.day}>
                  <div className={styles.barNum}>{d.score}</div>
                  <div
                    className={styles.bar}
                    style={{
                      height: h,
                      background: `linear-gradient(180deg, ${d.color}, ${d.color}44)`,
                    }}
                  />
                  <div className={styles.barDay}>{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown */}
        <div className={styles.sectionTitle}>항목별 분석</div>
        <div className={styles.breakdownList}>
          {BREAKDOWN.map((b) => (
            <div className={styles.breakdownItem} key={b.label}>
              <div className={styles.bdIcon}>{b.icon}</div>
              <div className={styles.bdLabel}>{b.label}</div>
              <div className={styles.bdBarWrap}>
                <div className={styles.bdBar} style={{ width: `${b.score}%`, background: b.color }} />
              </div>
              <div className={styles.bdVal} style={{ color: b.color }}>{b.score}</div>
            </div>
          ))}
        </div>

        {/* AI Coaching */}
        <div className={styles.coachCard}>
          <div className={styles.coachTitle}>🤖 AI 코칭 메시지</div>
          <div className={styles.coachText}>
            이번 주 졸음 감지 지수가 크게 개선됐어요! 과속 구간이 주로{' '}
            <span style={{ color: 'var(--warn)' }}>고속도로 진입 시</span> 발생했습니다. 진입 전 속도 조절에 집중해보세요.
          </div>
          <div className={styles.coachRow}>
            <div className={`${styles.coachTag} ${styles.good}`}>
              <div className={styles.coachTagSub}>잘하고 있어요</div>
              <div className={styles.coachTagVal}>정속 주행</div>
            </div>
            <div className={`${styles.coachTag} ${styles.bad}`}>
              <div className={styles.coachTagSub}>개선 필요</div>
              <div className={styles.coachTagVal}>과속 관리</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
