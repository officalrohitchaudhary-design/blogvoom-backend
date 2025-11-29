"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const counter_entity_1 = require("../common/entities/counter.entity");
const mongodb_1 = require("mongodb");
let PostService = class PostService {
    constructor(postRepo, counterRepo) {
        this.postRepo = postRepo;
        this.counterRepo = counterRepo;
    }
    async getNextCategoryId() {
        const result = await this.counterRepo.findOne({ where: { name: 'post' } });
        if (!result) {
            const created = this.counterRepo.create({ name: 'post', seq: 1 });
            await this.counterRepo.save(created);
            return 1;
        }
        result.seq += 1;
        await this.counterRepo.save(result);
        return result.seq;
    }
    async create(createPostDto) {
        const seq = await this.getNextCategoryId();
        const customId = `P-${seq.toString().padStart(3, '0')}`;
        const post = this.postRepo.create({ ...createPostDto, custom_id: customId });
        post.category_id = new mongodb_1.ObjectId(createPostDto.category_id);
        return this.postRepo.save(post);
    }
    async findAll(page = 1, limit = 10, search = '') {
        const skip = (page - 1) * limit;
        const pipeline = [
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'categoryInfo',
                },
            },
            {
                $addFields: {
                    category_name: { $arrayElemAt: ['$categoryInfo.name', 0] },
                },
            },
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
                : []),
            {
                $project: {
                    categoryInfo: 0,
                },
            },
            { $sort: { created_at: -1 } },
            { $skip: skip },
            { $limit: limit },
        ];
        const data = await this.postRepo.aggregate(pipeline).toArray();
        const total = await this.postRepo.count({ is_deleted: false });
        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        };
    }
    async findOne(id) {
        const postDetail = await this.postRepo.findOne({ where: { _id: new mongodb_1.ObjectId(id) } });
        if (!postDetail) {
            throw new common_1.NotFoundException('Post not found');
        }
        return postDetail;
    }
    async update(id, updatePostDto) {
        await this.postRepo.update({ _id: new mongodb_1.ObjectId(id) }, updatePostDto);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.postRepo.update({ _id: new mongodb_1.ObjectId(id) }, {
            is_deleted: true,
            deleted_at: new Date(),
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(counter_entity_1.Counter)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        typeorm_2.MongoRepository])
], PostService);
//# sourceMappingURL=post.service.js.map