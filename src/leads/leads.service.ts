import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/leads.entity';
import { MongoRepository } from 'typeorm';
import { Counter } from 'src/common/entities/counter.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepo: MongoRepository<Lead>,

  
  ) { }
 
  getLeads() {
    return this.leadsRepo.find({ where: { status: 'active', is_deleted: false } });
  }

  async create(createLeadDto: CreateLeadDto) {
    const createLead = this.leadsRepo.create({ ...createLeadDto, });
    return await this.leadsRepo.save(createLead);
  }
}
