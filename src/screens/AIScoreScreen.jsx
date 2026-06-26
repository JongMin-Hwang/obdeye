import styles from './AIScoreScreen.module.css';

const FACTORS = [
  { icon:'⚡', label:'급가속', count:'2회', penalty:-6, desc:'고속도로 진입 시 과다 가속', color:'var(--warn)' },
  { icon:'🚦', label:'과속 구간', count:'1.2km', penalty:-5, desc:'제한속도 110km → 실제 118km', color:'var(--warn)' },
  { icon:'😴', label:'하품 감지', count:'1회', penalty:-2, desc:'오후 2시 30분, 경부고속도로', color:'var(--yellow)' },
  { icon:'🛣️', label:'정속 주행', count:'78%', penalty:+8, desc:'전체 주행 중 정속 유지 비율 우수', color:'var(--green)' },
  { icon:'🛑', label:'급제동', count:'0회', penalty:+5, desc:'전 구간 안전 제동 유지', color:'var(--green)' },
  { icon:'👁️', label:'졸음 없음', count:'0회', penalty:+2, desc:'PERCLOS 12% — 정상 범위 유지', color:'var(--green)' },
];

const BASE = 80;
const TOTAL = 82;

export default function AIScoreScreen() {
  let running = BASE;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>AI 점수 분석</div>
          <div className={styles.sub}>오늘 점수가 산출된 근거</div>
        </div>
        <div className={styles.finalBadge}>최종 82점</div>
      </div>

      <div className={styles.scroll}>
        {/* 계산식 카드 */}
        <div className={styles.formulaCard}>
          <div className={styles.formulaTitle}>🤖 점수 산출 방식</div>
          <div className={styles.formulaDesc}>
            기본점수 {BASE}점에서 위험 운전 감지 시 감점, 안전 운전 유지 시 가산점을 적용해 최종 점수를 계산합니다.
          </div>
          <div className={styles.formulaEq}>
            <span className={styles.eqBase}>{BASE}</span>
            <span className={styles.eqOp}> − 13 + 15 = </span>
            <span className={styles.eqResult}>{TOTAL}</span>
          </div>
        </div>

        {/* 항목별 상세 */}
        <div className={styles.sectionTitle}>항목별 AI 판단 근거</div>
        <div className={styles.factorList}>
          {FACTORS.map((f, i) => {
            const prev = running;
            running += f.penalty;
            return (
              <div key={i} className={styles.factorItem}>
                <div className={styles.factorLeft}>
                  <div className={styles.factorIcon}>{f.icon}</div>
                  <div className={styles.factorBody}>
                    <div className={styles.factorLabel}>
                      {f.label}
                      <span className={styles.factorCount}>{f.count}</span>
                    </div>
                    <div className={styles.factorDesc}>{f.desc}</div>
                  </div>
                </div>
                <div className={styles.factorRight}>
                  <div
                    className={styles.factorPenalty}
                    style={{color: f.penalty > 0 ? 'var(--green)' : 'var(--warn)'}}
                  >
                    {f.penalty > 0 ? `+${f.penalty}` : f.penalty}점
                  </div>
                  <div className={styles.factorScore}>{prev + f.penalty}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 모델 설명 */}
        <div className={styles.modelCard}>
          <div className={styles.modelTitle}>📊 AI 모델 정보</div>
          <div className={styles.modelGrid}>
            <div className={styles.modelItem}>
              <div className={styles.modelLabel}>주행 분류 모델</div>
              <div className={styles.modelVal}>시계열 CNN</div>
            </div>
            <div className={styles.modelItem}>
              <div className={styles.modelLabel}>졸음 감지</div>
              <div className={styles.modelVal}>PERCLOS 알고리즘</div>
            </div>
            <div className={styles.modelItem}>
              <div className={styles.modelLabel}>분석 데이터</div>
              <div className={styles.modelVal}>OBD + IMU + 카메라</div>
            </div>
            <div className={styles.modelItem}>
              <div className={styles.modelLabel}>업데이트 주기</div>
              <div className={styles.modelVal}>실시간 (500ms)</div>
            </div>
          </div>
        </div>

        {/* 개선 방향 */}
        <div className={styles.sectionTitle}>다음 주행 개선 포인트</div>
        <div className={styles.tipList}>
          {[
            { tip:'고속도로 진입 시 가속 페달을 천천히 밟아보세요', gain:'+3~5점' },
            { tip:'제한속도 + 10km 이상 구간을 줄이면 과속 감점이 사라져요', gain:'+5점' },
          ].map((t, i) => (
            <div key={i} className={styles.tipItem}>
              <div className={styles.tipBullet}>💡</div>
              <div className={styles.tipBody}>
                <div className={styles.tipText}>{t.tip}</div>
              </div>
              <div className={styles.tipGain}>{t.gain}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
