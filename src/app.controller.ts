import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';

@Controller()
export class AppController {
  constructor(private readonly azureStorage: AzureStorageService) {}

  @Post('azure/upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    file = {
      ...file,
      originalname: 'foo-bar.txt',
    };

    const storageUrl = await this.azureStorage.upload(file, {
      containerName: 'nest-demo-container-service',
    });
    Logger.log(
      `File "${file.originalname}" was uploaded using Azure Service`,
      'AppController',
    );
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
  }

  @Post('azure/upload/interceptor')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'nest-demo-container-interceptor',
    }),
  )
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(
      `File "${
        file.originalname
      }" was uploaded using Azure Storage Interceptor`,
      'AppController',
    );
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  }
}
