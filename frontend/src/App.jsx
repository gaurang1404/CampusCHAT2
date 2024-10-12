import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import { LogIn } from './components/auth/LogIn';
import { SignUp } from './components/auth/SignUp';
import { Home } from './components/home/Home';
import store from './redux/store';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { Overview } from './components/dashboard/Overview';
import { Attendance } from './components/dashboard/Attendance';
import { Courses } from './components/dashboard/Courses';
import { Timetable } from './components/dashboard/Timetable';
import { Discussion } from './components/dashboard/Discussion';

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
  {
    path: '/student-dashboard',
    element: <StudentDashboard />,
    children: [
      {
        index: true,
        element: <Overview/>
      },
      {
        path: 'attendance',
        element: <Attendance/>
      },
      {
        path: 'courses',
        element: <Courses/>
      },
      {
        path: 'timetable',
        element: <Timetable/>
      },
      {
        path: 'discussions',
        element: <Discussion/>
      },
    ]
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
