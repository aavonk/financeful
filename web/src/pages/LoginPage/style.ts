import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;

  & > h1 {
    color: #fff;
    font-size: 28px;
    font-weight: 700;
  }

  & > svg {
    margin-bottom: 5px;
  }
`;

type ErrorProps = {
  role: 'alert';
};

export const ErrorMessage = styled.div<ErrorProps>`
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  font-weight: 700;

  background-color: rgba(209, 16, 99, 0.85);
  color: #fff;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
