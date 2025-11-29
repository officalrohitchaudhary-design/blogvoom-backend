import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Counter } from '../common/entities/counter.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: MongoRepository<Post>,

    @InjectRepository(Counter)
    private counterRepo: MongoRepository<Counter>,
  ) { }

  // Generate auto-increment sequence
  private async getNextCategoryId() {
    const result = await this.counterRepo.findOne({ where: { name: 'post' } });

    if (!result) {
      // create first counter entry
      const created = this.counterRepo.create({ name: 'post', seq: 1 });
      await this.counterRepo.save(created);
      return 1;
    }

    // increment
    result.seq += 1;
    await this.counterRepo.save(result);
    return result.seq;
  }

  async create(createPostDto: CreatePostDto) {
    const seq = await this.getNextCategoryId();
    const customId = `P-${seq.toString().padStart(3, '0')}`;
    const post = this.postRepo.create({ ...createPostDto, custom_id: customId });
    post.category_id = new ObjectId(createPostDto.category_id);
    return this.postRepo.save(post);
  }

  async findAll(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;

    const pipeline: any[] = [
      {
        $match: {
          is_deleted: false,
        },
      },

      // JOIN CATEGORY
      {
        $lookup: {
          from: 'category',   // 👉 your category collection name
          localField: 'category_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },

      // Extract category_name
      {
        $addFields: {
          category_name: { $arrayElemAt: ['$categoryInfo.name', 0] },
        },
      },

      // SEARCH
      ...(search
        ? [{
          $match: {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { author_name: { $regex: search, $options: 'i' } },
              { category_name: { $regex: search, $options: 'i' } },
            ],
          },
        }]
        : []
      ),

      // REMOVE categoryInfo array
      {
        $project: {
          categoryInfo: 0,
        },
      },

      // SORT LATEST FIRST
      { $sort: { created_at: -1 } },

      // PAGINATION
      { $skip: skip },
      { $limit: limit },
    ];

    // Run Mongo Aggregation
    const data = await this.postRepo.aggregate(pipeline).toArray();

    // Total count (without pagination)
    const total = await this.postRepo.count({ is_deleted: false });

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async findOne(id: string) {
    const postDetail = await this.postRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!postDetail) {
      throw new NotFoundException('Post not found');
    }
    return postDetail;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.postRepo.update({ _id: new ObjectId(id) }, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.postRepo.update({ _id: new ObjectId(id) }, {
      is_deleted: true,
      deleted_at: new Date(),

    })
  }
}
