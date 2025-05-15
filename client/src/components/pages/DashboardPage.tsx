import { useLoaderData } from 'react-router-dom';
import PostCard from '../DashboardCards';
import type { Post } from '../../interfaces/postInterface';

const DashboardPage = () => {
  const posts = useLoaderData();

  return (
    <div>
      {posts.map((post: Post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

export default DashboardPage;
