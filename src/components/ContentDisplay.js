import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import HomePage from './pages/HomePage';

const ContentContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const ContentWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const ContentDisplay = ({ activeTab }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      y: 20,
      filter: "blur(2px)"
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -10,
      filter: "blur(1px)",
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const PlaceholderPage = ({ title, message }) => (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--text-secondary)'
    }}>
      <h2 style={{ 
        color: 'var(--primary-color)', 
        marginBottom: '1rem',
        fontSize: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {title}
      </h2>
      <p style={{ 
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        lineHeight: 1.6,
        maxWidth: '600px'
      }}>
        {message}
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'friend':
        return (
          <PlaceholderPage 
            title="好友中心" 
            message="好友功能正在开发中，敬请期待！在这里您将能够管理旅行好友，查看好友动态，分享旅行经历。" 
          />
        );
      case 'destination':
        return (
          <PlaceholderPage 
            title="目的地探索" 
            message="目的地功能正在开发中，敬请期待！在这里您将能够浏览热门目的地，查看详细攻略，获取旅行灵感。" 
          />
        );
      case 'game':
        return (
          <PlaceholderPage 
            title="游戏中心" 
            message="游戏中心即将上线，敬请期待！在这里您将能够参与旅行相关的趣味游戏，赢取奖励，结识更多朋友。" 
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <ContentContainer>
      <AnimatePresence mode="wait">
        <ContentWrapper
          key={activeTab}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderContent()}
        </ContentWrapper>
      </AnimatePresence>
    </ContentContainer>
  );
};

export default ContentDisplay; 