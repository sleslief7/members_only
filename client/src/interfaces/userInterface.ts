export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
  is_member: boolean;
  is_admin: boolean;
}

export interface UserSignUpRequest {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
