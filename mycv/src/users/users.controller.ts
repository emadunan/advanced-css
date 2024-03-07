import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { UserDto } from './Dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    return this.authService.signup(email, password);
  }

  @Post('/signin')
  async AuthenticateUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    return this.authService.signin(email, password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.find(parseInt(id));

    if (!user) throw new NotFoundException();

    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.findAll(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const { ...attrs } = body;
    return await this.usersService.update(parseInt(id), attrs);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}
