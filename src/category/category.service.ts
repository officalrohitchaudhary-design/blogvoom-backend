import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Counter } from '../common/entities/counter.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: MongoRepository<Category>,

    @InjectRepository(Counter)
    private counterRepo: MongoRepository<Counter>,
  ) { }

  // Generate auto-increment sequence
  private async getNextCategoryId() {
    const result = await this.counterRepo.findOne({ where: { name: 'category' } });

    if (!result) {
      // create first counter entry
      const created = this.counterRepo.create({ name: 'category', seq: 1 });
      await this.counterRepo.save(created);
      return 1;
    }

    // increment
    result.seq += 1;
    await this.counterRepo.save(result);
    return result.seq;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const seq = await this.getNextCategoryId();
    const customId = `C-${seq.toString().padStart(3, '0')}`;
    const createCategory = this.categoryRepo.create({ ...createCategoryDto, custom_id: customId });
    return await this.categoryRepo.save(createCategory);
  }

  async findAll() {
    const categoryList = await this.categoryRepo.aggregate([
      {
        $match: {
          is_deleted: false,
          status: 'active',
        },
      },
      {
        $lookup: {
          from: 'post',            // 👈 Mongo collection name
          localField: '_id',
          foreignField: 'category_id',
          as: 'posts',
        },
      },
      {
        $addFields: {
          postCount: { $size: '$posts' },
        },
      },
      {
        $project: {
          posts: 0, // remove posts array
        },
      },
    ]).toArray();
    return { data: categoryList };
  }

  async findOne(id: string) {
    const categoryDetail = await this.categoryRepo.findOne({ where: { _id: new ObjectId(id), status: 'active', is_deleted: false } });
    if (!categoryDetail) {
      throw new NotFoundException('Category not found');
    }
    return categoryDetail;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepo.update({ _id: new ObjectId(id) }, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.categoryRepo.update({ _id: new ObjectId(id) }, {
      is_deleted: true,
      deleted_at: new Date(),
    })
    return { message: "Category Deleted Successfully." }
  }

  async getCategoryDropdown() {
    return await this.categoryRepo.find({
      where: {
        is_deleted: false,
        status: 'active',
      },
      select: ['_id', 'name'],
      order: { name: 'ASC' }
    });
  }

}
