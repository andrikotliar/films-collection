import { TrophyIcon } from 'lucide-react';
import styles from './awards.module.css';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Modal, Panel, type api, type ApiResponse } from '~/shared';
import { Nomination } from '~/routes/films/$id/-components/awards/components';

type AwardsProps = {
  data: ApiResponse<typeof api.films.get>['awards'];
};

export const Awards = ({ data }: AwardsProps) => {
  const [selectedAward, setSelectedAward] = useState<AwardsProps['data'][number] | null>(null);

  return (
    <div className={styles.awards}>
      {data.map((award) => (
        <button
          key={award.award.id}
          className={styles.award}
          onClick={() => setSelectedAward(award)}
        >
          <TrophyIcon className={styles.award_icon} />
          <span className={styles.award_title}>{award.award.title}</span>
          <span className={styles.nominations_count}>{award.nominations.length}</span>
        </button>
      ))}
      <Modal
        className={styles.award_modal_wrapper}
        isOpen={selectedAward !== null}
        onClose={() => setSelectedAward(null)}
      >
        <Modal.Content className={styles.award_modal_content}>
          {selectedAward !== null && (
            <Panel isFlexContainer>
              <h2 className={styles.award_modal_title}>{selectedAward.award.title} nominations</h2>
              <div className={styles.nominations}>
                {selectedAward.nominations.map((nomination) => (
                  <Nomination
                    title={nomination.title}
                    comment={nomination.comment}
                    nominee={nomination.person}
                  />
                ))}
              </div>
              <Link
                className={styles.more_link}
                to="/"
                search={{ awardId: selectedAward.award.id }}
              >
                More nominated films
              </Link>
            </Panel>
          )}
          <Modal.CloseButton
            className={styles.close_button}
            onClick={() => setSelectedAward(null)}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};
