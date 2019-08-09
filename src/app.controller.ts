import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: any,
  ) {
    
  }
}
