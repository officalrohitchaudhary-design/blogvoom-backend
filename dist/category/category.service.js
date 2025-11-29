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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const counter_entity_1 = require("../common/entities/counter.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let CategoryService = class CategoryService {
    constructor(categoryRepo, counterRepo) {
        this.categoryRepo = categoryRepo;
        this.counterRepo = counterRepo;
    }
    async getNextCategoryId() {
        const result = await this.counterRepo.findOne({ where: { name: 'category' } });
        if (!result) {
            const created = this.counterRepo.create({ name: 'category', seq: 1 });
            await this.counterRepo.save(created);
            return 1;
        }
        result.seq += 1;
        await this.counterRepo.save(result);
        return result.seq;
    }
    async create(createCategoryDto) {
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
                    from: 'post',
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
                    posts: 0,
                },
            },
        ]).toArray();
        return { data: categoryList };
    }
    async findOne(id) {
        const categoryDetail = await this.categoryRepo.findOne({ where: { _id: new mongodb_1.ObjectId(id), status: 'active', is_deleted: false } });
        if (!categoryDetail) {
            throw new common_1.NotFoundException('Category not found');
        }
        return categoryDetail;
    }
    async update(id, updateCategoryDto) {
        await this.categoryRepo.update({ _id: new mongodb_1.ObjectId(id) }, updateCategoryDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.categoryRepo.update({ _id: new mongodb_1.ObjectId(id) }, {
            is_deleted: true,
            deleted_at: new Date(),
        });
        return { message: "Category Deleted Successfully." };
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
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(counter_entity_1.Counter)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        typeorm_2.MongoRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map