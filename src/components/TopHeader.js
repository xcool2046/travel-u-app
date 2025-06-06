import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  gap: 2rem;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;

  @media (max-width: 767px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
`;

const AvatarSection = styled.div`
  flex-shrink: 0;
`;

const Avatar = styled(motion.img)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgba(99, 102, 241, 0.3);
  object-fit: cover;
  background-color: var(--bg-light);
  cursor: pointer;

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  flex: 1;
`;

const NavItem = styled(motion.div)`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-white);
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  user-select: none;
  transition: all 0.3s ease;

  ${props => props.active && `
    background: rgba(139, 92, 246, 0.4);
    color: var(--text-white);
    border-color: rgba(139, 92, 246, 0.6);
    transform: scale(1.1);
    box-shadow: 
      0 12px 24px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  `}

  @media (max-width: 767px) {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
`;

const TopHeader = ({ activeTab, setActiveTab, userAvatar, onAvatarChange }) => {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'home', label: 'H' },
    { id: 'friend', label: 'F' },
    { id: 'destination', label: 'D' },
    { id: 'game', label: 'G' }
  ];

  const avatarVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <HeaderContainer>
      <AvatarSection>
        <Avatar
          src={userAvatar}
          alt="User Avatar"
          onClick={handleAvatarClick}
          variants={avatarVariants}
          whileHover="hover"
          whileTap="tap"
        />
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </AvatarSection>
      
      <TopNav>
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            variants={navItemVariants}
            whileHover={activeTab !== tab.id ? "hover" : {}}
            whileTap="tap"
          >
            {tab.label}
          </NavItem>
        ))}
      </TopNav>
    </HeaderContainer>
  );
};

export default TopHeader; 