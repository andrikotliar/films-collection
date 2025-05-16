import { images } from '@/assets/images';
import { FieldLabel } from '@/components/FieldLabel/FieldLabel';
import { Image } from '@/components/Image/Image';
import { ChangeEvent, CSSProperties, FC, useRef, useState } from 'react';
import styles from './FileInput.module.css';
import { Trash2Icon, UploadIcon } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { FormError } from '@/types';
import { FieldError } from '@/components/FieldError/FieldError';

export type FileInputProps = {
  label?: string;
  onChange: (file: File) => void;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  accept?: string;
  defaultValue?: string | null;
  onRemove?: VoidFunction;
  error?: FormError;
};

export const FileInput: FC<FileInputProps> = ({
  label,
  onChange,
  width = 250,
  height = 'auto',
  accept = '.jpg,.png,.jpeg',
  defaultValue = null,
  onRemove,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onChange(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    onRemove?.();
    setImagePreview(null);

    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.root} style={{ width }}>
      {label && <FieldLabel className={styles.label}>{label}</FieldLabel>}
      {imagePreview && (
        <Button
          icon={<Trash2Icon />}
          onClick={handleRemoveImage}
          className={styles.removeButton}
          variant="ghost"
        />
      )}
      <label className={styles.inputWrapper} style={{ height }}>
        <input
          type="file"
          onChange={handleChange}
          className={styles.fileInput}
          accept={accept}
          ref={inputRef}
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
      </label>
      <FieldError error={error} />
    </div>
  );
};
