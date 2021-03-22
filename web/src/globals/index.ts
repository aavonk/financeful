import styled from 'styled-components';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
export const Col = styled.div<{ width: string }>`
  flex: 0 0 auto;
  width: ${(props) => props.width};
  padding-right: calc(1rem / 2);
  padding-left: calc(1rem / 2);
  margin-top: 0.5rem;
`;
