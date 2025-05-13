import type { Post } from '../interfaces/postInterface';

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <p className="post-date">{post.created_at.slice(0, 10)}</p>
    </div>
  );
};

export default PostCard;
