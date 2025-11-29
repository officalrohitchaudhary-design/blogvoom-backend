import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Lead {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  custom_id: string;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ nullable: true })
  deleted_at: Date | null;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;

    if (!this.status) this.status = 'active';
    if (!this.is_deleted) this.is_deleted = false;
    if (!this.deleted_at) this.deleted_at = null;

  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date();
  }
}
