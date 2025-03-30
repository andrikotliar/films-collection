import { FC, useState } from 'react';
import { PendingFilm } from '@/types';
import { ConfirmModal, Island } from '@/ui';
import { EditPendingFilmModal } from '../EditPendingFilmModal/EditPendingFilmModal';
import { PendingFilmRow } from '../PendingFilmRow/PendingFilmRow';
import { useMutation } from '@tanstack/react-query';
import { PendingFilmsApi } from '@/api';

type PendingFilmsListProps = {
  list: PendingFilm[];
  onRefetchList: VoidFunction;
};

export const PendingFilmsList: FC<PendingFilmsListProps> = ({
  list,
  onRefetchList,
}) => {
  const [editModalContent, setEditModalContent] = useState<PendingFilm | null>(
    null,
  );
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
    <Island hasPaddings={false}>
      {list.map((film) => (
        <PendingFilmRow
          data={film}
          key={film.id}
          onDelete={() => setFilmToDelete(film)}
          onEdit={() => setEditModalContent(film)}
          isDeleteInProgress={isDeleteInProgress}
        />
      ))}

      <EditPendingFilmModal
        onClose={() => setEditModalContent(null)}
        defaultValues={editModalContent}
        refetch={onRefetchList}
      />

      <ConfirmModal
        title={`Confirm deleting ${filmToDelete?.title}`}
        data={filmToDelete}
        onClose={() => setFilmToDelete(null)}
        onConfirm={handleDeletePendingFilm}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
      />
    </Island>
  );
};
