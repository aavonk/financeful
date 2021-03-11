import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;

  & > h1 {
    color: #fff;
    font-size: 28px;
    font-weight: 700;
  }

  & > svg {
    margin-bottom: 5px;
  }
`;
