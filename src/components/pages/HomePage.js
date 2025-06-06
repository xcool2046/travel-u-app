import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HomeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  z-index: 2;

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 767px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled(motion.h1)`
  color: var(--primary-color);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  line-height: 1.2;
  text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-secondary);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 2.5rem 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 32px 64px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 767px) {
    padding: 2rem 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));

  @media (max-width: 767px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const FeatureTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const FeatureButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: var(--text-white);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 
    0 8px 16px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 
      0 12px 24px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const HomePage = () => {
  const features = [
    {
      icon: '🤖',
      title: '智配同行',
      description: '基于兴趣爱好、旅行偏好和时间安排，为您精准匹配志同道合的旅行伙伴，让每次出行都充满惊喜。',
      action: '开始匹配'
    },
    {
      icon: '🎯',
      title: '智推探地',
      description: 'AI智能分析您的偏好，结合实时天气、热门景点和用户评价，为您推荐最适合的旅行目的地。',
      action: '探索目的地'
    },
    {
      icon: '🧠',
      title: '智行规划',
      description: '自动生成个性化旅行路线，包含交通、住宿、美食推荐，让您的旅行规划变得轻松简单。',
      action: '制定计划'
    }
  ];

  const stats = [
    { number: '10K+', label: '活跃用户' },
    { number: '500+', label: '目的地' },
    { number: '2K+', label: '成功匹配' },
    { number: '4.9', label: '用户评分' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
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
    <HomeContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection>
          <Title variants={itemVariants}>
            旅U - 智能旅行伙伴
          </Title>
          <Subtitle variants={itemVariants}>
            智能旅行社交平台，连接全球旅行者。无论您是独自背包客，还是寻找旅行伙伴的探险家，
            旅U都能为您找到最合适的旅行伙伴，让每一次旅行都成为难忘的回忆。
          </Subtitle>
        </HeroSection>

        <FeatureGrid variants={itemVariants}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
              }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {feature.action}
              </FeatureButton>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <StatsSection variants={itemVariants}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.5 + index * 0.1, duration: 0.4 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsSection>
      </motion.div>
    </HomeContainer>
  );
};

export default HomePage; 