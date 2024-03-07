import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// Convert scrypt to async function
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const found = await this.usersService.findAll(email);

    if (found.length)
      throw new ConflictException('This email has already taken');

    // Hash the users password
    // Generate a salt

    // byte = 8bit = 2 chars => 16 chars
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt
    const result = hash.toString('hex') + '.' + salt;

    // Create a new user and save it
    const user = this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(providedEmail: string, providedPassword: string) {
    const [user] = await this.usersService.findAll(providedEmail);
    if (!user) throw new NotFoundException();

    const { password } = user;
    const [_hash, salt] = password.split('.');

    const buffer = (await scrypt(providedPassword, salt, 32)) as Buffer;
    const hash = buffer.toString('hex') + '.' + salt;

    if (hash !== password) throw new UnauthorizedException();

    return user;
  }
}
