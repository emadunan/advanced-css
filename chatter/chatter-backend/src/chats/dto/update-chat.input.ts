import { CreateChatInput } from './create-chat.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {
  @Field()
  id: number;
}
