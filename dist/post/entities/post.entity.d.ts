import { ObjectId } from 'mongodb';
export declare class Post {
    _id: ObjectId;
    custom_id: string;
    title: string;
    description: string;
    category_id: ObjectId;
    author_name: string;
    upload_cover_image: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    deleted_at: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
