import styled from 'styled-components';

export const Container = styled.section`
  height: 100%;
  width: 100%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  --section-spacing: 0.75rem 0.5rem;
  --title-font: 0.8rem;
  --title-weight: 600;
`;

export const Header = styled.div`
  flex: 1 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  padding: var(--section-spacing);

  & > h3 {
    text-align: center;
    font-size: var(--title-font);
    font-weight: var(--title-weight);
  }
`;

export const Section = styled.div`
  flex: 1 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkThree};
  padding: var(--section-spacing);

  & > h4 {
    font-size: var(--title-font);
    font-weight: var(--title-weight);
  }
`;
