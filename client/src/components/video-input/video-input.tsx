import {
  ComponentProps,
  FocusEventHandler,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { TextInput } from '../text-input';
import { VideoPreview } from './components';
import { YOUTUBE_VIDEO_DIRECT_URL } from '@/constants';
import styles from './video-input.module.css';

export type VideoInputProps = {
  label?: string;
  error?: string | string[];
  externalWatchedValue?: string;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

const INCORRECT_URL_ERROR = `URL should be ${YOUTUBE_VIDEO_DIRECT_URL}`;
const REGEX_VALIDATION = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;

export const VideoInput = forwardRef<HTMLInputElement, VideoInputProps>(
  ({ onBlur, externalWatchedValue, error, ...textInputProps }, ref) => {
    const [previewId, setPreviewId] = useState(externalWatchedValue ?? '');
    const [internalError, setInternalError] = useState<string | null>(null);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setInternalError('');
      onBlur?.(event);

      const value = event.target.value.trim();

      if (!value.length) {
        return;
      }

      const isValidValue = REGEX_VALIDATION.test(value);

      if (!isValidValue) {
        setInternalError(INCORRECT_URL_ERROR);
        return;
      }

      const urlData = new URL(value);

      const videoId = urlData.searchParams.get('v');

      setPreviewId(videoId!);
    };

    useEffect(() => {
      if (typeof externalWatchedValue !== 'string' && previewId.length) {
        setPreviewId('');
      }
    }, [externalWatchedValue, previewId]);

    return (
      <div className={styles.wrapper}>
        <TextInput
          ref={ref}
          onBlur={handleBlur}
          error={internalError ?? error}
          {...textInputProps}
        />
        <VideoPreview videoId={previewId} />
      </div>
    );
  },
);
