import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('Contact Controller', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [{provide: ContactService, useValue: {}}]
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
