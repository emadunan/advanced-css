import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class AbstractEntity {
  @Field(() => Int, { description: 'Id, primary key' })
  @PrimaryGeneratedColumn()
  id: number;
}
