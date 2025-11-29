import { ObjectId } from 'mongodb';
export declare class User {
    _id: ObjectId;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    status: string;
    is_deleted: boolean;
    deleted_at: Date | null;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
