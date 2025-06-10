import { PrismaClient } from '@prisma/client';
import { DEFAULT_PAGINATION_LIMIT } from 'src/common';
import {
  CreatePostPayload,
  GetListQueries,
  UpdatePostPayload,
} from 'src/modules/posts/schemas';

export class PostsRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getPost(id: number) {
    return this.databaseClient.post.findUnique({
      select: {
        id: true,
        title: true,
        content: true,
        pageKey: true,
      },
      where: {
        id,
      },
    });
  }

  async getList({ skip }: GetListQueries) {
    const list = await this.databaseClient.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        pageKey: true,
      },
      take: DEFAULT_PAGINATION_LIMIT,
      skip,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const count = await this.databaseClient.post.count();

    return {
      list,
      count,
    };
  }

  getPostByKey(key: string) {
    return this.databaseClient.post.findFirst({
      select: {
        id: true,
        content: true,
        title: true,
      },
      where: {
        pageKey: key,
      },
    });
  }

  createPost(input: CreatePostPayload) {
    return this.databaseClient.post.create({
      data: input,
    });
  }

  updatePost(id: number, input: UpdatePostPayload) {
    return this.databaseClient.post.update({
      where: {
        id,
      },
      data: input,
    });
  }

  deletePost(id: number) {
    return this.databaseClient.post.delete({
      where: { id },
    });
  }
}
