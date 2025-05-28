import '../../../test/setup-test-env'

import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PostService (with real DB)', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.$connect();
  });

  beforeEach(async () => {
    // 각 테스트 전 Post 테이블 초기화 + id 시퀀스 초기화
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE;`);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('post 생성 테스트', async () => {
    const data = { title: 'Test Title', content: 'Test Content' };
    const created = await service.create(data);

    expect(created.id).toBe(1);
    expect(created.title).toBe(data.title);

    const allPosts = await service.findAll();
    expect(allPosts).toHaveLength(1);
    expect(allPosts[0].title).toBe(data.title);
  });

  it('포스트 조회 테스트', async () => {
    const before = await service.findAll();
    expect(before).toHaveLength(0);

    await service.create({ title: 'New', content: 'New content' });
    const after = await service.findAll();
    expect(after).toHaveLength(1);
    expect(after[0].id).toBe(1); // 시퀀스가 초기화되었으므로 id=1
  });
});
