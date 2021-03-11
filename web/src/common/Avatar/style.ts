import styled from 'styled-components';

interface AvatarRootProps {
  readonly size?: string;
  readonly shadow?: boolean;
}

export const AvatarRoot = styled.div<AvatarRootProps>`
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  justify-content: center;
  cursor: pointer;
  width: ${(props) => (props.size ? props.size : '40px')};
  height: ${(props) => (props.size ? props.size : '40px')};
  box-shadow: ${(props) => props.shadow && props.theme.elevation.two};
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  text-indent: 10000px;
  cursor: pointer;
`;
