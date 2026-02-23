import type { CreateAwardInput, NominationInput, UpdateAwardInput } from '@films-collection/shared';
import { asc, eq, inArray } from 'drizzle-orm';
import { awards, nominations } from '~/database/schema';
import type { UpdateAwardParams } from '~/services/awards/types/update-award-params';
import { getFirstValue, type Deps } from '~/shared';

export class AwardsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getById(id: number) {
    return this.deps.db.query.awards.findFirst({
      columns: {
        id: true,
        title: true,
        description: true,
      },
      where: eq(awards.id, id),
      with: {
        nominations: {
          orderBy: (nominations, { desc }) => [desc(nominations.title)],
        },
      },
    });
  }

  getBaseData(awardId: number) {
    return getFirstValue(
      this.deps.db
        .select({
          id: awards.id,
          title: awards.title,
          description: awards.description,
        })
        .from(awards)
        .where(eq(awards.id, awardId)),
    );
  }

  getBaseDataList() {
    return this.deps.db
      .select({ id: awards.id, title: awards.title })
      .from(awards)
      .orderBy(asc(awards.title));
  }

  getListOptions() {
    return this.deps.db
      .select({ id: awards.id, title: awards.title })
      .from(awards)
      .orderBy(asc(awards.title));
  }

  getNominationsByAward(awardId: number) {
    return this.deps.db
      .select({
        id: nominations.id,
        title: nominations.title,
        shouldIncludeActor: nominations.shouldIncludeActor,
      })
      .from(nominations)
      .where(eq(nominations.awardId, awardId))
      .orderBy(asc(nominations.title));
  }

  createAward({ nominations: nominationsPayload, ...award }: CreateAwardInput) {
    return this.deps.db.transaction(async (tr) => {
      const [newAward] = await tr.insert(awards).values(award).returning();

      if (nominationsPayload.length) {
        await tr.insert(nominations).values(
          nominationsPayload.map((nomination) => ({
            title: nomination.title,
            shouldIncludeActor: nomination.shouldIncludeActor,
            awardId: newAward.id,
          })),
        );
      }

      return newAward;
    });
  }

  async updateAward(id: number, input: Omit<UpdateAwardInput, 'nominations'>) {
    const [updatedAward] = await this.deps.db
      .update(awards)
      .set(input)
      .where(eq(awards.id, id))
      .returning();

    return updatedAward;
  }

  deleteAward(id: number) {
    return this.deps.db.delete(awards).where(eq(awards.id, id));
  }

  deleteNominations(ids: number[]) {
    return this.deps.db.delete(nominations).where(inArray(nominations.id, ids));
  }

  getAwardNominationIds(awardId: number) {
    return this.deps.db
      .select({
        id: nominations.id,
      })
      .from(nominations)
      .where(eq(nominations.awardId, awardId));
  }

  async createNomination(awardId: number, data: NominationInput) {
    const [updatedNomination] = await this.deps.db
      .insert(nominations)
      .values({
        ...data,
        awardId,
      })
      .returning();

    return updatedNomination;
  }

  async updateAwardWithNominations({
    awardId,
    award,
    updateNominations,
    createNominations,
    deleteNominations,
  }: UpdateAwardParams) {
    return this.deps.db.transaction(async (tr) => {
      const [updatedAward] = await tr
        .update(awards)
        .set(award)
        .where(eq(awards.id, awardId))
        .returning();

      if (createNominations.length) {
        await tr.insert(nominations).values(createNominations);
      }

      if (updateNominations.length) {
        await Promise.all(
          updateNominations.map(({ id, ...nomination }) =>
            tr.update(nominations).set(nomination).where(eq(nominations.id, id)),
          ),
        );
      }

      if (deleteNominations.length) {
        await tr.delete(nominations).where(inArray(nominations.id, deleteNominations));
      }

      return updatedAward;
    });
  }
}
