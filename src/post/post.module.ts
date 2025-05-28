import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './service/post.service';


@Module({
  providers: [PostResolver,PostService]
})
export class PostModule {}