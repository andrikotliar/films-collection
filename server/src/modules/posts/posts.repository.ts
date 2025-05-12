import { PrismaClient } from '@prisma/client';
import { CreatePostPayload } from 'src/modules/posts/schemas';

export class PostsRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

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
}
