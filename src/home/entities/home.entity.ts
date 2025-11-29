import { Entity, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class HomeManager {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: true })
    hero_blog?: ObjectId;

    @Column({ nullable: true })
    spotlight_1?: ObjectId;

    @Column({ nullable: true })
    spotlight_2?: ObjectId;

    @Column({ nullable: true })
    spotlight_3?: ObjectId;

    @Column({ nullable: true })
    spotlight_4?: ObjectId;

    @Column({ nullable: true })
    spotlight_5?: ObjectId;

    @Column({ default: new Date() })
    created_at: Date;

    @Column({ default: new Date() })
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
