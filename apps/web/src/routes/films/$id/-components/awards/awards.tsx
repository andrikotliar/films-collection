import { Drawer, type api, type ApiResponse } from '~/shared';
import { Award, Nominations } from '~/routes/films/$id/-components/awards/components';
import styles from './awards.module.css';
import { useState } from 'react';

type Awards = ApiResponse<typeof api.films.getById>['awards'];

type AwardsProps = {
  data: Awards;
};

export const Awards = ({ data }: AwardsProps) => {
  const [selectedAward, setSelectedAward] = useState<Awards[number] | null>(null);

  return (
    <>
      <div className={styles.awards}>
        {data.map((award) => (
          <Award
            data={award.award}
            key={award.award.id}
            nominationsCount={award.nominations.length}
            onSelect={() => setSelectedAward(award)}
          />
        ))}
      </div>
      <Drawer isOpen={selectedAward !== null} onClose={() => setSelectedAward(null)} size="narrow">
        {selectedAward && <Nominations data={selectedAward} />}
      </Drawer>
    </>
  );
};
