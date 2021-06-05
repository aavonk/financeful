import styled, { css } from 'styled-components';

type Props = {
  isClickable?: boolean;
};

export const TaskContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
  max-width: 275px;

  & > svg {
    height: 1.75rem;
    width: 1.75rem;
    color: ${({ theme }) => theme.colors.green};
    fill: ${({ theme }) => theme.colors.green};
  }

  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
      :hover {
        transition: background-color 0.2s ease-in-out;
        background-color: #171f26;
      }
    `}
`;

export const TaskTitle = styled.h3`
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  width: 100%;

  /* Styles for loading skeleton */
  & > span {
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SecondaryText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textGrey};
  text-align: center;
  width: 100%;
  margin-bottom: 0.5rem;

  /* Styles for loading skeleton */
  & > span {
    margin-bottom: 1rem;
  }
`;
