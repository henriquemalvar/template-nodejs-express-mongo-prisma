import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { DeleteCategoryService } from '../../services/DeleteCategoryService';

describe('Delete category service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let deleteCategoryService: DeleteCategoryService;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    deleteCategoryService = new DeleteCategoryService(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to delete category', async () => {
    const categoryCreated = await categoryRepositoryInMemory.create({
      name: 'test',
      color: 'red',
      user_id: 'uuid',
    });

    await deleteCategoryService.execute(categoryCreated.id);
  });

  it('should not be able to delete category does not exists', async () => {
    await expect(deleteCategoryService.execute(uuidv4())).rejects.toEqual(
      new LibError('The category does not exist', 404),
    );
  });

  it('should not be able to delete card without property id', async () => {
    await expect(
      deleteCategoryService.execute(undefined as any),
    ).rejects.toEqual(new LibError('The property id is required!', 400));
  });
});
