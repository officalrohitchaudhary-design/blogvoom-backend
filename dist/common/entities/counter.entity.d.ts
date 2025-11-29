import { ObjectId } from 'mongodb';
export declare class Counter {
    _id: ObjectId;
    name: string;
    seq: number;
    created_at: Date;
    updated_at: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
