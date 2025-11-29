import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    findAll(page: number, limit: number, search?: string): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: any[];
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
