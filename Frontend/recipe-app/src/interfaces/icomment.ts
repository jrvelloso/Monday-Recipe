export interface IComment {
  id: number;
  comments: string;
  userId: number;
  recipeId: number;
  isActive: boolean;
  username: string;
  avatarUrl: string;
  createdAt?: string;
}
