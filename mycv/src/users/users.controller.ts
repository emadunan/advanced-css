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
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { UserDto } from './Dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    // This is how you consume environment variables in Nestjs
    console.log('DATABASE_NAME_NEST', configService.get<string>('DB_NAME'));

    // That works in Nestjs too, but must be in a class
    console.log('DATABASE_NAME_NODE', process.env.DB_NAME);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoami(@CurrentUser() currentUser: string) {
    // That works in Nestjs too, but must be in a class
    console.log(
      'DATABASE_NAME_NEST_ON_ROUTE',
      this.configService.get<string>('DB_NAME'),
    );
    return currentUser;
    // return this.usersService.find(session.userId);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);

    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async AuthenticateUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);

    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
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
