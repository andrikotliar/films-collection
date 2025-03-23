import { ComponentProps, forwardRef } from 'react';
import { TextInput } from '../TextInput';
import { VideoPreview } from './components';
import styles from './VideoInput.module.css';
import { useUrlInput } from '@/hooks';

export type VideoInputProps = {
  label?: string;
  error?: string | string[];
  externalWatchedValue?: string;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

export const VideoInput = forwardRef<HTMLInputElement, VideoInputProps>(
  ({ onBlur, externalWatchedValue, ...textInputProps }, ref) => {
    const { handleBlur, previewPath } = useUrlInput({
      onBlur,
      externalWatchedValue,
    });

    return (
      <div className={styles.wrapper}>
        <TextInput ref={ref} onBlur={handleBlur} {...textInputProps} />
        <VideoPreview videoId={previewPath} />
      </div>
    );
  },
);
