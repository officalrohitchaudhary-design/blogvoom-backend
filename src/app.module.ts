import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Counter } from './common/entities/counter.entity';
import { HomeModule } from './home/home.module';
import { HomeManager } from './home/entities/home.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://singhmak305:singhmak305@nodoo.58tkn.mongodb.net/blogfly',   // ⭐ Your Mongo URL
      synchronize: true,   // ❗ Turn OFF in production
      entities: [User, Post, Category, Counter, HomeManager],
    }),
    AuthModule, UsersModule, PostModule, CategoryModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
