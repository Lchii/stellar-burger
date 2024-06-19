import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';
import clsx from 'clsx';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, textStyle, onClose, children }) => (
    <>
      <div className={styles.modal} data-cy='modal'>
        <div className={styles.header}>
          <h3
            className={clsx('text', {
              [`text_type_${textStyle}`]: textStyle,
              [`text_type_main-large`]: !textStyle
            })}
          >
            {title}
          </h3>
          <button
            className={styles.button}
            type='button'
            data-cy='close-button'
          >
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
