import { ComponentProps, FocusEventHandler, forwardRef, useState } from 'react';
import { TextInput } from '../TextInput';
import { Preview } from './components';
import styles from './UrlInput.module.css';

export type UrlInputProps = {
  baseUrl: string;
  type: 'image' | 'video';
  label?: string;
  error?: string | string[];
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(
  ({ baseUrl, type, onBlur, ...textInputProps }, ref) => {
    const [previewUrl, setPreviewUrl] = useState('');

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);
      setPreviewUrl(event.target.value);
    };

    return (
      <div className={styles.wrapper}>
        <TextInput ref={ref} onBlur={handleBlur} {...textInputProps} />
        <Preview baseUrl={baseUrl} url={previewUrl} type={type} />
      </div>
    );
  },
);
