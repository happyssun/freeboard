import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 1920px;
  background-color: #ffd600;
  justify-content: center;
`;

export const WrapperMenu = styled.div`
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 40px;
`;

export const MenuItem = styled.div`
  cursor: pointer;

  :hover {
    color: #fff;
  }
`;
