import { v4 as uuidv4 } from 'uuid';
import { ICategory } from '../../dtos/ICategory';
import { ICreateCategoryUseCaseDTO } from '../../dtos/ICreateCategoryUseCaseDTO';
import { ICategoryRepository } from '../ICategoryRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: ICategory[] = [];

  async create({
    name,
    color,
    user_id,
  }: ICreateCategoryUseCaseDTO): Promise<ICategory> {
    const category = {} as ICategory;

    Object.assign(category, {
      id: uuidv4(),
      name,
      color,
      user_id,
    });

    this.categories.push(category);

    return category;
  }

  async findAll(user_id: string, name?: string): Promise<ICategory[]> {
    return name
      ? this.categories.filter(
          category =>
            category.user_id === user_id && category.name.includes(name),
        )
      : this.categories.filter(category => category.user_id === user_id);
  }

  async findById(id: string): Promise<ICategory | null> {
    return this.categories.find(category => category.id === id) || null;
  }

  async delete(user: ICategory): Promise<void> {
    this.categories.splice(this.categories.indexOf(user));
  }
}
