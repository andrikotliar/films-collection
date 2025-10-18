import { type Person, RouterLink } from '~/common';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: Person | null;
};

export const Nomination = ({ title, comment, nominee }: NominationProps) => {
  return (
    <div className="flex pr-1 gap-1 before:content-['—'] before:text-amber-400">
      <div>
        <div className="text-base">{title}</div>
        {nominee && (
          <RouterLink to="/" search={{ actorId: String(nominee.id) }} className="text-sm">
            {nominee.name}
          </RouterLink>
        )}
        {comment && <div className="text-xs text-gray-500">({comment})</div>}
      </div>
    </div>
  );
};
