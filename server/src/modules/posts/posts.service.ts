import { PostsRepository } from './posts.repository';
import { CreatePostPayload, UpdatePostPayload } from './schemas';

export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPostByPageKey(key: string) {
    return this.postsRepository.getPostByKey(key);
  }

  createPost(input: CreatePostPayload) {
    return this.postsRepository.createPost(input);
  }

  updatePost(id: number, input: UpdatePostPayload) {
    return this.postsRepository.updatePost(id, input);
  }
}
