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
`;
