import { AdditionalInfo } from '@/types';
import { FC } from 'react';
import { InfoBlock } from '../info-block/info-block';

type AdditionalInfoProps = {
  info: AdditionalInfo | null;
};

export const AdditionalInfoSection: FC<AdditionalInfoProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  if (info.type === 'actor') {
    return (
      <InfoBlock
        imagePath={info.data.image}
        imageAlt={`Photo of ${info.data.name}`}
        title={info.data.name}
        label="Filtered by Actor"
      />
    );
  }

  if (info.type === 'collection') {
    return (
      <InfoBlock
        title={info.data.title}
        label="Filtered by Collection"
        description={info.data.description}
      />
    );
  }

  if (info.type === 'crew') {
    return <InfoBlock title={info.data.name} label={info.data.role} />;
  }

  if (info.type === 'award' && info.data) {
    return (
      <InfoBlock
        title={info.data.title}
        label="Filtered by Award"
        description={info.data.description}
        imagePath={info.data.image}
      />
    );
  }

  return null;
};
