import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("./entities/leads.entity").Lead>;
    getAllLeads(): Promise<import("./entities/leads.entity").Lead[]>;
}
