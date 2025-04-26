import { images } from '@/assets/images';
import { FieldLabel } from '@/ui/FieldLabel/FieldLabel';
import { Image } from '@/ui/Image/Image';
import { ChangeEvent, CSSProperties, forwardRef, useState } from 'react';
import styles from './FileInput.module.css';
import { UploadIcon } from 'lucide-react';

export type FileInputProps = {
  label?: string;
  onChange: (file: File) => void;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  accept?: string;
  defaultValue?: string | null;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      onChange,
      width = 250,
      height = 'auto',
      accept = '.jpg,.png,.jpeg',
      defaultValue = null,
    },
    ref,
  ) => {
    const [imagePreview, setImagePreview] = useState<string | null>(
      defaultValue,
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        onChange(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    return (
      <label className={styles.root}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.inputWrapper} style={{ width, height }}>
          <input
            type="file"
            onChange={handleChange}
            className={styles.fileInput}
            accept={accept}
            ref={ref}
          />
          <Image
            errorImageSrc={images.noImagePreview}
            src={imagePreview}
            className={styles.image}
            isExternal={Boolean(defaultValue)}
          />
          <div className={styles.overlay}>
            <UploadIcon size="30%" className={styles.uploadIcon} />
          </div>
        </div>
      </label>
    );
  },
);
