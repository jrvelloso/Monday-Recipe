import { ICategory } from './icategory';

export interface IRecipeCategory {
  id: number;
  isActive: boolean;
  categoryId: number;
  category: ICategory;
}
