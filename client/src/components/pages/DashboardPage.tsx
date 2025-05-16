import { useLoaderData } from 'react-router-dom';
import PostCard from '../PostCard';
import type { Post } from '../../interfaces/postInterface';
import { useState } from 'react';
import { getAllPosts } from '@/api/queries';
import { useAuth } from '@/hooks/useAuth';
import PostDialog from '../PostDialog';

const DashboardPage = () => {
  const loaderPosts = useLoaderData();
  const [posts, setPosts] = useState(loaderPosts);
  const { isAuth } = useAuth();

  const refreshPosts = async () => {
    const posts = await getAllPosts();
    setPosts(posts);
  };

  return (
    <div>
      <div id="add-post-div">
        {isAuth && <PostDialog refreshPosts={refreshPosts} />}
      </div>
      <div id="posts-page">
        {posts.map((post: Post) => {
          return (
            <PostCard key={post.id} post={post} refreshPosts={refreshPosts} />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
