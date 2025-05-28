import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from './setupTestApp';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService;

  beforeAll(async () => {
    app = await setupTestApp();
    prisma = app.get(PrismaService);
    console.log('[E2E] Resetting test database...');
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('createPost mutation', async () => {
    const mutation = `
      mutation {
        createPost(createPostInput: {
          title: "Test Post",
          content: "E2E testing a"
        }) {
          id
          title
        }
      }
    `;

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(res.body.data.createPost.title).toBe('Test Post');
  });

  it('posts query', async () => {
    const query = `
      query {
        posts {
          id
          title
        }
      }
    `;

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(res.body.data.posts.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });

});
