import { createModule } from 'src/common';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

export const PostsModule = createModule({
  prefix: 'posts',
  service: (app) => {
    const repository = new PostsRepository(app.database);
    const service = new PostsService(repository);

    return service;
  },
  controller: PostsController,
});
