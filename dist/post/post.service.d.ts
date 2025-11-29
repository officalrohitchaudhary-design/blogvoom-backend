import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MongoRepository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Counter } from '../common/entities/counter.entity';
export declare class PostService {
    private postRepo;
    private counterRepo;
    constructor(postRepo: MongoRepository<Post>, counterRepo: MongoRepository<Counter>);
    private getNextCategoryId;
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: any[];
    }>;
    findOne(id: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
