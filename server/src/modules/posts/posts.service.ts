import sanitize from 'sanitize-html';
import { PostsRepository } from './posts.repository';
import {
  CreatePostPayload,
  GetListQueries,
  UpdatePostPayload,
} from './schemas';
import { ALLOWED_HTML_TAGS } from 'src/common';

const MAX_WORDS_LIMIT = 30;

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
    const data = await this.postsRepository.getList(queries);

    if (!data.list.length) {
      return data;
    }

    const mappedList = data.list.map((post) => {
      const words = post.content.split(' ').slice(0, MAX_WORDS_LIMIT);
      const shouldContainDots = words.length === MAX_WORDS_LIMIT;

      if (shouldContainDots) {
        words.push('...');
      }

      return {
        ...post,
        shortContent: words.join(' '),
      };
    });

    return {
      list: mappedList,
      count: data.count,
    };
  }

  deletePost(id: number) {
    return this.postsRepository.deletePost(id);
  }
}
