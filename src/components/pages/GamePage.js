import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GameContainer = styled.div`
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

const GameList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const GameItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
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

const GameIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color || 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const GameInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const GameName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const GameDescription = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const GameStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const GameScore = styled.div`
  color: var(--accent-color);
  font-weight: 600;
  font-size: 14px;
`;

const GameStatus = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => 
    props.status === 'playing' ? 'rgba(16, 185, 129, 0.2)' : 
    props.status === 'completed' ? 'rgba(139, 92, 246, 0.2)' : 
    'rgba(107, 114, 128, 0.2)'
  };
  color: ${props => 
    props.status === 'playing' ? '#10b981' : 
    props.status === 'completed' ? '#8b5cf6' : 
    '#6b7280'
  };
  border: 1px solid ${props => 
    props.status === 'playing' ? 'rgba(16, 185, 129, 0.3)' : 
    props.status === 'completed' ? 'rgba(139, 92, 246, 0.3)' : 
    'rgba(107, 114, 128, 0.3)'
  };
`;

const GamePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟游戏数据
  const games = [
    {
      id: 1,
      name: '地理大挑战',
      icon: '🌍',
      description: '测试你的世界地理知识',
      score: '1250分',
      status: 'playing',
      color: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      id: 2,
      name: '旅行规划师',
      icon: '📋',
      description: '规划最完美的旅行路线',
      score: '850分',
      status: 'completed',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      id: 3,
      name: '文化探索者',
      icon: '🏛️',
      description: '探索世界各地的文化奇观',
      score: '2100分',
      status: 'playing',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    },
    {
      id: 4,
      name: '美食猎人',
      icon: '🍜',
      description: '寻找全球特色美食',
      score: '670分',
      status: 'available',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      id: 5,
      name: '语言学习',
      icon: '💬',
      description: '学习旅行必备语言技能',
      score: '1450分',
      status: 'completed',
      color: 'linear-gradient(135deg, #ec4899, #db2777)'
    },
    {
      id: 6,
      name: '摄影达人',
      icon: '📸',
      description: '捕捉最美的旅行瞬间',
      score: '980分',
      status: 'playing',
      color: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      id: 7,
      name: '预算管家',
      icon: '💰',
      description: '学会合理规划旅行预算',
      score: '1800分',
      status: 'completed',
      color: 'linear-gradient(135deg, #84cc16, #65a30d)'
    },
    {
      id: 8,
      name: '极限挑战',
      icon: '🏔️',
      description: '挑战世界极限运动',
      score: '520分',
      status: 'available',
      color: 'linear-gradient(135deg, #ef4444, #dc2626)'
    }
  ];

  // 过滤游戏
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'playing': return '进行中';
      case 'completed': return '已完成';
      case 'available': return '可开始';
      default: return '未知';
    }
  };

  return (
    <GameContainer>
      <SearchSection>
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="搜索游戏..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <GameList>
        {filteredGames.map((game, index) => (
          <GameItem
            key={game.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GameIcon color={game.color}>
              {game.icon}
            </GameIcon>
            <GameInfo>
              <GameName>{game.name}</GameName>
              <GameDescription>{game.description}</GameDescription>
            </GameInfo>
            <GameStats>
              <GameScore>{game.score}</GameScore>
              <GameStatus status={game.status}>
                {getStatusText(game.status)}
              </GameStatus>
            </GameStats>
          </GameItem>
        ))}
      </GameList>
    </GameContainer>
  );
};

export default GamePage; 