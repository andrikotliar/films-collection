import styles from './ImageInput.module.css';
import {
  ComponentProps,
  CSSProperties,
  FocusEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextInput } from '../TextInput';
import { Image } from '@/ui/Image/Image';
import { images } from '@/assets/images';

export type ImageInputProps = {
  label?: string;
  error?: string | string[];
  previewWidth?: CSSProperties['width'];
  previewHeight?: CSSProperties['height'];
  shouldFitPreviewToContainer?: boolean;
  externalWatchedValue?: string;
} & Omit<ComponentProps<'input'>, 'type' | 'name'>;

const filePathRegex = /^[a-zA-Z0-9_.\/-]+(\.webp|\.jpg|\.jpeg|\.png)$/;
const errorMessage =
  'Image path is invalid. Image path should contain only letters, numbers, symbols {._-} and have one of extensions webp, jpg, jpeg, png';

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      onBlur,
      previewWidth,
      previewHeight,
      shouldFitPreviewToContainer,
      error,
      externalWatchedValue,
      ...textInputProps
    },
    ref,
  ) => {
    const previewImageRef = useRef<HTMLImageElement>(null);
    const [previewUrl, setPreviewUrl] = useState(externalWatchedValue ?? '');
    const [internalError, setInternalError] = useState<string | null>(null);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur?.(event);

      const value = event.target.value;
      const isPathValid = value.length ? filePathRegex.test(value) : true;

      if (!isPathValid) {
        setInternalError(errorMessage);
        return;
      }

      if (internalError) {
        setInternalError(null);
      }

      setPreviewUrl(value);
    };

    useEffect(() => {
      if (typeof externalWatchedValue !== 'string' && previewUrl.length) {
        setPreviewUrl('');
      }
    }, [externalWatchedValue, previewUrl]);

    return (
      <div className={styles.wrapper}>
        <TextInput
          ref={ref}
          onBlur={handleBlur}
          error={internalError || error}
          {...textInputProps}
        />
        <div
          style={{ width: previewWidth, height: previewHeight }}
          className={styles.imageContainer}
        >
          <Image
            src={previewUrl}
            errorImageSrc={images.noImagePreview}
            isExternal
            shouldFitContainer={shouldFitPreviewToContainer}
            ref={previewImageRef}
          />
        </div>
      </div>
    );
  },
);
