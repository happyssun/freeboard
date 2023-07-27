import styled from "@emotion/styled";

export const Wapper = styled.div`
  height: 100px;

  display: flex;
  flex-direction: row;
`;

export const InnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

export const InnerLogo = styled.img`
  background: url("../../../../public/images/");
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* font-size: 18px; */
`;
export const InnerButton = styled.div`
  height: 40px;
  width: 92px;
  background-color: #ffd600;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
`;
