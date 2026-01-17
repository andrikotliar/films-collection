import { type FocusEventHandler, forwardRef, useEffect, useState } from 'react';
import { VideoPreview } from './components';
import styles from './video-input.module.css';
import { Button } from '~/shared/components/button/button';
import { Trash2Icon } from 'lucide-react';
import { FieldLabel } from '~/shared/components/field-label/field-label';
import { YOUTUBE_VIDEO_DIRECT_URL } from '~/shared/constants';
import { TextInput, type TextInputProps } from '~/shared/components/text-input/text-input';

export type VideoInputProps = {
  label?: string;
  error?: string | string[];
  externalWatchedValue?: string;
  onRemove?: VoidFunction;
} & Omit<TextInputProps, 'type' | 'label'>;

const INCORRECT_URL_ERROR = `URL should be ${YOUTUBE_VIDEO_DIRECT_URL}`;
const REGEX_VALIDATION = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+(&.*)?$/;

export const VideoInput = forwardRef<HTMLInputElement, VideoInputProps>(
  ({ onBlur, externalWatchedValue, error, label, onRemove, ...textInputProps }, ref) => {
    const [previewId, setPreviewId] = useState(() => {
      if (!externalWatchedValue) {
        return '';
      }

      if (externalWatchedValue.startsWith('http')) {
        const urlData = new URL(externalWatchedValue);
        const videoId = urlData.searchParams.get('v');
        return videoId ?? '';
      }

      return externalWatchedValue;
    });
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
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.container}>
          <VideoPreview videoId={previewId} />
          <div className={styles.tools}>
            <TextInput
              ref={ref}
              onBlur={handleBlur}
              error={internalError ?? error}
              {...textInputProps}
            />
            {onRemove && (
              <Button icon={<Trash2Icon />} variant="ghost" onClick={onRemove}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
);
