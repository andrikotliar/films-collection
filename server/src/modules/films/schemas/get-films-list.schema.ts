import { PersonRole, TitleStyle, TitleType } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const GetFilmsListQuerySchema = Type.Object(
  {
    limit: Type.Number(),
    skip: Type.Number(),
    startDate: Type.Optional(Type.String()),
    endDate: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    duration: Type.Optional(Type.Number()),
    rating: Type.Optional(Type.Number()),
    seasonsTotal: Type.Optional(Type.Number()),
    episodesTotal: Type.Optional(Type.Number()),
    crewMemberId: Type.Optional(Type.Number()),
    actorId: Type.Optional(Type.Number()),
    awardId: Type.Optional(Type.Number()),
    budget: Type.Optional(Type.Number()),
    boxOffice: Type.Optional(Type.Number()),
    searchAnniversaries: Type.Optional(Type.Boolean()),
    type: Type.Optional(Type.Enum(TitleType)),
    style: Type.Optional(Type.Enum(TitleStyle)),
    crewMemberPosition: Type.Optional(Type.Enum(PersonRole)),
    genreIds: Type.Optional(Type.Array(Type.Number())),
    studioIds: Type.Optional(Type.Array(Type.Number())),
    countryIds: Type.Optional(Type.Array(Type.Number())),
    ids: Type.Optional(Type.Array(Type.Number())),
  },
  { additionalProperties: false },
);

export type GetFilmsListQuery = Static<typeof GetFilmsListQuerySchema>;
