import { IsString, IsOptional } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category_id?: string;

    @IsOptional()
    @IsString()
    author_name?: string;

    @IsOptional()
    @IsString()
    upload_cover_image?: string;

    @IsOptional()
    @IsString()
    status?: string;
}
