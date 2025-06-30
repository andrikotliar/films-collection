import styles from './gradient-builder.module.css';
import { FieldLabel } from '@/components/field-label/field-label';
import { BLUE_DEFAULT, GREEN_DEFAULT } from '@/constants';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

type BackgroundData = {
  leftColor: string;
  rightColor: string;
  angle: string;
};

export type GradientBuilderProps = {
  label?: string;
  onChange: (value: BackgroundData) => void;
  value?: BackgroundData;
};

const defaultValue: BackgroundData = {
  leftColor: BLUE_DEFAULT,
  rightColor: GREEN_DEFAULT,
  angle: '45deg',
};

export const GradientBuilder = ({
  label,
  onChange,
  value = defaultValue,
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

  return (
    <div className={styles.wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.workSpace}>
        <div className={styles.inputs}>
          <div className={classNames(styles.inputWrapper, styles.leftWrapper)}>
            <input
              type="color"
              onChange={getChangeHandler('leftColor')}
              value={value.leftColor}
              className={styles.input}
            />
          </div>
          <div className={classNames(styles.inputWrapper, styles.rightWrapper)}>
            <input
              type="color"
              onChange={getChangeHandler('rightColor')}
              value={value.rightColor}
              className={styles.input}
            />
          </div>
        </div>

        <div
          className={styles.preview}
          style={{
            background: `linear-gradient(${prefilledValue.angle}, ${prefilledValue.leftColor}, ${prefilledValue.rightColor})`,
          }}
        >
          <span className={styles.previewLabel}>Preview</span>
        </div>
      </div>
    </div>
  );
};
