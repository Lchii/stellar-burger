import { TCenteringContainerProps } from './type';
import { FC } from 'react';
import { CenteringContainerUI } from '../ui/centering-container';

export const CenteringContainer: FC<TCenteringContainerProps> = ({
  title,
  textStyle,
  children
}) => (
  <CenteringContainerUI
    title={title}
    textStyle={textStyle}
    children={children}
  />
);
