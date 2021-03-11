import * as React from 'react';
import { AvatarRoot, AvatarImage } from './style';
import defaultImage from '@Images/defaultProfileImage.jpg';

type Props = {
  src?: string;
  alt: string;
  size?: string;
  shadow?: boolean;
};

function Avatar({
  src = defaultImage,
  alt,
  size,
  shadow = false,
  ...rest
}: Props) {
  return (
    <AvatarRoot size={size} shadow={shadow} {...rest}>
      <AvatarImage src={src === null ? defaultImage : src} alt={alt} />
    </AvatarRoot>
  );
}

export default Avatar;
