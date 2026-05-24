import type { api, ApiResponse } from '~/shared';
import { RoleItem } from '~/routes/films/$id/-components/cast-and-crew/components';

type CastAndCrewProps = {
  data: ApiResponse<typeof api.films.getById>['castAndCrew'];
};

export const CastAndCrew = ({ data }: CastAndCrewProps) => {
  return (
    <div>
      {data.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
};
