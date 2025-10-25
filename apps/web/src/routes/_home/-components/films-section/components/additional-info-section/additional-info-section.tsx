import { type AdditionalInfo } from '~/common';
import { InfoBlock } from '../info-block/info-block';

type Props = {
  info: AdditionalInfo | null;
};

export const AdditionalInfoSection = ({ info }: Props) => {
  if (!info) {
    return null;
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
      />
    );
  }

  return null;
};
