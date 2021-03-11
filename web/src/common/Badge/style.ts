import styled from 'styled-components';

export const BadgeWrapper = styled.span`
  display: inline-flex;
  position: relative;
  flex-shrink: 0;
  vertical-align: middle;
`;

export const StyledBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 7px;
  transform: scale(1) translate(50%, -50%);
  transform-origin: 100% 0%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 6px;
  z-index: 1;
  flex-wrap: wrap;
  font-size: 0.75rem;
  min-width: 20px;
  box-sizing: border-box;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  line-height: 1;
  font-weight: 500;
  color: #fff;
  background-color: #fd5353;
  border-radius: 10px;
`;
