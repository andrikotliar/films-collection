import styles from './Trailers.module.css';
import { Button, FormSection, FormVideoInput, SortableList } from '@/ui';
import { DragEndEvent } from '@dnd-kit/core';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const Trailers = () => {
  const { control, watch } = useFormContext();

  const {
    fields: trailers,
    append: appendTrailers,
    move: resortTrailers,
    remove: removeTrailer,
  } = useFieldArray({ control, name: 'trailers' });

  const type = watch('type');

  const trailerLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = trailers.findIndex((field) => field.id === active.id);
    const newIndex = trailers.findIndex((field) => field.id === over.id);

    resortTrailers(oldIndex, newIndex);
  };

  return (
    <FormSection label={`Trailers (${trailers.length})`}>
      <SortableList items={trailers} onDragEnd={handleDragEnd}>
        {({ index }) => (
          <div>
            <FormVideoInput
              name={`trailers.${index}.videoId`}
              label={`${trailerLabel} ${index + 1}`}
            />
            <button
              className={styles.removeButton}
              onClick={() => removeTrailer(index)}
            >
              <Trash2Icon size={16} />
              <span>Delete trailer</span>
            </button>
          </div>
        )}
      </SortableList>
      <Button
        className={styles.appendButton}
        icon={<PlusIcon />}
        variant="ghost"
        onClick={() =>
          appendTrailers({
            videoId: '',
            order: trailers.length + 1,
          })
        }
      >
        Add trailer
      </Button>
    </FormSection>
  );
};
