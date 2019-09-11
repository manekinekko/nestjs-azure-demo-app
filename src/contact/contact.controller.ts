import { Body, Controller, Delete, Get, Param, Post, Put, UnprocessableEntityException, Patch } from '@nestjs/common';
import { ContactDto } from './contact.dto';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';

@Controller('db')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllContacts() {
    return await this.contactService.findAll();
  }

  @Get(':rowKey')
  async getContact(@Param('rowKey') rowKey) {
    try {
      return await this.contactService.find(rowKey, new Contact());
    } catch (error) {
      // Entity not found
      throw new UnprocessableEntityException(error);
    }
  }

  @Post()
  async createContact(
    @Body()
    contactData: ContactDto,
  ) {
    try {
      const contact = new Contact();
      // Disclaimer: Assign only the properties you are expecting!
      Object.assign(contact, contactData);

      return await this.contactService.create(contact);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Put(':rowKey')
  async saveContact(@Param('rowKey') rowKey, @Body() contactData: ContactDto) {
    try {
      const contact = new Contact();
      // Disclaimer: Assign only the properties you are expecting!
      Object.assign(contact, contactData);

      return await this.contactService.update(rowKey, contact);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
  @Patch(':rowKey')
  async updateContactDetails(@Param('rowKey') rowKey, @Body() contactData: Partial<ContactDto>) {
    try {
      const contact = new Contact();
      // Disclaimer: Assign only the properties you are expecting!
      Object.assign(contact, contactData);

      return await this.contactService.update(rowKey, contact);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete(':rowKey')
  async deleteDelete(@Param('rowKey') rowKey) {
    try {
      const response = await this.contactService.delete(rowKey, new Contact());

      if (response.statusCode === 204) {
        return null;
      } else {
        throw new UnprocessableEntityException(response);
      }
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
