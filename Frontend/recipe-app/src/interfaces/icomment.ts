export interface IComment {
  id: number;
  comments: string;
  userId: number;
  recipeId: number;
  isActive: boolean;
  user?: {
    username: string;
    avatarUrl?: string;
  };
  createdAt?: string;
}
