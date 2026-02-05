import { forwardRef, useEffect, useState } from 'react';
import { VideoPreview } from './components';
import styles from './video-input.module.css';
import { Button } from '~/shared/components/button/button';
import { Trash2Icon } from 'lucide-react';
import { FieldLabel } from '~/shared/components/field-label/field-label';
import { TextInput, type TextInputProps } from '~/shared/components/text-input/text-input';
import { getEmbeddableYoutubeUrl } from '~/shared/helpers';

export type VideoInputProps = {
  label?: string;
  error?: string | string[];
  externalWatchedValue?: string;
  onRemove?: VoidFunction;
} & Omit<TextInputProps, 'type' | 'label'>;

export const VideoInput = forwardRef<HTMLInputElement, VideoInputProps>(
  ({ onBlur, externalWatchedValue, error, label, onRemove, ...textInputProps }, ref) => {
    const [videoData, setVideoData] = useState(getEmbeddableYoutubeUrl(externalWatchedValue ?? ''));
    const [internalError, setInternalError] = useState<string | null>(null);

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setInternalError('');
      onBlur?.(event);

      const value = event.target.value.trim();

      if (!value.length) {
        return;
      }

      const embeddableUrl = getEmbeddableYoutubeUrl(value);

      if (embeddableUrl.message) {
        setInternalError(embeddableUrl.message);
        return;
      }

      setVideoData(embeddableUrl);
    };

    useEffect(() => {
      if (typeof externalWatchedValue !== 'string' && videoData.value.length) {
        setVideoData({
          preview: '',
          value: '',
        });
      }
    }, [externalWatchedValue, videoData]);

    return (
      <div className={styles.wrapper}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.container}>
          <VideoPreview imageUrl={videoData.preview} videoUrl={videoData.value} />
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
