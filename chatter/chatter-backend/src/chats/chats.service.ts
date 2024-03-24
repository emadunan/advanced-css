import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatsService {
  constructor(@InjectRepository(Chat) private chatsRepo: Repository<Chat>) {}

  async create(createChatInput: CreateChatInput, userId: number) {
    const chat = this.chatsRepo.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
    });
    return await this.chatsRepo.save(chat);
  }

  async findAll() {
    return await this.chatsRepo.find();
  }

  async findOne(id: number) {
    return await this.chatsRepo.findOneBy({ id });
  }

  async update(id: number, attrs: UpdateChatInput) {
    const chat = await this.chatsRepo.findOneBy({ id });

    if (!chat) throw new NotFoundException('chat not found');

    Object.assign(chat, attrs);

    return await this.chatsRepo.save(chat);
  }

  async remove(id: number) {
    const chat = await this.chatsRepo.findOneBy({ id });

    if (!chat) throw new Error('chat not found');

    const deletedChat = await this.chatsRepo.remove(chat);

    return { ...deletedChat, id: chat.id } as Chat;
  }
}
