import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Counter } from '../common/entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Counter])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
