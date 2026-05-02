import { useQueryClient } from '@tanstack/react-query';
import { ArrowBigRightDashIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import sanitize from 'sanitize-html';
import { ListBlock } from '~/routes/_home/-components/list-block/list-block';
import { filmDefaultFormValues, useDeleteFilm, useFormModal } from '~/routes/console/-shared';
import { api, type ApiResponse } from '~/shared';

type PlannedFilmsWidgetProps = {
  items?: ApiResponse<typeof api.films.getDashboard.exec>['plannedFilms'];
};

export const PlannedFilmsWidget = ({ items = [] }: PlannedFilmsWidgetProps) => {
  const { onOpen } = useFormModal();
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteFilm();

  return (
    <ListBlock
      items={items}
      title="Planned films"
      getRowDescription={(item) => sanitize(item.overview ?? '', { allowedTags: [] })}
      rowActions={[
        {
          id: 'promote',
          icon: <ArrowBigRightDashIcon />,
          action: async (item) => {
            await api.films.update.exec({
              params: {
                id: item.id,
              },
              input: {
                status: 'WATCHED',
              },
            });
            queryClient.invalidateQueries({
              queryKey: [api.films.getDashboard.staticKey],
            });
          },
        },
        {
          id: 'delete',
          icon: <Trash2Icon />,
          action: async (item) => {
            await mutateAsync(item.id);
          },
        },
      ]}
      sectionActions={[
        {
          id: 'add',
          icon: <PlusIcon />,
          action: () =>
            onOpen({
              ...filmDefaultFormValues,
              status: 'PLANNED',
            }),
        },
      ]}
    />
  );
};
