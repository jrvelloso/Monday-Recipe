import { ICategory } from './icategory';
import { IDifficulty } from './idifficulty';
import { IUser } from './iuser';

export interface IRecipe {
  id: number;
  isActive: boolean;
  status: string;
  title: string;
  description: string;
  preparationTime: string;
  categoryId: number;
  difficultyId: number;
  userId: number;
  category: ICategory;
  difficulty: IDifficulty;
  user: IUser;
}
