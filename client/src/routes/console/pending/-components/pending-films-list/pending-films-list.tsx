import { useState } from 'react';
import { PendingFilm } from '@/common';
import { ConfirmModal, Panel } from '@/components';
import { PendingFilmRow } from '../pending-film-row/pending-film-row';
import { useMutation } from '@tanstack/react-query';
import { PendingFilmsApi } from '@/api';
import { FormModal } from '@/routes/console/-components';
import { EditPendingFilmForm } from '../edit-pending-film-form/edit-pending-film-form';

type PendingFilmsListProps = {
  list: PendingFilm[];
  onRefetchList: VoidFunction;
};

export const PendingFilmsList = ({
  list,
  onRefetchList,
}: PendingFilmsListProps) => {
  const [filmToUpdate, setFilmToUpdate] = useState<PendingFilm | null>(null);
  const [filmToDelete, setFilmToDelete] = useState<PendingFilm | null>(null);

  const { mutate: deletePendingFilm, isPending: isDeleteInProgress } =
    useMutation({
      mutationFn: PendingFilmsApi.deletePendingFilm,
      onSuccess: () => {
        onRefetchList();
        setFilmToDelete(null);
      },
    });

  const handleDeletePendingFilm = (film: PendingFilm) => {
    deletePendingFilm(film.id);
  };

  return (
    <Panel hasPaddings={false}>
      {list.map((film) => (
        <PendingFilmRow
          data={film}
          key={film.id}
          onDelete={() => setFilmToDelete(film)}
          onEdit={() => setFilmToUpdate(film)}
          isDeleteInProgress={isDeleteInProgress}
        />
      ))}

      <FormModal
        isOpen={filmToUpdate !== null}
        onClose={() => setFilmToUpdate(null)}
      >
        {filmToUpdate !== null && (
          <EditPendingFilmForm
            initialValues={filmToUpdate}
            onSubmitSuccess={() => {
              onRefetchList();
              setFilmToUpdate(null);
            }}
          />
        )}
      </FormModal>

      <ConfirmModal
        title={`Confirm deleting ${filmToDelete?.title}`}
        data={filmToDelete}
        onClose={() => setFilmToDelete(null)}
        onConfirm={handleDeletePendingFilm}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
      />
    </Panel>
  );
};
