import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'id, primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'email' })
  @Column()
  email: string;

  @Field(() => String, { description: 'passord' })
  @Column()
  password: string;
}
