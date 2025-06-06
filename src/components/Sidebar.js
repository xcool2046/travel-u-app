import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 100%;
  height: auto;
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: relative;

  @media (min-width: 768px) {
    width: 20%;
    height: 100vh;
    justify-content: flex-start;
    padding: 2rem 1.5rem;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
`;

const ActionCards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ActionCard = styled(motion.div)`
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex: 1;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.15), transparent);
    transition: left 0.6s ease;
    z-index: 1;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 767px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  position: relative;
  z-index: 2;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const CardContent = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    text-align: center;
    position: relative;
    z-index: 2;
    letter-spacing: 0.3px;

    @media (max-width: 767px) {
      font-size: 0.9rem;
    }
  }
`;

const Sidebar = () => {
  const handleCardClick = (action) => {
    console.log(`点击了${action}功能`);
    // 这里可以添加具体的功能逻辑
  };

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "var(--shadow-xl)",
      borderColor: "rgba(99, 102, 241, 0.5)",
      background: "rgba(255, 255, 255, 0.98)",
      transition: { duration: 0.3 }
    },
    tap: {
      y: -4,
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>发现旅伴</SidebarTitle>
      </SidebarHeader>
      
      <ActionCards>
        <ActionCard
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleCardClick('people-match')}
        >
          <CardIcon>👥</CardIcon>
          <CardContent>
            <h4>人人匹配</h4>
          </CardContent>
        </ActionCard>
        
        <ActionCard
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleCardClick('location-match')}
        >
          <CardIcon>📍</CardIcon>
          <CardContent>
            <h4>人地匹配</h4>
          </CardContent>
        </ActionCard>
      </ActionCards>
    </SidebarContainer>
  );
};

export default Sidebar; 