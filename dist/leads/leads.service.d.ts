import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './entities/leads.entity';
import { MongoRepository } from 'typeorm';
export declare class LeadsService {
    private leadsRepo;
    constructor(leadsRepo: MongoRepository<Lead>);
    getLeads(): Promise<Lead[]>;
    create(createLeadDto: CreateLeadDto): Promise<Lead>;
}
