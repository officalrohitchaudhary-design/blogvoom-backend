import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { HomeManager } from './entities/home.entity';
import { Post } from '../post/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HomeManager, Post])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule { }
