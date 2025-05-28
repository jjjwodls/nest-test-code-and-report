// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostService {
  
  constructor(private prisma: PrismaService) {}

  create(data: CreatePostInput) {
    return this.prisma.post.create({ data });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy : {
        id : 'desc'
      }
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePostInput) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number): Promise<boolean> {
    await this.prisma.post.delete({ where: { id } });
    return true;
  }

  async findPaged(page: number, limit: number) {
    const skip = (page - 1) * limit;
  return this.prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
  }
}
