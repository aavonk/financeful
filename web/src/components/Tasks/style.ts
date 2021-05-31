import styled from 'styled-components';

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.darkThree};
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
  cursor: pointer;
  max-width: 275px;

  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: #171f26;
  }

  & > svg {
    height: 1.75rem;
    width: 1.75rem;
    color: ${({ theme }) => theme.colors.green};
    fill: ${({ theme }) => theme.colors.green};
  }
`;

export const TaskTitle = styled.h3`
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
`;

export const SecondaryText = styled.p`
  font-size: 0.75rem;
  color: #8c91a1;
  text-align: center;
`;
