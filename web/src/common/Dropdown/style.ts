import styled, { css } from 'styled-components';

interface Props {
  $open: boolean;
  $margin?: string | null;
}
export const StyledUl = styled.ul<Props>`
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 8rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  list-style: none;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.paper};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  ${(props) =>
    props.$open &&
    css`
      margin: ${(props: Props) => props.$margin || 0};
      position: absolute;
      inset: 0px auto auto 0px;
      display: block;
    `}

  &.notification-menu {
    width: 320px;
    transform: translate3d(-38px, 70px, 0px);
    left: auto;
    right: 0;

    @media ${({ theme }) => theme.device.mobile} {
      margin-top: 5px;
      transform: translate3d(15px, 70px, 0px);
      width: auto;
      will-change: transform;
      left: 0px !important;
      right: 30px !important;
    }
  }

  &.user-menu {
    transform: translate3d(0px, 75px, 0px);
    right: 0;
    left: auto;

    @media ${({ theme }) => theme.device.mobile} {
      margin-top: 5px;
      transform: translate3d(15px, 70px, 0px);
      width: auto;
      will-change: transform;
      left: 0px !important;
      right: 30px !important;
    }
  }

  &.dropdown-button {
    inset: 0px auto auto 0px;
    position: absolute;
    transform: translate(-26px, 40px);
  }
`;
