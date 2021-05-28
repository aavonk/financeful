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

  :hover {
    transition: background-color 0.2s ease-in-out;
    background-color: #171f26;
  }
`;
