import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from '../shared/NavBar';
import { Link, Outlet } from 'react-router-dom';

export const CustomTable = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='bg-gray-100'>
      <NavBar/>
      <div className="max-w-7xl mx-auto min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Student Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <Link to=""><TabsTrigger value="overview"><span className='text-lg'>Overview</span></TabsTrigger></Link>
              <Link to="attendance"><TabsTrigger value="attendance"><span className='text-lg'>Attendance</span></TabsTrigger></Link>
              <Link to="courses"><TabsTrigger value="courses"><span className='text-lg'>Courses</span></TabsTrigger></Link>
              <Link to="timetable"><TabsTrigger value="timetable"><span className='text-lg'>Timetable</span></TabsTrigger></Link>
              <Link to="discussions"><TabsTrigger value="discussions"><span className='text-lg'>Discussions</span></TabsTrigger></Link>
            </TabsList>
            <Outlet/>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
