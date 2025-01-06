import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/_console/console/manage_/$id');

export const ConsoleFilm = () => {
  const { id } = routeApi.useParams();

  return <div>{id}</div>;
};
