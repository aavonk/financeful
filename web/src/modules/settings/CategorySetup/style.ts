import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  /* flex: 0 0 40%; */
  padding-right: 36px;

  @media (max-width: 700px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const Right = styled.div`
  flex-grow: 1;
`;
