import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) { }

  @Get('getHomeData')
  async getHomeConfig() {
    return await this.homeService.getHomePage();
  }

  // UPDATE homepage selected blogs
  @Patch('updateHomeData')
  async updateHomeConfig(@Body() body: UpdateHomeDto) {
    return await this.homeService.updateHomePage(body);
  }
}
