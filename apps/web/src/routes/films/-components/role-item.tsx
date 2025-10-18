import { type FilmPerson, personRoleToTitle, RouterLink } from '~/common';
import classNames from 'classnames';

type RoleItemProps = {
  data: FilmPerson;
};

export const RoleItem = ({ data }: RoleItemProps) => {
  const isActorRole = data.role === 'ACTOR';

  return (
    <div
      className={classNames(
        'flex flex-col sm:flex-row gap-2 items-start p-4 sm:p-5 border-b border-b-slate-300 last:border-b-0',
        isActorRole ? 'sm:items-start' : 'sm:items-center',
      )}
    >
      <h3 className="text-xs sm:text-md uppercase w-42.5 shrink-0">
        {personRoleToTitle[data.role]}:
      </h3>
      <ul className={isActorRole ? 'flex flex-col gap-2.5' : 'flex flex-wrap gap-4'}>
        {data.people.map((person) => (
          <li key={person.id} className="border-0 flex flex-col">
            <div className="flex gap-1">
              <RouterLink
                to="/"
                search={{
                  personRole: data.role,
                  personId: person.id.toString(),
                }}
                className="underline text-sky-700 hover:text-emerald-400"
              >
                {person.name}
              </RouterLink>
              {isActorRole && (
                <div>
                  <span className="text-gray-500 text-sm">as</span> {person.details}
                </div>
              )}
            </div>
            {person.comment && <span className="text-gray-500 text-sm">({person.comment})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
