import { useAuth } from '@/hooks/useAuth';
import { toaster } from '@/components/ui/toaster';
import type { Post } from '../interfaces/postInterface';
import { GoTrash } from 'react-icons/go';
import { deletePost } from '@/api/queries';

type Props = {
  post: Post;
  refreshPosts: () => void;
};

const PostCard = ({ post, refreshPosts }: Props) => {
  const { user } = useAuth();

  const handleDeletePost = async () => {
    await deletePost(post.id);
    await refreshPosts();
    toaster.create({
      title: 'Post deleted',
      type: 'success',
    });
  };
  return (
    <div className="post-card">
      <h2 className="post-title">
        {post.title}{' '}
        {user?.is_admin && (
          <GoTrash onClick={handleDeletePost} className="delete-post" />
        )}
      </h2>
      <p className="post-content">{post.content}</p>
      {user?.is_member && (
        <div>
          <p className="post-date">{post.created_at.slice(0, 10)}</p>{' '}
          <p className="author">Author: {post.username}</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
