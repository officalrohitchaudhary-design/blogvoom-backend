import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

}
