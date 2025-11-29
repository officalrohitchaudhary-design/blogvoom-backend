import { HomeService } from './home.service';
import { UpdateHomeDto } from './dto/update-home.dto';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getHomeConfig(): Promise<any>;
    updateHomeConfig(body: UpdateHomeDto): Promise<import("typeorm").UpdateResult | ({
        hero_blog: import("bson").ObjectId;
        spotlight_1: import("bson").ObjectId;
        spotlight_2: import("bson").ObjectId;
        spotlight_3: import("bson").ObjectId;
        spotlight_4: import("bson").ObjectId;
        spotlight_5: import("bson").ObjectId;
        updated_at: Date;
    } & import("./entities/home.entity").HomeManager)>;
}
