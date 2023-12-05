import React from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 40px; /* 적당한 크기로 조정 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center; /* 텍스트를 중앙으로 정렬 */
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #5729ff;
  margin-bottom: 16px;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
`;

const ModalButton = styled.button`
  padding: 12px;
  background-color: #5729ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4924cc;
    color: #fff;
  }

  &:active {
    background-color: #361a8e;
    color: #fff;
  }
`;

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {
  // 모달이 열리면 5초 후에 닫히도록 설정
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(); // 부모 컴포넌트에서 전달된 onClose 함수 호출
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButton onClick={onClose}>Close</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
