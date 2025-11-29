import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ nullable: true })
  deleted_at: Date | null

  // Auto-set timestamps when inserting
  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;

    // Add defaults here
    if (this.status === undefined) this.status = 'active';
    if (this.is_deleted === undefined) this.is_deleted = false;
    if (this.deleted_at === undefined) this.deleted_at = null;
  }

  // Auto-set updated_at every time the entity updates
  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date();
  }
}
