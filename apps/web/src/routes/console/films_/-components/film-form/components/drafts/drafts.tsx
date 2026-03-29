import type { FilmDraftResponse } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { getDraftIdFromMixedId } from '~/routes/console/films_/-helpers';
import { api, Button, ConfirmModal, getFilmDraftsQueryOptions, Modal } from '~/shared';
import styles from './drafts.module.css';
import { useFormContext } from 'react-hook-form';
import { TrashIcon } from 'lucide-react';

type DraftsProps = {
  onSelectDraft: (draft: FilmDraftResponse | null) => void;
};

export const Drafts = ({ onSelectDraft }: DraftsProps) => {
  const params = useParams({ from: '/console/films_/$id' });
  const { data } = useSuspenseQuery(getFilmDraftsQueryOptions(getDraftIdFromMixedId(params.id)));
  const [contentToView, setContentToView] = useState<FilmDraftResponse | null>(null);
  const [draftToDelete, setDraftToDelete] = useState<FilmDraftResponse | null>(null);
  const { reset } = useFormContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FilmDraftResponse) => {
      await api.films.deleteDraft.exec({ params: { id: data.id } });
      setDraftToDelete(null);
      onSelectDraft(null);
    },
    meta: {
      invalidateQueries: {
        queryKey: api.films.getFilmDrafts.staticKey,
      },
    },
  });

  if (!data.length) {
    return null;
  }

  const handleApply = (draft: FilmDraftResponse) => {
    reset(draft.content);
    onSelectDraft(draft);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Current film contains drafts:</div>
      <div>
        {data.map((draft) => (
          <div className={styles.row} key={draft.id}>
            <div>Last modified: {draft.updatedAt}</div>
            <div className={styles.row_buttons}>
              <Button variant="light" size="small" onClick={() => setContentToView(draft)}>
                View
              </Button>
              <Button size="small" onClick={() => handleApply(draft)}>
                Apply
              </Button>
              <Button
                variant="ghost"
                icon={<TrashIcon />}
                onClick={() => setDraftToDelete(draft)}
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={contentToView !== null}
        onClose={() => setContentToView(null)}
        className={styles.modal}
      >
        <Modal.Content className={styles.content}>
          <div className={styles.modal_title}>Last modified: {contentToView?.updatedAt}</div>
          <pre>{JSON.stringify(contentToView?.content, null, 2)}</pre>
          <Modal.CloseButton
            onClick={() => setContentToView(null)}
            className={styles.close_button}
          />
        </Modal.Content>
      </Modal>
      <ConfirmModal
        data={draftToDelete}
        onClose={() => setDraftToDelete(null)}
        title="Confirm draft deletion"
        onConfirm={(data) => mutate(data)}
        isPending={isPending}
      />
    </div>
  );
};
