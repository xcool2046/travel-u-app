import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopHeader from './components/TopHeader';
import ContentDisplay from './components/ContentDisplay';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  border-radius: var(--border-radius-lg);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 10px;
    border-radius: var(--border-radius);
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // 移动端优化：添加触摸手势支持
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isScrolling = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e) => {
      if (!startX || !startY) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        isScrolling = true;
      }
    };

    const handleTouchEnd = (e) => {
      if (!startX || !startY || isScrolling) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // 滑动阈值
      const threshold = 50;
      
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        const tabs = ['home', 'friend', 'destination', 'game'];
        const currentIndex = tabs.indexOf(activeTab);
        
        if (diffX > 0 && currentIndex < tabs.length - 1) {
          // 向左滑动，切换到下一个tab
          setActiveTab(tabs[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
          // 向右滑动，切换到上一个tab
          setActiveTab(tabs[currentIndex - 1]);
        }
      }
      
      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeTab]);

  const handleAvatarChange = (newAvatar) => {
    setUserAvatar(newAvatar);
    if (user) {
      setUser({
        ...user,
        avatar: newAvatar
      });
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setUserAvatar(userData.avatar);
  };

  const handleLogout = () => {
    setUser(null);
    setUserAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face');
  };

  const handleAvatarClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleShowProfile = () => {
    setShowUserProfile(true);
  };

  const handleCloseProfile = () => {
    setShowUserProfile(false);
  };

  return (
    <AppContainer>
      <MainContent>
        <TopHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userAvatar={userAvatar}
          onAvatarChange={handleAvatarChange}
          user={user}
          onAvatarClick={handleAvatarClick}
          onLogout={handleLogout}
          onShowProfile={handleShowProfile}
        />
        <ContentDisplay activeTab={activeTab} />
      </MainContent>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onLogin={handleLogin}
      />
      {showUserProfile && user && (
        <UserProfile 
          user={user}
          onClose={handleCloseProfile}
        />
      )}
    </AppContainer>
  );
}

export default App; 