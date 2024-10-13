import { buildMediaPath } from '@/helpers';
import { AdditionalInfo } from '@/types';
import { FC } from 'react';
import { InfoBlock } from '../InfoBlock';
import { collectionTitles, personRoleTitles } from '@/titles';

type AdditionalInfoProps = {
  info: AdditionalInfo | null;
};

const AdditionalInfoSection: FC<AdditionalInfoProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  if (info.type === 'actor') {
    return (
      <InfoBlock
        imagePath={buildMediaPath('actors', info.data.image)}
        imageAlt={`Photo of ${info.data.name}`}
        title={info.data.name}
        label="Filtered by Actor"
      />
    );
  }

  if (info.type === 'collection') {
    return (
      <InfoBlock
        title={collectionTitles[info.data]}
        label="Filtered by Collection"
      />
    );
  }

  if (info.type === 'crew') {
    return (
      <InfoBlock
        title={info.data.name}
        label={personRoleTitles[info.data.role]}
      />
    );
  }

  if (info.type === 'awards') {
    const awardsList = info.data.map((award) => award.title).join(', ');

    return <InfoBlock title={awardsList} label="Filtered by Awards" />;
  }

  return null;
};

export { AdditionalInfoSection };
