import { Mutation, Query, Resolver, Arg, Int, Authorized } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Authorized()
  @Query(() => String)
  hello() {
    return 'hi!';
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
