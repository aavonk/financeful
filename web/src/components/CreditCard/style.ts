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
  & > span {
    flex-basis: 20%;
  }
  & > p {
    margin-top: 15px;
    margin-right: 30px;
    font-size: 20px;
    font-weight: 600;
    float: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Chip = styled.div`
  position: relative;
  z-index: 10;
  width: 40px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
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
  margin-left: 30px;
  & > .pan {
    position: relative;
    /* z-index: 2; */
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
    font-size: 22px;
    font-weight: 700;
  }

  & > .details {
    margin-top: 5px;
  }

  & > .details .label {
    font-size: 10px;
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
  }

  & > .details .date {
    font-size: 12px;
    letter-spacing: 1px;
    text-shadow: 1px 1px 1px #000;
  }
`;

export const LinesUp = styled.div`
  :before {
    content: '';
    position: absolute;
    top: -110px;
    left: -70px;
    z-index: 2;
    width: 480px;
    height: 300px;
    border-bottom: 2px solid #392db2;
    -webkit-border-radius: 0 0 60% 90%;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 0 0 60% 90%;
    -moz-background-clip: padding;
    border-radius: 0 0 60% 90%;
    background-clip: padding-box;
    box-shadow: inset 1px 1px 44px #4035b2;
    background: #4031b2;
    /* Old browsers */
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(64, 49, 178, 0) 100%,
      #2271d8 100%
    );
    /* FF3.6+ */
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(64, 49, 178, 0)),
      color-stop(100%, #2271d8)
    );
    /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(64, 49, 178, 0) 100%,
      #2271d8 100%
    );
    /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(64, 49, 178, 0) 44%,
      #2271d8 100%
    );
    /* Opera 12+ */
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(64, 49, 178, 0) 44%,
      #2271d8 100%
    );
    /* IE10+ */
    background: radial-gradient(
      ellipse at center,
      rgba(64, 49, 178, 0) 44%,
      #2271d8 100%
    );
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(64, 49, 178, 0)", endColorstr="#2271d8", GradientType=1);
    /* IE6-9 fallback on horizontal gradient */
  }
  :after {
    content: '';
    position: absolute;
    top: -180px;
    left: -200px;
    z-index: 1;
    width: 530px;
    height: 420px;
    border-bottom: 2px solid #4035b2;
    -webkit-border-radius: 0 40% 50% 50%;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 0 40% 50% 50%;
    -moz-background-clip: padding;
    border-radius: 0 40% 50% 50%;
    background-clip: padding-box;
    box-shadow: inset 1px 1px 44px #4035b2;
    background: #1e88e5;
    /* Old browsers */
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* FF3.6+ */
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(45, 33, 166, 0)),
      color-stop(100%, #1e88e5)
    );
    /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* Opera 12+ */
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* IE10+ */
    background: radial-gradient(
      ellipse at center,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(45, 33, 166, 0)", endColorstr="#1e88e5", GradientType=1);
    /* IE6-9 fallback on horizontal gradient */
  }
`;

export const LinesDown = styled.div`
  :before {
    content: '';
    position: absolute;
    top: 80px;
    left: -200px;
    z-index: 2;
    width: 550px;
    height: 400px;
    border-top: 2px solid #392db2;
    -webkit-border-radius: 40% 60% 0 0;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 40% 60% 0 0;
    -moz-background-clip: padding;
    border-radius: 40% 60% 0 0;
    background-clip: padding-box;
    box-shadow: 1px 1px 100px #4035b2;
    background: #1e88e5;
    /* Old browsers */
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* FF3.6+ */
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(45, 33, 166, 0)),
      color-stop(100%, #1e88e5)
    );
    /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* Opera 12+ */
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* IE10+ */
    background: radial-gradient(
      ellipse at center,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(45, 33, 166, 0)", endColorstr="#1e88e5", GradientType=1);
    /* IE6-9 fallback on horizontal gradient */
  }
  :after {
    content: '';
    position: absolute;
    top: 20px;
    left: -100px;
    z-index: 2;
    width: 350px;
    height: 400px;
    border-top: 2px solid #392db2;
    -webkit-border-radius: 20% 80% 0 0;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 20% 80% 0 0;
    -moz-background-clip: padding;
    border-radius: 20% 80% 0 0;
    background-clip: padding-box;
    box-shadow: inset -1px -1px 44px #4035b2;
    background: #1e88e5;
    /* Old browsers */
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* FF3.6+ */
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(45, 33, 166, 0)),
      color-stop(100%, #1e88e5)
    );
    /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 100%,
      #1e88e5 100%
    );
    /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* Opera 12+ */
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* IE10+ */
    background: radial-gradient(
      ellipse at center,
      rgba(45, 33, 166, 0) 44%,
      #1e88e5 100%
    );
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(45, 33, 166, 0)", endColorstr="#1e88e5", GradientType=1);
    /* IE6-9 fallback on horizontal gradient */
  }
`;
