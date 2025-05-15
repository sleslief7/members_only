import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import DashboardPage from './components/pages/DashboardPage';
import { getAllPosts } from './api/queries';
import EnsureAuth from './util/EnsureAuth';
import RedirectIfAuth from './util/RedirectIfAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <EnsureAuth>
            <DashboardPage />
          </EnsureAuth>
        ),
        loader: getAllPosts,
      },
      {
        path: '/login',
        element: (
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <RedirectIfAuth>
            <SignUpPage />
          </RedirectIfAuth>
        ),
      },
    ],
  },
]);

export default router;
