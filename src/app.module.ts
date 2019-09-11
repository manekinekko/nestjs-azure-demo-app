import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ContactModule,
    // AzureTableStorageModule.forRoot(),
    AzureStorageModule.withConfig({
      sasKey: process.env.AZURE_STORAGE_SAS_KEY,
      accountName: process.env.AZURE_STORAGE_ACCOUNT,
      containerName: 'nest-demo-container',
    }),
  ],
})
export class AppModule {}
