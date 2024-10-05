type Actor = {
  _id: string;
  name: string;
  image: string;
};

type ActorsList = {
  [actorId: string]: Actor;
};

export type { Actor, ActorsList };
