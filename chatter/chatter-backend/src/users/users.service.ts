import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 5);
  }

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepo.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
    return await this.usersRepo.save(user);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  async findOne(id: number) {
    return await this.usersRepo.findOneBy({ id });
  }

  async update(id: number, attrs: UpdateUserInput) {
    if (attrs.password) {
      attrs.password = await this.hashPassword(attrs.password);
    }
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs);

    return await this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');

    return await this.usersRepo.remove(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('user not found');

    const passportIsValid = await bcrypt.compare(password, user.password);
    if (!passportIsValid)
      throw new UnauthorizedException('credentials are not valid');

    return user;
  }
}
