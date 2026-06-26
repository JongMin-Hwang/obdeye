import { useState } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import MonitorScreen from './screens/MonitorScreen';
import ReportScreen from './screens/ReportScreen';
import VehicleScreen from './screens/VehicleScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import AIScoreScreen from './screens/AIScoreScreen';
import styles from './App.module.css';

const NAV = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'monitor', icon: '📡', label: '모니터링' },
  { id: 'report', icon: '📊', label: '리포트' },
  { id: 'vehicle', icon: '🚗', label: '차량' },
  { id: 'insurance', icon: '🛡️', label: '보험' },
];

const NO_NAV = ['onboarding', 'aiscore'];

export default function App() {
  const [screen, setScreen] = useState('onboarding');

  return (
    <div className={styles.app}>
      <div className={styles.statusBar}>
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      <div className={styles.content}>
        {screen === 'onboarding' && <OnboardingScreen goScreen={setScreen} />}
        {screen === 'home'       && <HomeScreen goScreen={setScreen} />}
        {screen === 'monitor'    && <MonitorScreen goScreen={setScreen} />}
        {screen === 'report'     && <ReportScreen />}
        {screen === 'vehicle'    && <VehicleScreen />}
        {screen === 'insurance'  && <InsuranceScreen />}
        {screen === 'aiscore'    && <AIScoreScreen />}
      </div>
      {!NO_NAV.includes(screen) && (
        <nav className={styles.nav}>
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`${styles.navItem} ${screen === n.id ? styles.active : ''}`}
              onClick={() => setScreen(n.id)}
            >
              <div className={styles.navIndicator} />
              <span className={styles.navIcon}>{n.icon}</span>
              <span className={styles.navLabel}>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
