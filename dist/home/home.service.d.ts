import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeManager } from './entities/home.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Post } from '../post/entities/post.entity';
export declare class HomeService {
    private homeRepo;
    private postRepo;
    constructor(homeRepo: MongoRepository<HomeManager>, postRepo: MongoRepository<Post>);
    updateHomePage(dto: UpdateHomeDto): Promise<import("typeorm").UpdateResult | ({
        hero_blog: ObjectId;
        spotlight_1: ObjectId;
        spotlight_2: ObjectId;
        spotlight_3: ObjectId;
        spotlight_4: ObjectId;
        spotlight_5: ObjectId;
        updated_at: Date;
    } & HomeManager)>;
    getHomePage(): Promise<any>;
}
