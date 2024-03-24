import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Chat extends AbstractEntity {
  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  isPrivate: boolean;

  @Field(() => [Number])
  @Column()
  userIds: number[];

  @Field()
  @Column()
  name?: string;
}
