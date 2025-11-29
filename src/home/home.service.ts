import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeManager } from './entities/home.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeManager)
    private homeRepo: MongoRepository<HomeManager>,

    @InjectRepository(Post)
    private postRepo: MongoRepository<Post>,

  ) { }

  async updateHomePage(dto: UpdateHomeDto) {
    const data = {
      hero_blog: dto.hero_blog ? new ObjectId(dto.hero_blog) : null,
      spotlight_1: dto.spotlight_1 ? new ObjectId(dto.spotlight_1) : null,
      spotlight_2: dto.spotlight_2 ? new ObjectId(dto.spotlight_2) : null,
      spotlight_3: dto.spotlight_3 ? new ObjectId(dto.spotlight_3) : null,
      spotlight_4: dto.spotlight_4 ? new ObjectId(dto.spotlight_4) : null,
      spotlight_5: dto.spotlight_5 ? new ObjectId(dto.spotlight_5) : null,
      updated_at: new Date()
    };

    const existing = await this.homeRepo.findOne({});
    if (existing) {
      return this.homeRepo.update({ _id: existing._id }, data);
    } else {
      return this.homeRepo.save(data);
    }
  }

  async getHomePage() {
    const mongoRepo = this.homeRepo.manager.connection.getMongoRepository(HomeManager);
    // const categoryList = await this.categoryRepo.aggregate([
    const result = await this.homeRepo.aggregate([
      { $limit: 1 },

      {
        $lookup: {
          from: "post",
          localField: "hero_blog",
          foreignField: "_id",
          as: "hero_blog_details"
        }
      },
      {
        $lookup: {
          from: "post",
          localField: "spotlight_1",
          foreignField: "_id",
          as: "spotlight_1_details"
        }
      },
      {
        $lookup: {
          from: "post",
          localField: "spotlight_2",
          foreignField: "_id",
          as: "spotlight_2_details"
        }
      },
      {
        $lookup: {
          from: "post",
          localField: "spotlight_3",
          foreignField: "_id",
          as: "spotlight_3_details"
        }
      },
      {
        $lookup: {
          from: "post",
          localField: "spotlight_4",
          foreignField: "_id",
          as: "spotlight_4_details"
        }
      },
      {
        $lookup: {
          from: "post",
          localField: "spotlight_5",
          foreignField: "_id",
          as: "spotlight_5_details"
        }
      },


      // Repeat lookups for spotlight_2, spotlight_3
    ]).toArray();

    return result[0] || {};
  }


}
