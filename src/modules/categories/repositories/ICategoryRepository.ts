import { ICategory } from '../dtos/ICategory';
import { ICreateCategoryUseCaseDTO } from '../dtos/ICreateCategoryUseCaseDTO';

export interface ICategoryRepository {
  create(data: ICreateCategoryUseCaseDTO): Promise<ICategory>;
  findAll(user_id: string, name?: string): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
  delete(category: ICategory): Promise<void>;
}
