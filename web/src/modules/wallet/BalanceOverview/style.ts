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

export const Line = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.textSecondary};
`;
