import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

//https://docs.nestjs.com/graphql/quick-start
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      graphiql : true,
      autoSchemaFile : 'src/common/graphql/schema.graphql'
    }),
    PostModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService,AppResolver],
})
export class AppModule {}
