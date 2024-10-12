import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import Box from '@mui/material/Box';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
// import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart as PChart} from '@mui/x-charts/PieChart';
import { PieChart, Pie, Cell, CartesianGrid, LabelList, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Legend } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { coursesDistribution, valueFormatter } from './stats/courseCreditStats';

const performanceData = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 78 },
    { name: 'English', score: 92 },
    { name: 'History', score: 88 },
    { name: 'Art', score: 95 },
];



const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 30,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

const data = [
    { value: 9.3, label: 'Semester-1' },
    { value: 8.5, label: 'Semester-2' },
    { value: 9.3, label: 'Semester-3' },
    { value: 9.5, label: 'Semester-4' },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  export const CGPAPieChart = () => {
    let total = 0;
    data.forEach((s) => {
      total += s.value;
    });
    const cgpa = total / data.length;
  
    return (
      <Box className="flex flex-col justify-start gap-4" sx={{ width: '100%' }}>
        <Typography style={{ fontWeight: 'bold' }} variant="h6" align="left">
          CGPA
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              label={({ label, value }) => `${label}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Typography align="center" variant="h6" style={{ fontWeight: 'bold' }}>
          Average CGPA: {cgpa.toFixed(2)}
        </Typography>
      </Box>
    );
  };

export const CoursePieAnimation = () => {
    return (
        <Box className="flex flex-col justify-start gap-4" sx={{ width: '100%' }}>
            <Typography style={{ fontWeight: "bold" }} variant="h6" align="left">Credit Distribution</Typography>
            <PChart
                height={300}
                series={[
                    {
                        data: coursesDistribution,
                        innerRadius: 50,
                        arcLabel: (params) => params.label ?? '',
                        arcLabelMinAngle: 20,
                        valueFormatter,
                    },
                ]}
            />
        </Box>
    );
}


const semData = [
    { semester: 1, sgpa: 9.3 },
    { semester: 2, sgpa: 8.5 },
    { semester: 3, sgpa: 9.3 },
    { semester: 4, sgpa: 9.5 },
];

export default function BasicLineChart() {
    return (
        <Box className="flex flex-col justify-start gap-4" sx={{ width: "100%" }}>
            <Typography style={{ fontWeight: "bold" }} variant="h6" align="left" gutterBottom>
                Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={semData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis domain={[0, 8]} dataKey="semester" label={{ value: 'Semester', position: 'insideBottom', offset: -5 }} />
                    <YAxis domain={[8, 10]} label={{ value: 'SGPA', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="sgpa" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}

const CieData = [
    {
      name: 'JAVA',
      cie1: 39,
      cie2: 38,
      cie3: 40,
    },
    {
      name: 'DBMS',
      cie1: 30,
      cie2: 38,
      cie3: 40,
    },
    {
      name: 'ADA',
      cie1: 37,
      cie2: 38,
      cie3: 35,
    },
    {
      name: 'SE',
      cie1: 39,
      cie2: 40,
      cie3: 38,
    },
    {
      name: 'LE',
      cie1: 40,
      cie2: 28,
      cie3: 38,
    },
  ];
  
  // Calculate minimum value from cie1, cie2, cie3 and subtract 5
  const minValue = Math.min(
    ...CieData.flatMap(item => [item.cie1, item.cie2, item.cie3])
  ) - 5;
  
  const CustomizedLabel = ({ x, y, stroke, value }) => (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
  
  const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
  
  const CieLineChart = () => {
    return (
      <Box className="flex flex-col justify-start gap-4" style={{ width: '100%' }}>
        <Typography style={{ fontWeight: "bold" }} variant="h6" align="left" gutterBottom>
          CIE Performance
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            // width={500}
            height={300}
            data={CieData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
            <YAxis domain={[Math.max(0, minValue), 40]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cie1" stroke="#8884d8" label={<CustomizedLabel />} />
            <Line type="monotone" dataKey="cie2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="cie3" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };


export const Overview = () => {
    return (
        <div>
            <TabsContent value="overview" className="space-y-4">
                <div className="flex flex-wrap justify-evenly gap-4">
                    <div className='w-[40%] h-50'>
                        <div className='shadow-lg hover:shadow-2xl rounded-3xl p-4 w-full min-h-full flex justify-center items-center'>
                            <CoursePieAnimation />
                        </div>
                    </div>
                    <div className='w-[55%] h-50'>
                        <div className='shadow-lg hover:shadow-2xl  rounded-3xl p-4 w-full min-h-full flex justify-center items-center '>
                            <BasicLineChart />
                        </div>
                    </div>
                    <div className='w-[55%] h-50'>
                        <div className='shadow-lg hover:shadow-2xl rounded-3xl p-4 w-full min-h-full flex justify-center items-center '>
                            <CieLineChart />
                        </div>
                    </div>
                    <div className='w-[40%] h-50'>
                        <div className='shadow-lg hover:shadow-2xl rounded-3xl p-4 w-full min-h-full flex justify-center items-center '>
                            <CGPAPieChart />
                        </div>
                    </div>                
                </div>                
            </TabsContent>
        </div>
    )
}
