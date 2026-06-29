import { useEffect, useState } from 'react';
import { Flame, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/home/heroright.png';
import { getAllStats, loadHabits } from '../../../shared/utils/habitStorage';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState(getAllStats(loadHabits()));

  useEffect(() => {
    const sync = () => setStats(getAllStats(loadHabits()));
    window.addEventListener('habits-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('habits-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-layout">
        <div className="left-hero">
          <div className="pill-badge">
            <div className="pill-icon">
              <Flame size={14} fill="#fff" color="#fff" />
            </div>
            <span className="pill-text">
              Build better habits. <span className="pill-muted">Become your best self.</span>
            </span>
          </div>

          <h1 className="hero-title">
            Small habits today,<br />
            <span className="highlight-gradient">extraordinary life</span><br />
            tomorrow.
          </h1>

          <p className="hero-subtitle">
            Track your daily habits, stay consistent, and watch yourself grow one day at a time.
          </p>

          <div className="global-stat">
            <div className="streak-icon">
              <Flame size={28} fill="#ffffff" color="#ffffff" />
            </div>
            <div className="streak-copy">
              <p className="streak-label">Current Streak</p>
              <strong>{stats.currentStreak}</strong>
              <span>days</span>
              <p className="streak-message">Keep it going!</p>
            </div>
          </div>

          <div className="action-container">
            <Link to="/dashboard" className="cta-button">
              Begin Tracking <ArrowRight size={18} className="cta-arrow" />
            </Link>
            <div className="safety-badge">
              <div className="check-shield">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>Your data stays in this browser</span>
            </div>
          </div>
        </div>

        <div className="right-showcase">
          <img src={heroImage} alt="Habit tracking dashboard illustration" />
        </div>
      </div>
    </div>
  );
};

export default Home;
