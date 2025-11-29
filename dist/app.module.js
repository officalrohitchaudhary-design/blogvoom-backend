"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users/users.entity");
const post_module_1 = require("./post/post.module");
const post_entity_1 = require("./post/entities/post.entity");
const category_module_1 = require("./category/category.module");
const category_entity_1 = require("./category/entities/category.entity");
const counter_entity_1 = require("./common/entities/counter.entity");
const home_module_1 = require("./home/home.module");
const home_entity_1 = require("./home/entities/home.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://singhmak305:singhmak305@nodoo.58tkn.mongodb.net/blogfly',
                synchronize: true,
                entities: [users_entity_1.User, post_entity_1.Post, category_entity_1.Category, counter_entity_1.Counter, home_entity_1.HomeManager],
            }),
            auth_module_1.AuthModule, users_module_1.UsersModule, post_module_1.PostModule, category_module_1.CategoryModule, home_module_1.HomeModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map