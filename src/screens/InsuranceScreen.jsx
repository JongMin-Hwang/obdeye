import { useState } from 'react';
import styles from './InsuranceScreen.module.css';

const SCORE = 82;
const BASE_PREMIUM = 120000;
const DISCOUNT_RATE = 0.12;
const DISCOUNTED = Math.round(BASE_PREMIUM * (1 - DISCOUNT_RATE));
const SAVED = BASE_PREMIUM - DISCOUNTED;

const GRADE_BENEFITS = [
  { grade: 'BRONZE', range: '0~59점', discount: '0%', color: '#CD7F32', active: false },
  { grade: 'SILVER', range: '60~74점', discount: '5%', color: '#A8A9AD', active: false },
  { grade: 'GOLD', range: '75~89점', discount: '12%', color: '#FFD600', active: true },
  { grade: 'PREMIUM', range: '90~100점', discount: '20%', color: '#00C6FF', active: false },
];

const SHARE_HISTORY = [
  { date: '2026.06.25', company: '현대해상', score: 82, status: '공유완료', saved: 14400 },
  { date: '2026.05.25', company: '현대해상', score: 79, status: '공유완료', saved: 12000 },
  { date: '2026.04.25', company: '현대해상', score: 75, status: '공유완료', saved: 12000 },
];

const COMPANIES = [
  { name: '현대해상', logo: '🏢', connected: true, discount: '최대 12%' },
  { name: 'DB손해보험', logo: '🏛️', connected: false, discount: '최대 15%' },
  { name: '삼성화재', logo: '🔷', connected: false, discount: '최대 10%' },
];

export default function InsuranceScreen() {
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setSharing(true);
    setTimeout(() => { setSharing(false); setShared(true); }, 1800);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>보험 연동</div>
          <div className={styles.sub}>UBI 주행연계보험 · 운전점수 공유</div>
        </div>
        <div className={styles.connBadge}>현대해상 연결중</div>
      </div>

      <div className={styles.scroll}>

        {/* 핵심 할인 카드 */}
        <div className={styles.heroCard}>
          <div className={styles.heroTop}>
            <div>
              <div className={styles.heroLabel}>이번 달 보험료 절감액</div>
              <div className={styles.heroAmount}>
                -{SAVED.toLocaleString()}<span className={styles.heroWon}>원</span>
              </div>
              <div className={styles.heroDiscount}>운전점수 82점 → 12% 할인 적용</div>
            </div>
            <div className={styles.heroCircle}>
              <div className={styles.heroPercent}>-12%</div>
              <div className={styles.heroGrade}>GOLD</div>
            </div>
          </div>
          <div className={styles.premiumRow}>
            <div className={styles.premiumItem}>
              <div className={styles.premiumLabel}>기본 보험료</div>
              <div className={styles.premiumVal} style={{color:'var(--muted)', textDecoration:'line-through'}}>
                {BASE_PREMIUM.toLocaleString()}원
              </div>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.premiumItem}>
              <div className={styles.premiumLabel}>할인 후 보험료</div>
              <div className={styles.premiumVal} style={{color:'var(--green)'}}>
                {DISCOUNTED.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* 점수 공유 버튼 */}
        <div className={styles.shareSection}>
          <div className={styles.shareDesc}>
            이번 달 운전점수 <strong style={{color:'var(--accent)'}}>82점</strong>을 보험사에 공유하면 할인이 적용돼요.
          </div>
          {shared ? (
            <div className={styles.sharedDone}>
              ✅ 공유 완료 · 다음 달 보험료에 반영됩니다
            </div>
          ) : (
            <button className={styles.shareBtn} onClick={handleShare} disabled={sharing}>
              {sharing ? '공유 중...' : '📤 현대해상에 이번 달 점수 공유하기'}
            </button>
          )}
        </div>

        {/* UBI 등급별 혜택 */}
        <div className={styles.sectionTitle}>UBI 등급별 할인 혜택</div>
        <div className={styles.gradeList}>
          {GRADE_BENEFITS.map((g) => (
            <div
              key={g.grade}
              className={`${styles.gradeItem} ${g.active ? styles.gradeActive : ''}`}
            >
              <div className={styles.gradeDot} style={{background: g.color}} />
              <div className={styles.gradeBody}>
                <div className={styles.gradeName} style={{color: g.active ? g.color : 'var(--text)'}}>
                  {g.grade} {g.active && <span className={styles.currentTag}>현재</span>}
                </div>
                <div className={styles.gradeRange}>{g.range}</div>
              </div>
              <div className={styles.gradeDiscount} style={{color: g.active ? g.color : 'var(--muted)'}}>
                {g.discount}
              </div>
            </div>
          ))}
        </div>

        {/* 연결된 보험사 */}
        <div className={styles.sectionTitle}>보험사 연결 현황</div>
        <div className={styles.companyList}>
          {COMPANIES.map((c) => (
            <div key={c.name} className={styles.companyItem}>
              <div className={styles.companyLogo}>{c.logo}</div>
              <div className={styles.companyBody}>
                <div className={styles.companyName}>{c.name}</div>
                <div className={styles.companyDiscount}>{c.discount} 할인 가능</div>
              </div>
              {c.connected ? (
                <div className={styles.connectedTag}>연결됨</div>
              ) : (
                <div className={styles.connectBtn}>연결하기</div>
              )}
            </div>
          ))}
        </div>

        {/* 공유 이력 */}
        <div className={styles.sectionTitle}>점수 공유 이력</div>
        <div className={styles.historyList}>
          {SHARE_HISTORY.map((h, i) => (
            <div key={i} className={styles.historyItem}>
              <div className={styles.historyDate}>{h.date}</div>
              <div className={styles.historyBody}>
                <div className={styles.historyCompany}>{h.company}</div>
                <div className={styles.historyScore}>운전점수 {h.score}점</div>
              </div>
              <div className={styles.historyRight}>
                <div className={styles.historyStatus}>✅ {h.status}</div>
                <div className={styles.historySaved}>-{h.saved.toLocaleString()}원</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
