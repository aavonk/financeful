import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
  Authorized,
  Ctx,
} from 'type-graphql';
import { Context } from '../types/Context';

@Resolver()
export class HelloResolver {
  @Authorized()
  @Query(() => String)
  hello(@Ctx() { user }: Context) {
    console.log(user);
    return `hi`;
  }

  @Mutation(() => Boolean)
  createSomething(
    @Arg('title', () => String, { nullable: true }) title: string | null,
    @Arg('minutes', () => Int) minutes: number,
  ) {
    console.log(minutes);
    console.log(title);
    return true;
  }
}
