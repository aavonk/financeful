import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding-top: 1rem;
`;

export const GridOutter = styled.div`
  flex: 0 0 40%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

export const GridInner = styled.div`
  flex: 0 0 20%;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 2rem;

  & > button {
    margin-bottom: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: block;

  & > :first-child {
    margin-right: 1rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    flex: 1 0 auto;
  }
`;

export const ListHeader = styled.h3;
