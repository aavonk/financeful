import * as React from 'react';

function Blob({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      className="blob"
      width={693}
      height={672}
      viewBox="0 0 693 672"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M149.5 671.5c-74.5 0-90.333-24.833-149.5-45V-2h497.5c29 46.667 111 37.5 126 48.5 45.674 33.494-19.5 72 47.5 105.5s-47.5 90-32 216c10.226 83.125-158.328-4.781-180.5 114-14 75-170.939 38.126-196 98.5-22 53-76.01 91-113 91z"
        fill="#1E88E5"
      />
    </svg>
  );
}

export default Blob;
