import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({ email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findById(_id: string) {
    return this.userRepo.findOne({ where: { _id: new ObjectId(_id) } });
  }
}
