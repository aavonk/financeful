import { Resolver, Mutation, Ctx, Authorized, Arg, Query } from 'type-graphql';
import { Context, Budget, MonthAndYear } from '@Shared/types';
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

  @Authorized()
  @Query(() => Budget, { nullable: true })
  async getBudget(
    @Arg('date') date: MonthAndYear,
    @Ctx() { user, services: { budgetService } }: Context,
  ): Promise<Budget | null> {
    return await budgetService.getBudget(date, user.id);
  }
}
