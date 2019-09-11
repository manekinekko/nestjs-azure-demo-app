import { Injectable } from '@nestjs/common';
import { Repository, AzureTableStorageResponse, AzureTableStorageResultList, InjectRepository } from '@nestjs/azure-database';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>) {}

  async find(rowKey: string, contact: Contact): Promise<Contact> {
    return await this.contactRepository.find(rowKey, contact);
  }

  async findAll(): Promise<AzureTableStorageResultList<Contact>> {
    return await this.contactRepository.findAll();
  }

  async create(contact: Contact): Promise<Contact> {
    return await this.contactRepository.create(contact);
  }

  async update(key: string, contact: Partial<Contact>): Promise<Contact> {
    return await this.contactRepository.update(key, contact);
  }

  async delete(rowKey: string, contact: Contact): Promise<AzureTableStorageResponse> {
    return await this.contactRepository.delete(rowKey, contact);
  }
}
