import type { DragEndEvent } from '@dnd-kit/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { CollectionFormSchema } from '~/routes/console/collections/-schemas';
import { api, Form, SortableList, toaster } from '~/shared';
import { AsyncSelect } from '~/shared/components/async-select/async-select';
import styles from './films-select.module.css';

export const FilmsSelect = () => {
  const { control } = useFormContext<z.infer<typeof CollectionFormSchema>>();

  const { append, fields, move } = useFieldArray({ control, name: 'films' });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    move(oldIndex, newIndex);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.select_wrapper}>
        <AsyncSelect
          optionsLoader={api.films.getOptions}
          queryKey="collectionFormFilmId"
          onSelect={(value: number, option) => {
            if (fields.find((film) => film.filmId === value)) {
              toaster.warning(`${option?.label} is already added`);
              return;
            }
            append({
              filmId: value,
              order: 0.1,
              title: option?.label ?? '',
            });
          }}
          label="Add film"
        />
      </div>
      <Form.Section label="Films">
        <SortableList items={fields} onDragEnd={handleDragEnd}>
          <div className={styles.wrapper}>
            {fields.map((film) => (
              <SortableList.Item id={film.id} key={film.id}>
                <div>{film.title}</div>
              </SortableList.Item>
            ))}
          </div>
        </SortableList>
        {fields.length === 0 && <div>No selected films</div>}
      </Form.Section>
    </div>
  );
};
