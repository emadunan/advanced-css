import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  const fakeUsersService: Partial<UsersService> = {
    find(id: number) {
      return Promise.resolve({
        id,
        email: 'emadunan@gmail.com',
        password: 'hiworld',
      } as User);
    },
    findAll(_email: string) {
      return Promise.resolve([
        {
          id: 1,
          email: 'emadunan@gmail.com',
          password: 'hiworld',
        } as User,
      ]);
    },
    // create(email: string, password: string) {
    //   return Promise.resolve({
    //     id: 999,
    //     email: 'emadunan@gmail.com',
    //     password: 'hiworld',
    //   } as User);
    // },
    // remove(id: number) {
    //   return Promise.resolve({
    //     id: 999,
    //     email: 'emadunan@gmail.com',
    //     password: 'hiworld',
    //   } as User);
    // },
  };

  const fakeAuthService: Partial<AuthService> = {
    // signup(email: string, password: string) {
    //   return Promise.resolve({
    //     id: 999,
    //     email: 'emadunan@gmail.com',
    //     password: 'hiworld',
    //   } as User);
    // },
    signin(email: string, password: string) {
      return Promise.resolve({
        id: 1,
        email,
        password,
      } as User);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('emad@emad.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('emadunan@gmail.com');
  });

  it('findUser returns a one user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toEqual({
      id: 1,
      email: 'emadunan@gmail.com',
      password: 'hiworld',
    });
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.find = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -1 };

    const user = await controller.AuthenticateUser(
      {
        email: 'emadunan@gmail.com',
        password: 'hiworld',
      },
      session,
    );

    expect(user.id).toBe(1);
    expect(session.userId).toBe(1);
  });
});
