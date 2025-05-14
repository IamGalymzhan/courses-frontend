import React, { useState } from "react";
import styled from "styled-components";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];

    // Add AI response
    newMessages.push({
      text: "Chatbot қолдану үшін API кілтті орнатыңыз",
      sender: "ai",
    });

    setMessages(newMessages);
    setInput("");
  };

  return (
    <>
      {isOpen && (
        <ChatContainer>
          <ChatHeader>
            <div>AI Көмекші</div>
            <CloseButton onClick={toggleChat}>×</CloseButton>
          </ChatHeader>
          <MessagesContainer>
            {messages.length === 0 ? (
              <WelcomeMessage>
                Сәлеметсіз бе! Мен сіздің AI көмекшіңізбін. Бүгін сізге қалай
                көмектесе аламын?
              </WelcomeMessage>
            ) : (
              messages.map((message, index) => (
                <Message key={index} sender={message.sender}>
                  {message.text}
                </Message>
              ))
            )}
          </MessagesContainer>
          <InputForm onSubmit={handleSubmit}>
            <ChatInput
              type="text"
              placeholder="Хабарлама жазыңыз..."
              value={input}
              onChange={handleInputChange}
            />
            <SendButton type="submit">
              <SendIcon>↑</SendIcon>
            </SendButton>
          </InputForm>
        </ChatContainer>
      )}
      <ChatButtonContainer>
        <ChatButtonCircle onClick={toggleChat}>
          <ChatIcon>💬</ChatIcon>
        </ChatButtonCircle>
      </ChatButtonContainer>
    </>
  );
};

export default AIChatButton;

// Styled Components
const ChatButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ChatButtonCircle = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3066be;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(48, 102, 190, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #254d95;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(48, 102, 190, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(48, 102, 190, 0.3);
  }
`;

const ChatIcon = styled.span`
  font-size: 26px;
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ChatHeader = styled.div`
  padding: 16px;
  background-color: #3066be;
  color: white;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 26px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f8f9fa;
`;

const WelcomeMessage = styled.div`
  background-color: #e7f0ff;
  padding: 14px;
  border-radius: 12px;
  align-self: center;
  max-width: 85%;
  color: #333;
  text-align: center;
  margin: 15px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 85%;
  word-break: break-word;
  line-height: 1.4;

  ${(props) =>
    props.sender === "user"
      ? `
    background-color: #3066be;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
    color: white;
    box-shadow: 0 1px 2px rgba(48, 102, 190, 0.2);
  `
      : `
    background-color: white;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `}
`;

const InputForm = styled.form`
  display: flex;
  padding: 12px 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
  background-color: #f5f5f5;
  transition: all 0.2s;

  &:focus {
    border-color: #3066be;
    background-color: white;
    box-shadow: 0 0 0 2px rgba(48, 102, 190, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: #3066be;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #254d95;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SendIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;
