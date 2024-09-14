type Actor = {
  id: string;
  name: string;
  photoUrl: string;
};

type ActorsList = {
  [actorId: string]: Actor;
};

export type { Actor, ActorsList };
