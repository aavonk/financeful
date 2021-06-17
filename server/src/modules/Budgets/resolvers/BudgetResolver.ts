import { Resolver, Mutation, Ctx, Authorized, Arg } from 'type-graphql';
import { Budget, Context } from '@Shared/types';
import { CreateBudgetInput } from '../types/budget.types';

@Resolver()
export class BudgetResolver {
  @Authorized()
  @Mutation(() => Budget)
  async createBudget(
    @Arg('input') input: CreateBudgetInput,
    @Ctx() { user, services: { budgetService } }: Context,
  ): Promise<Budget> {
    return await budgetService.newBudget(input, user.id);
  }
}
