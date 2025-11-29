import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(_id: string): Promise<User>;
}
