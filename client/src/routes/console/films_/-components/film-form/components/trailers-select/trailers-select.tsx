import { ArrayFormWrapper } from '@/routes/console/-common';
import { FormSection, FormVideoInput, SortableList } from '@/components';
import { type DragEndEvent } from '@dnd-kit/core';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const TrailersSelect = () => {
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

  const handleAddNewTrailer = () => {
    appendTrailers({
      videoId: '',
      order: trailers.length + 1,
    });
  };

  return (
    <FormSection label={`Trailers (${trailers.length})`}>
      <ArrayFormWrapper onCreate={handleAddNewTrailer}>
        <SortableList items={trailers} onDragEnd={handleDragEnd}>
          {trailers.map((trailer, index) => (
            <SortableList.Item id={trailer.id} key={trailer.id}>
              <FormVideoInput
                name={`trailers.${index}.videoId`}
                label={`${trailerLabel} ${index + 1}`}
                onRemove={() => removeTrailer(index)}
              />
            </SortableList.Item>
          ))}
        </SortableList>
      </ArrayFormWrapper>
    </FormSection>
  );
};
