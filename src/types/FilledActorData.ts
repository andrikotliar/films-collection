export type FilledActorData = {
  actorId: string;
  name: string;
  photoUrl: string;
  character: {
    name: string;
    imageUrl: string;
    description?: string; // deprecated
  };
}