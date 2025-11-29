
import { IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateCategoryDto {
    @IsString()
    name: string;

}
