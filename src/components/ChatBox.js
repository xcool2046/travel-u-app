import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ChatContainer = styled(motion.div)`
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

const ChatWindow = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 767px) {
    height: 80vh;
    max-height: 600px;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 12px;
`;

const ContactAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
`;

const OnlineStatus = styled.div`
  color: var(--text-secondary);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.online ? '#10b981' : '#6b7280'};
  }
`;

const CloseButton = styled(motion.button)`
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

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled(motion.div)`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  align-self: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  background: ${props => props.isOwn 
    ? 'linear-gradient(135deg, var(--primary-color), var(--primary-light))'
    : 'rgba(255, 255, 255, 0.1)'
  };
  color: ${props => props.isOwn ? 'white' : 'var(--text-primary)'};
  border: ${props => props.isOwn ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  backdrop-filter: ${props => props.isOwn ? 'none' : 'blur(10px)'};
`;

const MessageTime = styled.div`
  font-size: 10px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: ${props => props.isOwn ? 'right' : 'left'};
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  font-family: inherit;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
  }
`;

const SendButton = styled(motion.button)`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatBox = ({ friend, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: friend.lastMessage, isOwn: false, time: friend.time },
    { id: 2, text: '好的，我们一起规划一下行程！', isOwn: true, time: '10:32' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setMessages([...messages, {
        id: Date.now(),
        text: newMessage.trim(),
        isOwn: true,
        time: timeStr
      }]);
      setNewMessage('');
      
      // 模拟对方回复
      setTimeout(() => {
        const replies = [
          '听起来不错！',
          '我也觉得这个想法很棒',
          '什么时候出发呢？',
          '我来查一下路线',
          '期待这次旅行！'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: randomReply,
          isOwn: false,
          time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`
        }]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const windowVariants = {
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

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      <ChatContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <ChatWindow
          variants={windowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <ChatHeader>
            <ContactAvatar src={friend.avatar} alt={friend.name} />
            <ContactInfo>
              <ContactName>{friend.name}</ContactName>
              <OnlineStatus online={friend.online}>
                {friend.online ? '在线' : '离线'}
              </OnlineStatus>
            </ContactInfo>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((message) => (
              <Message
                key={message.id}
                isOwn={message.isOwn}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
              >
                {message.text}
                <MessageTime isOwn={message.isOwn}>
                  {message.time}
                </MessageTime>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <MessageInput
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              rows={1}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📤
            </SendButton>
          </InputContainer>
        </ChatWindow>
      </ChatContainer>
    </AnimatePresence>
  );
};

export default ChatBox; 