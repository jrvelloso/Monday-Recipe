export interface IUser {
  id: number;
  isActive: boolean;
  name: string;
  email: string;
  password: string;
  isRegisted: boolean;
  isAdmin: boolean;
  favourites: number[];
  recipes: number[];
}
