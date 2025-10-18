import { getDateMonthLabel, type CollectionEventFilled } from '@/common';
import { DataRow } from '@/components/collection-event-banner/data-row';
import { Image } from '@/components/image/image';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CalendarIcon, TimerIcon } from 'lucide-react';

type CollectionEventBannerProps = {
  event: CollectionEventFilled;
};

export const CollectionEventBanner = ({ event }: CollectionEventBannerProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Link
      to="/"
      search={{ collectionId: event.collection.id.toString() }}
      className="flex group bg-slate-50 border border-slate-300 shadow-xs rounded-lg hover:border-slate-400 transition relative overflow-hidden"
    >
      <div className="w-30 h-30 flex shrink-0 relative">
        <Image src={event.film.poster} isExternal className="object-top" />
        <div className="absolute w-1/4 h-full top-0 right-0 bg-linear-to-l from-slate-50" />
      </div>
      <div className="overflow-hidden grow rounded-md relative h-full p-3 flex flex-col transition">
        <div className="uppercase text-xs text-slate-500">
          <span>Ongoing event</span>
        </div>
        <div className="text-ellipsis overflow-hidden whitespace-nowrap text-slate-600 text-xl xl:text-2xl font-black group-hover:text-slate-900">
          {event.title}
        </div>
        <div className="flex flex-col mt-auto">
          <DataRow icon={<CalendarIcon size={16} />} value={getDateMonthLabel(event)} />
          <DataRow
            icon={<TimerIcon size={16} />}
            value={event.yearFrom ? `${currentYear - event.yearFrom} years` : 'Regular event'}
          />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex gap-1 items-center bg-slate-600 text-white rounded-tl-md p-2 group-hover:bg-slate-900 transition">
        <ArrowRightIcon size={14} />
      </div>
    </Link>
  );
};
