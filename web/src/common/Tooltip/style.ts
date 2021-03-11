import styled, { css } from 'styled-components';

export const TooltipRoot = styled.div<{ $auto: boolean | undefined }>`
  display: inline-block;
  position: relative;
  width: 100%;
  ${({ $auto }) =>
    $auto &&
    css`
      width: auto !important;
    `}
`;

export const TooltipBody = styled.div<{ $direction: string }>`
  --tooltip-margin: 30px;
  --tooltip-arrow-size: 6px;
  --tooltip-background-color: ${({ theme }) => theme.colors.darkThree};
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: #fff;
  background: var(--tooltip-background-color);
  font-size: 12px;
  line-height: 1;
  z-index: 1100;
  white-space: nowrap;

  &::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }

  ${(props) =>
    props.$direction === 'right' &&
    css`
      left: calc(100% + 10px);
      top: 50%;
      transform: translateX(0) translateY(-50%);
      &::before {
        left: calc(var(--tooltip-arrow-size) * -1);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        border-right-color: var(--tooltip-background-color);
      }
    `}

  ${(props) =>
    props.$direction === 'left' &&
    css`
      left: auto;
      right: calc(100% + var(--tooltip-margin));
      top: 50%;
      transform: translateX(0) translateY(-50%);

      &::before {
        left: auto;
        right: calc(var(--tooltip-arrow-size) * -2);
        top: 50%;
        transform: translateX(0) translateY(-50%);
        border-left-color: var(--tooltip-background-color);
      }
    `}
   ${(props) =>
    props.$direction === 'top' &&
    css`
      top: calc(var(--tooltip-margin) * -1);
      &::before {
        top: 100%;
        border-top-color: var(--tooltip-background-color);
      }
    `}

      ${(props) =>
    props.$direction === 'bottom' &&
    css`
      bottom: calc(var(--tooltip-margin) * -1);
      &::before {
        bottom: 100%;
        border-bottom-color: var(--tooltip-background-color);
      }
    `}
`;
