import { ProtectedLayout, PublicLayout } from '@/components/Layout';
import Auth from '@/pages/Auth';
import Chat from '@/pages/Chat';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Registration from '@/pages/Registration';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import CreateStory from '@/pages/Story/CreateStory';
import EditStory from '@/pages/Story/EditStory';
import StoryDetails from '@/pages/Story/StoryDetails';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/registration',
        element: <Registration />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/profile/:username',
        element: <Profile />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      { path: '/story/create', element: <CreateStory /> },
      { path: '/story/edit/:id', element: <EditStory /> },
      { path: '/story/:storyid', element: <StoryDetails /> },
    ],
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
]);
