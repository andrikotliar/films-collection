import { PrismaClient } from '@prisma/client';
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

  getList({ skip }: GetListQueries) {
    return this.databaseClient.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        pageKey: true,
      },
      take: 30,
      skip,
      orderBy: {
        updatedAt: 'desc',
      },
    });
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
