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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const home_entity_1 = require("./entities/home.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const post_entity_1 = require("../post/entities/post.entity");
let HomeService = class HomeService {
    constructor(homeRepo, postRepo) {
        this.homeRepo = homeRepo;
        this.postRepo = postRepo;
    }
    async updateHomePage(dto) {
        const data = {
            hero_blog: dto.hero_blog ? new mongodb_1.ObjectId(dto.hero_blog) : null,
            spotlight_1: dto.spotlight_1 ? new mongodb_1.ObjectId(dto.spotlight_1) : null,
            spotlight_2: dto.spotlight_2 ? new mongodb_1.ObjectId(dto.spotlight_2) : null,
            spotlight_3: dto.spotlight_3 ? new mongodb_1.ObjectId(dto.spotlight_3) : null,
            spotlight_4: dto.spotlight_4 ? new mongodb_1.ObjectId(dto.spotlight_4) : null,
            spotlight_5: dto.spotlight_5 ? new mongodb_1.ObjectId(dto.spotlight_5) : null,
            updated_at: new Date()
        };
        const existing = await this.homeRepo.findOne({});
        if (existing) {
            return this.homeRepo.update({ _id: existing._id }, data);
        }
        else {
            return this.homeRepo.save(data);
        }
    }
    async getHomePage() {
        const mongoRepo = this.homeRepo.manager.connection.getMongoRepository(home_entity_1.HomeManager);
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
        ]).toArray();
        return result[0] || {};
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(home_entity_1.HomeManager)),
    __param(1, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_1.MongoRepository,
        typeorm_1.MongoRepository])
], HomeService);
//# sourceMappingURL=home.service.js.map