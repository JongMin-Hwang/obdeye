# 🚗 OBDEYE

> OBD-II + AI로 운전자와 차량을 함께 지키는 스마트 안전 운전 코치

**2026년 X+AI·SW 융합 프로젝트** | 팀 Fooding | 강원대학교 SW중심대학사업단

---

## 🔗 데모

**👉 [라이브 데모 보기](https://obdeye.vercel.app)**

---

## 📌 프로젝트 개요

OBDEYE는 차량 OBD-II 단자에서 수집되는 ECU 데이터와 스마트폰 카메라 기반의 운전자 얼굴 인식(Face Tracking)을 결합하여, AI가 실시간으로 운전 안전성을 분석하고 피드백하는 서비스입니다.

**OBD** (On-Board Diagnostics) + **EYE** (차량과 운전자를 지켜보는 눈)

---

## 🎯 핵심 기능

| 기능 | 설명 |
|------|------|
| 운전 안전 점수 | RPM·속도·급가속·졸음 감지를 종합해 0~100점으로 환산 |
| 실시간 모니터링 | OBD-II 게이지(속도·RPM·냉각수온·스로틀) + PERCLOS 기반 졸음 감지 |
| 운전 습관 리포트 | 일별/주별 점수 분석 및 AI 코칭 메시지 |
| 차량 고장 예측 | DTC 코드 해석 및 이상탐지 기반 예지정비 알림 |
| 보험 연동 | UBI(주행연계보험) 점수 공유로 보험료 절감 |

---

## 🏗️ 기술 스택

### Frontend (프로토타입)
- React 18 + Vite
- CSS Modules
- Vercel (배포)

### AI / 데이터 (설계)
| 데이터 | 기술 |
|--------|------|
| OBD-II 주행 데이터 (RPM·속도·DTC 등) | 시계열 분류 모델 |
| 운전자 얼굴 영상 (눈 감김·PERCLOS) | 컴퓨터 비전 (Face Tracking) |
| 주행 행동 (가속·제동·코너링) | 이상탐지·패턴 분류 |
| 고장코드(DTC) 누적 데이터 | 추세 예측·이상탐지 |

### 서비스 아키텍처
```
OBD-II 동글 (차량 장착)
       ↓ Bluetooth
스마트폰 앱 (Face Tracking 포함)
       ↓ HTTPS
AI 클라우드 (데이터 분석·학습·점수 산출)
       ↓
운전 안전 점수 / 경고 / 고장 예측 피드백
```

---

## 🚀 로컬 실행 방법

```bash
# 저장소 클론
git clone https://github.com/fooding-team/obdeye.git
cd obdeye

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

요구사항: Node.js 18 이상

---

## 📁 프로젝트 구조

```
obdeye/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.jsx        # 홈 · 안전점수 대시보드
│   │   ├── MonitorScreen.jsx     # 실시간 OBD + DMS 모니터링
│   │   ├── ReportScreen.jsx      # 주간 운전 리포트
│   │   └── VehicleScreen.jsx     # 차량 상태 · DTC · 고장예측
│   ├── App.jsx                   # 라우팅 · 네비게이션
│   └── index.css                 # 글로벌 디자인 토큰
├── public/
└── package.json
```

---

## 👥 팀 Fooding

| 이름 | 역할 |
|------|------|
| 정세영 | 팀장 · 서비스 기획 |
| 이병준 | AI · 데이터 설계 |
| 황종민 | 프론트엔드 개발 |

---

## 📄 라이선스

본 프로젝트는 2026년 X+AI·SW 융합 프로젝트 출품작입니다.
강원대학교 SW중심대학사업단 주최 | 운영: 데이콘(DACON)
