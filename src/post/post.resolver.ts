// src/post/post.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from './post.model';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostService } from './service/post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') input: UpdatePostInput) {
    return this.postService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }

  @Query(() => [Post])
  posts(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
  @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
  return this.postService.findPaged(page, limit);
  }
}
