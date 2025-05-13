import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import DashboardPage from './components/pages/DashboardPage';
import { getAllPosts } from './actions/loaders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: getAllPosts,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
]);
export default router;
