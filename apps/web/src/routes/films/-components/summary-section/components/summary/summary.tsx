import { SummaryBlock } from '../summary-block/summary-block';
import { type SummaryConfig } from '~/routes/films/-types';

type SummaryProps = {
  config: SummaryConfig[];
};

export const Summary = ({ config }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-5">
      {config.map((item) => (
        <SummaryBlock label={item.title} key={item.id}>
          {item.content}
        </SummaryBlock>
      ))}
    </div>
  );
};
