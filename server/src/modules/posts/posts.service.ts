import { PostsRepository } from './posts.repository';
import { CreatePostPayload } from './schemas';

export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPostByPageKey(key: string) {
    return this.postsRepository.getPostByKey(key);
  }

  createPost(input: CreatePostPayload) {
    return this.postsRepository.createPost(input);
  }
}
