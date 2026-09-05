import type { api, ApiResponse } from '~/shared';
import { RoleItem } from './components';
import { ContentLayout } from '~/routes/film/$id/-components/content-layout/content-layout';

type CastAndCrewProps = {
  data: ApiResponse<typeof api.films.getById>['castAndCrew'];
};

export const CastAndCrew = ({ data }: CastAndCrewProps) => {
  return (
    <ContentLayout>
      {data.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </ContentLayout>
  );
};
