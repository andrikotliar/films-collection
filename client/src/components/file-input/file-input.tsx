import { images } from '@/assets/images';
import { FieldLabel } from '@/components/field-label/field-label';
import { Image } from '@/components/image/image';
import { ChangeEvent, CSSProperties, useRef, useState } from 'react';
import styles from './file-input.module.css';
import { Trash2Icon, UploadIcon } from 'lucide-react';
import { Button } from '@/components/button/button';
import { FormError } from '@/types';
import { FieldError } from '@/components/field-error/field-error';

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

export const FileInput = ({
  label,
  onChange,
  width = 250,
  height = 'auto',
  accept = '.jpg,.png,.jpeg,.svg,.webp',
  defaultValue = null,
  onRemove,
  error,
}: FileInputProps) => {
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
