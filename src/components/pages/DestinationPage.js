import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const DestinationContainer = styled.div`
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

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  color: var(--primary-color);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const CardHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 767px) {
    padding: 1rem 1.5rem 0.5rem;
  }
`;

const CategoryTitle = styled.h2`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const CategoryDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
`;

const ImageSlider = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;

  @media (max-width: 767px) {
    height: 200px;
  }
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 1.5rem;
  
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const ImageTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const ImageLocation = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const SliderControls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
`;

const SliderButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 18px;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DotsIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 1rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const DestinationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // 每个分类的当前图片索引
  const [currentImageIndex, setCurrentImageIndex] = useState({
    nature: 0,
    city: 0,
    beach: 0,
    mountain: 0
  });

  // 目的地分类数据
  const categories = [
    {
      id: 'nature',
      title: '🌿 自然风光',
      description: '探索大自然的鬼斧神工，感受原始森林的宁静与壮美',
      keywords: ['自然', '森林', '峡湾', '雨林', '蓝湖', '风光'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          title: '挪威峡湾',
          location: '挪威'
        },
        {
          url: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&h=400&fit=crop',
          title: '亚马逊雨林',
          location: '巴西'
        },
        {
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
          title: '塞舌尔群岛',
          location: '塞舌尔'
        },
        {
          url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=400&fit=crop',
          title: '冰岛蓝湖',
          location: '冰岛'
        }
      ]
    },
    {
      id: 'city',
      title: '🏙️ 现代都市',
      description: '体验繁华都市的独特魅力，感受现代文明的脉搏',
      keywords: ['都市', '城市', '夜景', '天际线', '现代', '文明'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
          title: '东京夜景',
          location: '日本'
        },
        {
          url: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=400&fit=crop',
          title: '纽约天际线',
          location: '美国'
        },
        {
          url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=400&fit=crop',
          title: '伦敦塔桥',
          location: '英国'
        },
        {
          url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=400&fit=crop',
          title: '巴黎铁塔',
          location: '法国'
        }
      ]
    },
    {
      id: 'beach',
      title: '🏖️ 海滨度假',
      description: '享受阳光沙滩的惬意时光，在碧海蓝天中放松身心',
      keywords: ['海滨', '海滩', '沙滩', '度假', '阳光', '海岛'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
          title: '马尔代夫',
          location: '马尔代夫'
        },
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
          title: '夏威夷海滩',
          location: '美国'
        },
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop',
          title: '圣托里尼',
          location: '希腊'
        },
        {
          url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800&h=400&fit=crop',
          title: '巴厘岛',
          location: '印度尼西亚'
        }
      ]
    },
    {
      id: 'mountain',
      title: '⛰️ 高山探险',
      description: '挑战高山峻岭，在群山之巅俯瞰世界的壮丽',
      keywords: ['高山', '探险', '登山', '峻岭', '雪山', '挑战'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          title: '挪威峡湾山脉',
          location: '挪威'
        },
        {
          url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
          title: '阿尔卑斯山',
          location: '瑞士'
        },
        {
          url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop',
          title: '安第斯山脉',
          location: '秘鲁'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
          title: '富士山',
          location: '日本'
        }
      ]
    }
  ];

  // 过滤分类功能
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
    category.images.some(image => 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const nextImage = (categoryId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] + 1) % 4
    }));
  };

  const prevImage = (categoryId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === 0 ? 3 : prev[categoryId] - 1
    }));
  };

  const goToImage = (categoryId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [categoryId]: index
    }));
  };

  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <DestinationContainer>
      <SearchSection>
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="搜索目的地分类或地点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <ContentArea>
        <CategoryGrid>
          {filteredCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CardHeader>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CardHeader>

              <ImageSlider>
                <AnimatePresence mode="wait">
                  <ImageContainer
                    key={currentImageIndex[category.id]}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <SliderImage
                      src={category.images[currentImageIndex[category.id]].url}
                      alt={category.images[currentImageIndex[category.id]].title}
                    />
                    <ImageOverlay>
                      <ImageTitle>
                        {category.images[currentImageIndex[category.id]].title}
                      </ImageTitle>
                      <ImageLocation>
                        📍 {category.images[currentImageIndex[category.id]].location}
                      </ImageLocation>
                    </ImageOverlay>
                  </ImageContainer>
                </AnimatePresence>

                <SliderControls>
                  <SliderButton
                    onClick={() => prevImage(category.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ‹
                  </SliderButton>
                  <SliderButton
                    onClick={() => nextImage(category.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ›
                  </SliderButton>
                </SliderControls>
              </ImageSlider>

              <DotsIndicator>
                {category.images.map((_, imgIndex) => (
                  <Dot
                    key={imgIndex}
                    active={currentImageIndex[category.id] === imgIndex}
                    onClick={() => goToImage(category.id, imgIndex)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </DotsIndicator>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </ContentArea>
    </DestinationContainer>
  );
};

export default DestinationPage; 