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
  position: relative;
  z-index: 10;

  @media (max-width: 767px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
`;

const AvatarSection = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 20;
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

const UserInfo = styled.div`
  position: fixed;
  top: ${props => props.show ? '70px' : '60px'};
  left: 2rem;
  background: rgba(20, 20, 40, 0.98);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 12px;
  padding: 16px;
  min-width: 180px;
  z-index: 99999;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? '0' : '-10px'});
  pointer-events: ${props => props.show ? 'all' : 'none'};
  transition: all 0.3s ease;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    0 5px 15px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  @media (max-width: 767px) {
    left: 1rem;
    top: ${props => props.show ? '60px' : '50px'};
  }
`;

const UserName = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 6px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const UserEmail = styled.div`
  color: #e2e8f0;
  font-size: 13px;
  margin-bottom: 12px;
  opacity: 0.9;
`;

const LoginPrompt = styled.div`
  color: #e2e8f0;
  font-size: 13px;
  text-align: center;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  margin-bottom: 6px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuButton = styled(LogoutButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(139, 92, 246, 0.3);
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

const TopHeader = ({ activeTab, setActiveTab, userAvatar, onAvatarChange, user, onAvatarClick, onLogout, onShowProfile }) => {
  const fileInputRef = useRef(null);
  const [showUserInfo, setShowUserInfo] = React.useState(false);

  const handleAvatarClick = () => {
    if (user) {
      setShowUserInfo(!showUserInfo);
    } else {
      onAvatarClick();
    }
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

  const handleUploadClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
    setShowUserInfo(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    onShowProfile();
    setShowUserInfo(false);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    onLogout();
    setShowUserInfo(false);
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

  // 点击外部关闭用户信息面板
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserInfo) {
        setShowUserInfo(false);
      }
    };

    if (showUserInfo) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserInfo]);

  return (
    <HeaderContainer>
      <AvatarSection onClick={(e) => e.stopPropagation()}>
        <Avatar
          src={user ? user.avatar : userAvatar}
          alt="User Avatar"
          onClick={handleAvatarClick}
          variants={avatarVariants}
          whileHover="hover"
          whileTap="tap"
        />
        <UserInfo show={showUserInfo}>
          {user ? (
            <>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <MenuButton onClick={handleProfileClick}>
                个人主页
              </MenuButton>
              <MenuButton onClick={handleUploadClick}>
                更换头像
              </MenuButton>
              <LogoutButton onClick={handleLogout}>
                退出登录
              </LogoutButton>
            </>
          ) : (
            <LoginPrompt>点击头像登录</LoginPrompt>
          )}
        </UserInfo>
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