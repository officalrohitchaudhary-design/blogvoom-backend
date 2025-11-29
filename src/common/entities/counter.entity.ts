import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Counter {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    seq: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Auto-set timestamps when inserting
    @BeforeInsert()
    setCreatedAt() {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

    }
    // Auto-set updated_at every time the entity updates
    @BeforeUpdate()
    setUpdatedAt() {
        this.updated_at = new Date();
    }
}