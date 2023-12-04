import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 152px;
  background-color: #f5f2fc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: "live";
  font-style: italic;
  color: #5729ff;
  cursor: pointer;
`;

export const buttonWrapper = styled.div`
  display: flex;
`;

export const InnerButton = styled.div`
  margin: 10px;
  cursor: pointer;
  border: 1px solid #5729ff;
  border-radius: 10px;
  padding: 8px 16px;
  transition: background-color 0.3s, color 0.3s;
`;

// 첫 번째 버튼 스타일
export const SignInButton = styled(InnerButton)`
  background-color: #5729ff;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: #5729ff;
  }
`;

// 두 번째 버튼 스타일
export const SignUpButton = styled(InnerButton)`
  background-color: #fff;
  color: #5729ff;

  &:hover {
    background-color: #5729ff;
    color: #fff;
  }
`;
