import { Expose, Transform, Type } from 'class-transformer';
import { User } from '../../users/user.entity';
import { UserDto } from 'src/users/Dtos/user.dto';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  @Type(() => UserDto)
  user: User;
}
