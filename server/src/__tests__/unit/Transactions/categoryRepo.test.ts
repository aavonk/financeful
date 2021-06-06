import { MockContext, Context, createMockContext } from '../../../testSetup';
import { CategoryRepo } from '@Modules/Categories/repos/implementations/categoryRepo';
import { categories } from '../../__mocks__/fixtures';

let ctx: Context;
let mock: MockContext;
let repo: CategoryRepo;

const USER_ID = 'userId';

const getCategories = () => {
  return categories.map((c) => ({ ...c, userId: USER_ID }));
};

const getOneCategory = (index: number) => {
  return categories[index];
};

beforeEach(() => {
  mock = createMockContext();
  ctx = (mock as unknown) as Context;
  repo = new CategoryRepo(ctx.prisma);
});

describe('Category Repo CRUD Operations', () => {
  it('findAll', async () => {
    const categories = getCategories();
    mock.prisma.category.findMany.mockResolvedValue(categories);

    await expect(repo.findAll(USER_ID)).resolves.toEqual(categories);
  });

  it('findExisting returns category', async () => {
    const category = { ...getOneCategory(1), userId: USER_ID };

    mock.prisma.category.findFirst.mockResolvedValue(category);

    await expect(repo.findExisting(USER_ID, category.name)).resolves.toEqual(
      category,
    );
  });

  it('findExisting returns null if not found', async () => {
    mock.prisma.category.findFirst.mockResolvedValue(null);
    await expect(repo.findExisting(USER_ID, 'some name')).resolves.toEqual(
      null,
    );
  });

  it('createOne', async () => {
    const data = {
      name: 'New Category',
      userId: USER_ID,
      id: '123',
      isIncome: false,
      isHidden: false,
      excludeFromBudget: false,
      description: null,
    };

    mock.prisma.category.create.mockResolvedValue(data);

    await expect(repo.createOne(USER_ID, 'New Category')).resolves.toEqual({
      name: 'New Category',
      id: '123',
      userId: USER_ID,
    });
  });

  it('updateOne', async () => {
    const updated = {
      ...getOneCategory(2),
      userId: USER_ID,
      name: 'Updated Category',
    };

    mock.prisma.category.update.mockResolvedValue(updated);

    await expect(
      repo.updateOne(updated.id, 'Updated Category'),
    ).resolves.toEqual({
      id: updated.id,
      name: 'Updated Category',
      userId: USER_ID,
    });
  });

  it('deleteOne', async () => {
    const category = getOneCategory(1);

    await expect(repo.deleteOne(category.id)).resolves.not.toThrow();
  });
});
