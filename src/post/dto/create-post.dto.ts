import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category_id: string;

    @IsOptional()
    @IsString()
    author_name: string;

    @IsOptional()
    @IsString()
    upload_cover_image: string;

}
