import { RowWrapper } from '../row-wrapper/RowWrapper';
import { ChangeEvent, ComponentProps, FC } from 'react';
import styles from './FiltersRow.module.css';
import { useQueryFilter } from '@/hooks';

type Props = {
  values: (string | number)[];
  propName: string;
} & ComponentProps<typeof RowWrapper>;

const FiltersRow: FC<Props> = ({ values, propName, ...props }) => {
  const { filterParams, updateParam, deleteParam } = useQueryFilter();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const param = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (!isChecked) {
      deleteParam(param, value);
      return;
    }

    updateParam(param, value);
  };

  return (
    <RowWrapper {...props}>
      <div className={styles.filters}>
        {values.map((value) => (
          <label key={value} className={styles.checkbox}>
            <input
              type="checkbox"
              name={propName}
              defaultChecked={filterParams[propName]?.includes(value) ?? false}
              onChange={handleChangeValue}
              value={value}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </RowWrapper>
  );
};

export { FiltersRow };
