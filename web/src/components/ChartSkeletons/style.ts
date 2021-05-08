import styled from 'styled-components';

export const RelativeContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > h3 {
    text-align: center;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 30px;
    font-weight: 700;
  }

  & > p {
    text-align: center;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
