import styled from 'styled-components';
import { motion, HTMLMotionProps } from 'framer-motion';

export const Card = styled(motion.div)<HTMLMotionProps<'div'>>`
  width: 280px;
  height: 175.84px;
  /* background: ${({ theme }) => theme.colors.darkTwo}; */
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  /* glass */
  background: rgba(36, 44, 55, 0.28);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
`;

export const BankName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > span.empty {
    flex-basis: 20%;
    width: 20px;
  }

  & .names {
    /* display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-end; */
    margin-right: 20px;
    margin-top: 10px;
    overflow: hidden;
    text-align: right;
  }
  & > .names > p {
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > .names > span.bank-name {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }
`;

export const AmountBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;

  & > .pan {
    position: relative;
    /* z-index: 2; */
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
    font-size: 22px;
    font-weight: 700;
  }
`;

export const Chip = styled.div`
  position: relative;
  z-index: 10;
  width: 40px;
  height: 30px;
  margin-top: 6px;
  margin-bottom: 6px;
  background: #fffcb1;

  /* Old browsers */
  background: -moz-linear-gradient(-45deg, #fffcb1 0%, #b4a365 100%);
  /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #fffcb1),
    color-stop(100%, #b4a365)
  );
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(-45deg, #fffcb1 0%, #b4a365 100%);
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(-45deg, #fffcb1 0%, #b4a365 100%);
  /* Opera 11.10+ */
  background: -ms-linear-gradient(-45deg, #fffcb1 0%, #b4a365 100%);
  /* IE10+ */
  background: linear-gradient(135deg, #fffcb1 0%, #b4a365 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fffcb1", endColorstr="#b4a365", GradientType=1);
  /* IE6-9 fallback on horizontal gradient */
  border: 1px solid #322d28;
  -webkit-border-radius: 10px;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 10px;
  -moz-background-clip: padding;
  border-radius: 10px;
  background-clip: padding-box;
  -webkit-box-shadow: 0 1px 2px #322d28, 0 0 5px 0 0 5px rgba(144, 133, 87, 0.25) inset;
  -moz-box-shadow: 0 1px 2px #322d28, 0 0 5px 0 0 5px rgba(144, 133, 87, 0.25) inset;
  box-shadow: 0 1px 2px #322d28, 0 0 5px 0 0 5px rgba(144, 133, 87, 0.25) inset;
  overflow: hidden;

  & > .side {
    position: absolute;
    top: 8px;
    width: 10px;
    height: 22px;
    border: 1px solid #322d28;
    -webkit-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1),
      0 0 4px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1),
      0 0 4px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset, 0 0 5px rgba(144, 133, 87, 0.25),
      0 0 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1) inset;
  }
  & > .side.left {
    left: 0;
    border-left: none;
    -webkit-border-radius: 0 2px 2px 0;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 0 2px 2px 0;
    -moz-background-clip: padding;
    border-radius: 0 2px 2px 0;
    background-clip: padding-box;
  }
  & > .side.right {
    right: 0;
    border-right: none;
    -webkit-border-radius: 2px 0 0 2px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 2px 0 0 2px;
    -moz-background-clip: padding;
    border-radius: 2px 0 0 2px;
    background-clip: padding-box;
  }
  & > .side:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: inline-block;
    width: 100%;
    height: 0px;
    margin: auto;
    border-top: 1px solid #322d28;
    -webkit-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset, 0 0 5px rgba(144, 133, 87, 0.25),
      0 0 4px rgba(0, 0, 0, 0.1);
  }
  & > .vertical {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 8.66666667px;
    height: 10px;
    border: 1px solid #322d28;
    -webkit-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1),
      0 0 4px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1),
      0 0 4px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset, 0 0 5px rgba(144, 133, 87, 0.25),
      0 0 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1) inset;
  }
  & > .vertical.top {
    top: 0;
    border-top: none;
  }
  & > .vertical.top:after {
    top: 12px;
    width: 17.33333333px;
  }
  & > .vertical.bottom {
    bottom: 0;
    border-bottom: none;
  }
  & > .vertical.bottom:after {
    bottom: 12px;
  }
  & > .vertical:after {
    content: '';
    position: absolute;
    left: -8.66666667px;
    display: inline-block;
    width: 26px;
    height: 0px;
    margin: 0;
    border-top: 1px solid #322d28;
    -webkit-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset,
      0 0 5px rgba(144, 133, 87, 0.25), 0 0 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(144, 133, 87, 0.25) inset, 0 0 5px rgba(144, 133, 87, 0.25),
      0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Data = styled.div`
  position: relative;
  z-index: 3;
  margin-left: 20px;
  /* & > .pan {
    position: relative;
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
    font-size: 22px;
    font-weight: 700;
  } */

  & > .details {
    margin-top: 18px;
  }

  & > .details .label {
    font-size: 10px;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & > .details .date {
    font-size: 12px;
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
  }
`;
