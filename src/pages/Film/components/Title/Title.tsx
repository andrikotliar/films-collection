import { PropsWithClassName } from '@/common';
import classes from './Title.module.css';
import {
  FC,
  PropsWithChildren,
  createElement,
} from 'react';

type TitleProps = PropsWithClassName<{
  variant?: 'h1' | 'h2';
}>;

const Title: FC<PropsWithChildren<TitleProps>> = ({
  variant = 'h2',
  className,
  ...props
}) => {
  return createElement(variant, {
    ...props,
    className: classes[variant],
  });
};

export { Title };
