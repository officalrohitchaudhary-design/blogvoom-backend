import { ObjectId } from 'mongodb';
export declare class HomeManager {
    _id: ObjectId;
    hero_blog?: ObjectId;
    spotlight_1?: ObjectId;
    spotlight_2?: ObjectId;
    spotlight_3?: ObjectId;
    spotlight_4?: ObjectId;
    spotlight_5?: ObjectId;
    created_at: Date;
    updated_at: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
