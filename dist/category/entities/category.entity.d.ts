import { ObjectId } from 'mongodb';
export declare class Category {
    _id: ObjectId;
    custom_id: string;
    name: string;
    status: string;
    is_deleted: boolean;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
