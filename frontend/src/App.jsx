import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import { LogIn } from './components/auth/LogIn';
import { SignUp } from './components/auth/SignUp';
import { Home } from './components/home/Home';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/student-login',
    element: <LogIn />,
  },
  {
    path: '/student-signup',
    element: <SignUp />,
  },
]);

function App() {
  return (
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
