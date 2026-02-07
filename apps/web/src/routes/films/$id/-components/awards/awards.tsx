import { ScrollableLine, type api, type ApiResponse } from '~/shared';
import { Award } from '~/routes/films/$id/-components/awards/components';

type AwardsProps = {
  data: ApiResponse<typeof api.films.get>['awards'];
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <ScrollableLine>
      {data.map((award) => (
        <Award data={award} key={award.award.id} />
      ))}
    </ScrollableLine>
  );
};
