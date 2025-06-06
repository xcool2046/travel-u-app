import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ProfileOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

const ProfileContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ProfileHeader = styled.div`
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(139, 92, 246, 0.3);
  margin-bottom: 20px;
`;

const ProfileName = styled.h2`
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ProfileEmail = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 20px;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 12px;
`;

const ProfileContent = styled.div`
  padding: 30px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
`;

const InfoValue = styled.span`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
`;

const EditButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

const UserProfile = ({ user, onClose }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  // 模拟用户数据
  const userStats = {
    trips: 12,
    friends: 48,
    photos: 156
  };

  const userInfo = {
    joinDate: '2023年6月',
    location: '北京',
    interests: '摄影、徒步、美食',
    bio: '热爱旅行的探险者，喜欢发现世界的美好角落'
  };

  return (
    <AnimatePresence>
      <ProfileOverlay
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <ProfileContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <ProfileHeader>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            <ProfileAvatar src={user.avatar} alt={user.name} />
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
            
            <ProfileStats>
              <StatItem>
                <StatNumber>{userStats.trips}</StatNumber>
                <StatLabel>旅行次数</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{userStats.friends}</StatNumber>
                <StatLabel>好友数量</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{userStats.photos}</StatNumber>
                <StatLabel>分享照片</StatLabel>
              </StatItem>
            </ProfileStats>
          </ProfileHeader>

          <ProfileContent>
            <Section>
              <SectionTitle>
                📋 基本信息
              </SectionTitle>
              <InfoItem>
                <InfoLabel>加入时间</InfoLabel>
                <InfoValue>{userInfo.joinDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>所在地</InfoLabel>
                <InfoValue>{userInfo.location}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>兴趣爱好</InfoLabel>
                <InfoValue>{userInfo.interests}</InfoValue>
              </InfoItem>
            </Section>

            <Section>
              <SectionTitle>
                💬 个人简介
              </SectionTitle>
              <InfoValue style={{ lineHeight: '1.6' }}>
                {userInfo.bio}
              </InfoValue>
            </Section>

            <EditButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              编辑个人资料
            </EditButton>
          </ProfileContent>
        </ProfileContainer>
      </ProfileOverlay>
    </AnimatePresence>
  );
};

export default UserProfile; 