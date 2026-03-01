import type { PersonRole } from '~/database/schema';
import type { GroupedPeople } from '~/modules/films/types';

const rolesOrder: Record<PersonRole, number> = {
  CREATOR: 1,
  DIRECTOR: 2,
  WRITER: 3,
  PRODUCER: 4,
  COMPOSER: 5,
  CAMERAMAN: 6,
  ACTOR: 7,
};

export const sortGroupedPeople = (castAndCrew: GroupedPeople) => {
  return Object.values(castAndCrew).sort((a, b) => {
    return rolesOrder[a.role] - rolesOrder[b.role];
  });
};
