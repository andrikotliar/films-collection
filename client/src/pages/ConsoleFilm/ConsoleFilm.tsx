import { NEW_FILM_ID } from '@/constants';
import { BackLink, ConsoleContentLayout, ConsoleTitle, TextInput } from '@/ui';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_console/console/manage_/$id');

export const ConsoleFilm = () => {
  const { id } = routeApi.useParams();
  const searchParams = routeApi.useSearch();

  const pageTitle = id === NEW_FILM_ID ? 'Add New Film' : 'Edit Film';

  return (
    <ConsoleContentLayout>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <TextInput label="Title" defaultValue={searchParams.title} />
    </ConsoleContentLayout>
  );
};
