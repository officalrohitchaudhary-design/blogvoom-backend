import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Counter } from '../common/entities/counter.entity';
import { MongoRepository } from 'typeorm';
export declare class CategoryService {
    private categoryRepo;
    private counterRepo;
    constructor(categoryRepo: MongoRepository<Category>, counterRepo: MongoRepository<Counter>);
    private getNextCategoryId;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<{
        data: any[];
    }>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getCategoryDropdown(): Promise<Category[]>;
}
