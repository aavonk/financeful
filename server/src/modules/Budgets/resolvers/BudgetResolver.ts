import { Resolver, Mutation, Ctx, Authorized, Arg } from 'type-graphql';
import { Context } from '@Shared/types';
import { CreateBudgetInput, CreateBudgetResponse } from '../types/budget.types';

@Resolver()
export class BudgetResolver {
  @Authorized()
  @Mutation(() => CreateBudgetResponse)
  async createBudget(
    @Arg('input') input: CreateBudgetInput,
    @Ctx() { user, services: { budgetService } }: Context,
  ): Promise<CreateBudgetResponse> {
    return await budgetService.newBudget(input, user.id);
  }
}
