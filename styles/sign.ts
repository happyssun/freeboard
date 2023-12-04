import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const formContainer = css`
  max-width: 400px;
  margin: auto;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const title = css`
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;

  color: #5729ff;
  margin-bottom: 16px;
`;

export const input = css`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const button = css`
  width: 100%;
  padding: 12px;
  margin: 6px 0;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;
export const SubButton = styled.button`
  ${button}
  background-color: #5729ff;
  color: #fff;

  &:hover {
    background-color: #4924cc; /* 조금 더 어두운 색상으로 변경 */
    color: #fff;
  }

  &:active {
    background-color: #361a8e; /* 클릭 시 더 어두운 색상으로 변경 */
    color: #fff;
  }
`;

export const MoveButton = styled.button`
  ${button}
  background-color: #f2f5fc;
  color: #5729ff;

  &:hover {
    background-color: #e3e7f4;
    color: #5729ff;
  }

  &:active {
    background-color: #c4c9e4;
    color: #5729ff;
  }
`;

export const FormContainer = styled.form`
  ${formContainer}
`;

export const Title = styled.h2`
  ${title}
`;

export const Input = styled.input`
  ${input}
`;

export const Button = styled.button`
  ${button}
`;
