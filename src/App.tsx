import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import QuizOne from './pages/quiz1/QuizOne';
import Ranking from './pages/prolog/Ranking';
import PrologStory from '@/pages/prolog/PrologStory';
import Play from '@/pages/prolog/Play';
import CharacterSelection from '@/pages/prolog/CharacterSelection';
import Login from '@/pages/prolog/Login';
import TestPage from '@/pages/test-page';
import Main from '@/pages/main-page';
import Onboarding from '@/pages/onboarding';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/character-selection', // 캐릭터 선택 페이지 추가
    element: <CharacterSelection />,
  },
  {
    path: '/login', // 로그인 페이지 추가
    element: <Login />,
  },
  {
    path: '/prolog',
    element: <PrologStory />,
  },
  {
    path: '/play',
    element: <Play />,
  },
  {
    path: '/ranking',
    element: <Ranking />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/quiz1',
    element: <QuizOne />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
