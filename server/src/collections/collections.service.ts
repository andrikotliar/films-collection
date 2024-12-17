import { CollectionModel } from './collections.model';
import { GroupedCollections } from './types';

export class CollectionsService {
  private collectionsModel;

  constructor(collectionsModel: typeof CollectionModel) {
    this.collectionsModel = collectionsModel;
  }

  async getOneCollection(collectionId: string) {
    const collection = await this.collectionsModel
      .findById(collectionId)
      .lean();

    return collection;
  }

  async getGroupedCollections() {
    const collections = await this.collectionsModel.find();

    return collections.reduce((groupedCollections, collection) => {
      const collectionData = {
        id: collection._id,
        title: collection.title,
      };

      if (groupedCollections[collection.type]) {
        groupedCollections[collection.type].push(collectionData);

        return groupedCollections;
      }

      groupedCollections[collection.type] = [collectionData];

      return groupedCollections;
    }, {} as GroupedCollections);
  }
}
