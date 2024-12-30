export type Actor = {
  _id: string;
  name: string;
  image: string;
};

export type ActorsList = {
  [actorId: string]: Actor;
};
