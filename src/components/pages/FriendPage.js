import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ChatBox from '../ChatBox';

const FriendContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  position: relative;
  z-index: 2;
`;

const SearchSection = styled.div`
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: var(--text-primary);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 18px;
`;

const FriendList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const FriendItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const FriendInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const LastMessage = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MessageTime = styled.div`
  color: var(--text-secondary);
  font-size: 12px;
  margin-left: 8px;
  opacity: 0.7;
`;

const OnlineStatus = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.online ? '#10b981' : '#6b7280'};
  border: 2px solid rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: -2px;
  right: -2px;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 12px;
`;

const FriendPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  // 模拟好友数据
  const friends = [
    {
      id: 1,
      name: '小丽',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli&backgroundColor=b6e3f4,c0aede,d1d4f9',
      lastMessage: '下周一起去大理吧！',
      time: '10:30',
      online: true
    },
    {
      id: 2,
      name: '张伟',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei&backgroundColor=ffdfbf,ffd5dc,c0aede',
      lastMessage: '西藏的照片太美了～',
      time: '昨天',
      online: false
    },
    {
      id: 3,
      name: '王芳',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang&backgroundColor=d1d4f9,ffdfbf,b6e3f4',
      lastMessage: '明天几点出发？',
      time: '9:15',
      online: true
    },
    {
      id: 4,
      name: '李强',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liqiang&backgroundColor=c0aede,ffd5dc,d1d4f9',
      lastMessage: '分享了一个旅行攻略',
      time: '前天',
      online: true
    },
    {
      id: 5,
      name: '陈思',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chensi&backgroundColor=ffd5dc,b6e3f4,ffdfbf',
      lastMessage: '成都的火锅太好吃了！',
      time: '8:45',
      online: false
    },
    {
      id: 6,
      name: '刘明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuming&backgroundColor=ffdfbf,c0aede,b6e3f4',
      lastMessage: '一起组队去爬山吗？',
      time: '7:20',
      online: true
    }
  ];

  // 过滤好友
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChatBox = () => {
    setSelectedFriend(null);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <FriendContainer>
      <SearchSection>
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="搜索好友或消息..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <FriendList>
        {filteredFriends.map((friend, index) => (
          <FriendItem
            key={friend.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleFriendClick(friend)}
          >
            <AvatarContainer>
              <Avatar src={friend.avatar} alt={friend.name} />
              <OnlineStatus online={friend.online} />
            </AvatarContainer>
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <LastMessage>{friend.lastMessage}</LastMessage>
            </FriendInfo>
            <MessageTime>{friend.time}</MessageTime>
          </FriendItem>
        ))}
      </FriendList>

      {selectedFriend && (
        <ChatBox 
          friend={selectedFriend} 
          onClose={handleCloseChatBox}
        />
      )}
    </FriendContainer>
  );
};

export default FriendPage; 