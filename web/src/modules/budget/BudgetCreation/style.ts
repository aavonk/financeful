import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 5rem;

  @media ${({ theme }) => theme.device.tabletAndUp} {
    flex-direction: row;
  }
`;

export const GridOutter = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
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

  @media ${({ theme }) => theme.device.tabletAndUp} {
    padding: 40px 1.5rem 0 1.5rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    padding: 40px 1rem 0 1rem;
  }

  /* Make the "Add Selected" button stick to the bottom on mobile device
     to prevent having to scroll up and down to select a category
   */
  @media ${({ theme }) => theme.device.tabletAndDown} {
    & > button.fixed-on-mobile {
      position: fixed;
      bottom: 0;
      width: 75% !important;
      background-color: ${({ theme }) => theme.colors.primary};
      z-index: 20;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 1rem;

  & > :first-child {
    margin-right: 1rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    flex: 1 0 auto;
  }

  @media ${({ theme }) => theme.device.tabletAndUp} {
    flex-direction: row;
    align-items: space-between;

    ${ButtonGroup} {
      display: block;
      padding-top: 0;
    }
  }
`;

export const Outline = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  height: 100%;
  min-height: 300px;
`;

export const BudgetAmountContainer = styled.div`
  width: 100%;

  & > div.divider {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  & > div {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media ${({ theme }) => theme.device.tabletAndDown} {
    flex-direction: column;
  }
`;

export const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 40%;
  padding-right: 1.5rem;

  @media ${({ theme }) => theme.device.tabletAndDown} {
    padding-right: 0;
  }
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${({ theme }) => theme.device.tabletAndDown} {
    padding-top: 2rem;
  }
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;

  & > input {
    max-width: 150px;
  }

  @media ${({ theme }) => theme.device.tabletAndDown} {
    padding-left: 0;
  }
`;

export const ItemLabel = styled.div`
  flex: 1 0 60%;
  padding-right: 0.5rem;
  & > p {
    font-weight: 600;
    font-size: 0.85rem;
  }

  & > small {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
