export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  username: string;
}

export interface CreatePost {
  user_id?: number | undefined;
  title: string;
  content: string;
}
