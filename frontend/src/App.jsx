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
import { AdminSignUp } from './components/auth/AdminSignUp';
import { AdminLogIn } from './components/auth/AdminLogIn';
import { Toaster } from 'sonner'; // Import Toaster from sonner
import { AddCollege } from './components/admin/AddCollege';
import AdminDashboard from './components/admin/AdminDashboard';

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
  {
    path: "/admin-signup",
    element: <AdminSignUp/>
  },
  {
    path: "/admin-login",
    element: <AdminLogIn/>
  },
  {
    path: "/add-college",
    element: <AddCollege/>
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard/>
  },
]);

function App() {
  return (
    <Provider store={store}>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
