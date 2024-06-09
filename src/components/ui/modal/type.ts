import { ReactNode } from 'react';

export type TModalUIProps = {
  title: string;
  textStyle?: string;
  onClose: () => void;
  children?: ReactNode;
};
