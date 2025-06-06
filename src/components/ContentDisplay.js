import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import FriendPage from './pages/FriendPage';
import DestinationPage from './pages/DestinationPage';
import GamePage from './pages/GamePage';

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

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'friend':
        return <FriendPage />;
      case 'destination':
        return <DestinationPage />;
      case 'game':
        return <GamePage />;
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