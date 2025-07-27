import { type ChangeEvent } from 'react';
import styles from './gradient-builder.module.css';
import { FieldLabel } from '@/components/field-label/field-label';
import { BLUE_DEFAULT, GREEN_DEFAULT, type FormError } from '@/common';
import { FieldError } from '@/components/field-error/field-error';

export type BackgroundData = {
  color1: string;
  color2: string;
  angle: string;
  textColor: 'black' | 'white';
};

export type GradientBuilderProps = {
  label?: string;
  onChange: (value: BackgroundData) => void;
  value?: BackgroundData;
  error?: FormError;
};

const defaultValue: BackgroundData = {
  color1: BLUE_DEFAULT,
  color2: GREEN_DEFAULT,
  angle: '45',
  textColor: 'white',
};

export const GradientBuilder = ({
  label,
  onChange,
  value = defaultValue,
  error,
}: GradientBuilderProps) => {
  const prefilledValue = {
    ...defaultValue,
    ...value,
  };

  const getChangeHandler = (prop: keyof BackgroundData) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;

      onChange({
        ...prefilledValue,
        [prop]: eventValue,
      });
    };
  };

  const handleChangeTextColor = () => {
    onChange({
      ...prefilledValue,
      textColor: prefilledValue.textColor === 'white' ? 'black' : 'white',
    });
  };

  return (
    <div className={styles.wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.workSpace}>
        <div
          className={styles.preview}
          style={{
            background: `linear-gradient(${prefilledValue.angle}deg, ${prefilledValue.color1}, ${prefilledValue.color2})`,
          }}
        >
          <span style={{ color: value.textColor }}>Example</span>
        </div>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <input
              type="color"
              onChange={getChangeHandler('color1')}
              value={value.color1}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="color"
              onChange={getChangeHandler('color2')}
              value={value.color2}
              className={styles.input}
            />
          </div>
          <button
            type="button"
            className={styles.textInput}
            style={{
              color: value.textColor === 'black' ? 'white' : 'black',
              backgroundColor: value.textColor ?? 'white',
            }}
            onClick={handleChangeTextColor}
          >
            T
          </button>
          <div className={styles.angleInputWrapper}>
            <input
              className={styles.angleInput}
              onChange={getChangeHandler('angle')}
              value={value.angle}
            />
            <span className={styles.metric}>deg</span>
          </div>
        </div>
      </div>
      <FieldError error={error} />
    </div>
  );
};
