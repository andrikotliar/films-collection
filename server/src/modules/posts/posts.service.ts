import sanitize from 'sanitize-html';
import { PostsRepository } from './posts.repository';
import {
  CreatePostPayload,
  GetListQueries,
  UpdatePostPayload,
} from './schemas';
import { ALLOWED_HTML_TAGS } from 'src/common';

export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPost(id: number) {
    return this.postsRepository.getPost(id);
  }

  getPostByPageKey(key: string) {
    return this.postsRepository.getPostByKey(key);
  }

  createPost(input: CreatePostPayload) {
    const sanitizedContent = sanitize(input.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    return this.postsRepository.createPost({
      ...input,
      content: sanitizedContent,
    });
  }

  updatePost(id: number, input: UpdatePostPayload) {
    if (input.content) {
      const sanitizedContent = sanitize(input.content, {
        allowedTags: ALLOWED_HTML_TAGS,
        allowedAttributes: {},
      });

      return this.postsRepository.updatePost(id, {
        ...input,
        content: sanitizedContent,
      });
    }

    return this.postsRepository.updatePost(id, input);
  }

  async getList(queries: GetListQueries) {
    const list = await this.postsRepository.getList(queries);

    if (!list.length) {
      return [];
    }

    return list.map((post) => {
      const words = post.content.split(' ').slice(0, 30);
      const shouldContainDots = words.length === 30;

      if (shouldContainDots) {
        words.push('...');
      }

      return {
        ...post,
        shortContent: words.join(' '),
      };
    });
  }

  deletePost(id: number) {
    return this.postsRepository.deletePost(id);
  }
}
