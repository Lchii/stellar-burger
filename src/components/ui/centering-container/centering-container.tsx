import { FC } from 'react';
import { TCenteringContainerUIProps } from './type';
import style from './centering-container.module.css';
import clsx from 'clsx';

export const CenteringContainerUI: FC<TCenteringContainerUIProps> = ({
  title,
  textStyle,
  children
}: TCenteringContainerUIProps) => (
  <div className={style.container}>
    {title && (
      <h2
        className={clsx('text', {
          [`text_type_${textStyle}`]: textStyle,
          [`text_type_main-large`]: !textStyle
        })}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
);
