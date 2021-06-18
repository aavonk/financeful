import styled from 'styled-components';
import type * as React from 'react';

export const Left = styled.div`
  min-height: 350px;
  overflow-x: hidden;
  overflow-y: visible;
  flex-grow: 1;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 0.5rem;
  min-width: calc(260px + 1rem);
`;

export const ContentContainer = styled.div`
  min-height: 350px;
  padding-bottom: 1rem;
  margin-top: 1.5rem;
  display: flex;
  max-width: 1440px;
  width: 100%;

  @media ${({ theme }) => theme.device.desktop} {
    margin-right: auto;
    margin-left: auto;
    width: 90%;
  }

  @media (max-width: 905px) {
    flex-direction: column-reverse;

    ${Right} {
      margin-bottom: 40px;
    }
  }
`;

export const SectionTitle = styled.h2`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;
