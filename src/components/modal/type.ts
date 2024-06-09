import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  textStyle?: string;
  onClose: () => void;
  children?: ReactNode;
};
