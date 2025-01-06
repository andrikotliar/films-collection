import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { fetchAdminListQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';
import { Island, Pagination, ConsoleContentLayout, ConsoleTitle } from '@/ui';
import {
  AddFilmLink,
  AdminFilm,
  DeleteFilmConfirmation,
  AdminFilmsTools,
} from './components';
import { FILMS_ADMIN_LIST_PER_PAGE } from '@/constants';
import { useState } from 'react';
import { FilmsApi } from '@/api';

type DeleteModalDetails = {
  id: string;
  title: string;
};

const routeApi = getRouteApi('/_console/console/manage');

const defaultDeleteDetails = {
  id: '',
  title: '',
};

export const ConsoleAdminFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, refetch } = useSuspenseQuery(fetchAdminListQuery(searchParams));

  const [deleteFilmDetails, setDeleteFilmDetails] =
    useState<DeleteModalDetails>(defaultDeleteDetails);

  const { mutate: deleteFilm, isPending: isDeleting } = useMutation({
    mutationFn: FilmsApi.deleteFilm,
    onSuccess: () => {
      setDeleteFilmDetails(defaultDeleteDetails);
      refetch();
    },
  });

  const { mutate: updateFilm } = useMutation({
    mutationFn: FilmsApi.updateFilm,
  });

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenDeleteModal = (id: string, title: string) => {
    setDeleteFilmDetails({ id, title });
  };

  return (
    <ConsoleContentLayout>
      <ConsoleTitle>Manage films</ConsoleTitle>
      <AdminFilmsTools />
      <AddFilmLink />
      <Island displayPadding={false}>
        {data.films.map((film) => (
          <AdminFilm
            film={film}
            key={film._id}
            onDelete={handleOpenDeleteModal}
            isDeleting={isDeleting}
            onUpdate={updateFilm}
          />
        ))}
      </Island>
      <Pagination
        total={data.total}
        perPageCounter={FILMS_ADMIN_LIST_PER_PAGE}
        onPageChange={handlePageChange}
        currentPageIndex={searchParams.pageIndex}
      />
      <DeleteFilmConfirmation
        title={deleteFilmDetails.title}
        isOpen={deleteFilmDetails.id.length !== 0}
        onConfirm={() => deleteFilm(deleteFilmDetails.id)}
        onClose={() => setDeleteFilmDetails(defaultDeleteDetails)}
      />
    </ConsoleContentLayout>
  );
};
