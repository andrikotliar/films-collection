import { buildMediaPath } from '@/helpers';
import { AdditionalInfo } from '@/types';
import { FC } from 'react';
import { InfoBlock } from '../InfoBlock/InfoBlock';

type AdditionalInfoProps = {
  info: AdditionalInfo | null;
};

const AdditionalInfoSection: FC<AdditionalInfoProps> = ({ info }) => {
  console.log(info);

  if (!info) {
    return null;
  }

  if (info.type === 'actor') {
    return (
      <InfoBlock
        imagePath={buildMediaPath(info.data.image)}
        imageAlt={`Photo of ${info.data.name}`}
        title={info.data.name}
        label="Filtered by Actor"
      />
    );
  }

  if (info.type === 'collection') {
    return <InfoBlock title={info.data.title} label="Filtered by Collection" />;
  }

  if (info.type === 'crew') {
    return <InfoBlock title={info.data.name} label={info.data.role} />;
  }

  if (info.type === 'awards' && info.data[0]) {
    return (
      <InfoBlock
        title={info.data[0].title}
        label="Filtered by Award"
        description={info.data[0].description}
      />
    );
  }

  return null;
};

export { AdditionalInfoSection };
