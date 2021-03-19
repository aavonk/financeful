import styled, { keyframes } from 'styled-components';

const wave = keyframes`
   0% {
     transform: translateX(-100%)
   }
   50% {
     transform: translateX(100%);
   }
   100% {
     transform: translateX(100%)
   }
`;
type Props = {
  height?: string;
  width?: string;
};
export const PulseBar = styled.span<Props>`
  width: 100%;
  display: block;
  background-color: rgba(255, 255, 255, 0.02);
  height: ${(props) => props.height || '25px'};
  width: ${(props) => props.width || '100%'};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  &::after {
    animation: ${wave} 1.6s linear 0.5s infinite;
    background: linear-gradient(
      90deg,
      transparent,
      /* ${({ theme }) => theme.effects.buttonHover}, */
        rgba(255, 255, 255, 0.08),
      transparent
    );
    content: '';
    position: absolute;
    transform: translateX(-100%); /* Avoid flash during server-side hydration */
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
`;
