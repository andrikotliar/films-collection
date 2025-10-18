import type { WatchCounter } from '~/common';
import { EyeIcon } from 'lucide-react';

type WatchCounterBadgeProps = {
  counters: WatchCounter;
};

export const WatchCounterBadge = ({ counters }: WatchCounterBadgeProps) => {
  return (
    <div
      title={`Accurate watch counter: ${counters.realCounter}. ${
        counters.approxCounter > 0 && `Approximate watch counter: >${counters.approxCounter}`
      }`}
      className="bg-amber-50 py-1 px-4 rounded-sm flex items-center gap-2"
    >
      <EyeIcon />
      {counters.realCounter > 0 && (
        <div className="flex items-center gap-1">
          <span>{counters.realCounter}</span>
          {counters.approxCounter > 0 && (
            <span>
              ({'>'}
              {counters.approxCounter})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
