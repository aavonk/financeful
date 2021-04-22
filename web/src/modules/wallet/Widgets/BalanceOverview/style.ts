import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  & > h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  & > h4 {
    font-size: 1.75rem;
    font-weight: 700;
    padding-top: 8px;
  }
`;
export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.825rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProgressbarRoot = styled.div`
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  background-color: black;
`;

export const Progressbar = styled.div`
  border-radius: 5px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.4s linear;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform-origin: left;
`;
