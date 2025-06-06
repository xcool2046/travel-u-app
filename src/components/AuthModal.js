import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ModalOverlay = styled(motion.div)`
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
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ModalTitle = styled.h2`
  color: var(--text-primary);
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const ModalSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
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
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: var(--text-white);
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SwitchMode = styled.div`
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 14px;
`;

const SwitchLink = styled.span`
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
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

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟API调用
    setTimeout(() => {
      if (isLoginMode) {
        // 登录逻辑
        if (formData.email && formData.password) {
          onLogin({
            email: formData.email,
            name: formData.name || formData.email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
          });
          onClose();
        }
      } else {
        // 注册逻辑
        if (formData.email && formData.password && formData.password === formData.confirmPassword && formData.name) {
          onLogin({
            email: formData.email,
            name: formData.name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
          });
          onClose();
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <ModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            <ModalHeader>
              <ModalTitle>{isLoginMode ? '欢迎回来' : '加入旅U'}</ModalTitle>
              <ModalSubtitle>
                {isLoginMode ? '登录您的账户继续旅行' : '创建账户开始您的旅行之旅'}
              </ModalSubtitle>
            </ModalHeader>

            <FormContainer onSubmit={handleSubmit}>
              {!isLoginMode && (
                <InputGroup>
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="请输入您的姓名"
                    required={!isLoginMode}
                  />
                </InputGroup>
              )}

              <InputGroup>
                <Label htmlFor="email">邮箱</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="请输入邮箱地址"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">密码</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="请输入密码"
                  required
                />
              </InputGroup>

              {!isLoginMode && (
                <InputGroup>
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="请再次输入密码"
                    required={!isLoginMode}
                  />
                </InputGroup>
              )}

              <SubmitButton
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? '处理中...' : (isLoginMode ? '登录' : '注册')}
              </SubmitButton>
            </FormContainer>

            <SwitchMode>
              {isLoginMode ? '还没有账户？' : '已有账户？'}
              <SwitchLink onClick={switchMode}>
                {isLoginMode ? '立即注册' : '立即登录'}
              </SwitchLink>
            </SwitchMode>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 