import { createContext } from 'react';
import type { User } from '../interfaces/userInterface';

interface UserContextType {
  isAuth: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<UserContextType | undefined>(
  undefined
);
