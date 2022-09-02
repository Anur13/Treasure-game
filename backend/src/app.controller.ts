import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CheckResultsDto } from './interfaces/checkResultsDto';

@UsePipes(new ValidationPipe())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Post()
  checkResults(@Body() results: CheckResultsDto) {
    return this.appService.generateResponse(results);
  }
}
