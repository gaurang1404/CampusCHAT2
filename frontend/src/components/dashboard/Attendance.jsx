import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const attendanceData = [
    { course: 'JAVA', classesAttended: 36, totalClasses: 40 },
    { course: 'Database and Managesment System', classesAttended: 30, totalClasses: 40 },
    { course: 'Algorithms and Design Analysis', classesAttended: 25, totalClasses: 40 },
    { course: 'Theroretical Foundation of Computation', classesAttended: 28, totalClasses: 40 },
    { course: 'Linear Algebra', classesAttended: 35, totalClasses: 40 },
    { course: 'Universal Human Values', classesAttended: 11, totalClasses: 12 },
    { course: 'Competitive Programming', classesAttended: 9, totalClasses: 12 },
];

export const Attendance = () => {
    return (
        <div className="flex gap-4 flex-wrap justify-evenly">
            {attendanceData.map((c, index) => (
                <AttendanceCard key={index} course={c} />
            ))}
        </div>
    );
};

function AttendanceCard({ course }) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        // Calculate attendance percentage
        const newPercent = (course.classesAttended / course.totalClasses) * 100;
        setPercent(newPercent);
    }, [course]);

    const strokeColor = percent >= 75 ? 'green' : 'red'; // Green if >= 75%, else red

    return (
        <Card className="w-[300px] p-6 shadow-xl rounded-[2rem] mb-4 hover:shadow-2xl cursor-pointer"> {/* Increase width of Card */}
            <CardHeader>
                <CardTitle style={{fontSize: "1rem", textAlign: "center", fontWeight: "bold"}}>{course.course}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <CircularProgressBar percentage={percent} strokeColor={strokeColor} />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <p className="text-sm">{`${course.classesAttended} / ${course.totalClasses} Classes`}</p>
            </CardFooter>
        </Card>
    );
}

function CircularProgressBar({ percentage, strokeColor }) {
    const radius = 60;  // Increase the radius
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <svg width="160" height="160"> {/* Increase the size of the SVG */}
            {/* Background Circle */}
            <g transform="rotate(-90 80 80)"> {/* Adjust center to match new size */}
                <circle
                    cx="80"  // Adjust position to match new size
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="lightgray"
                    strokeWidth="10"
                />
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    style={{ transition: 'stroke-dashoffset 0.6s ease 0s' }} // Animation for progress change
                />
            </g>
            {/* Text stays unrotated */}
            <text
                x="80"  // Adjust text position
                y="80"
                textAnchor="middle"
                dy="0.3em"
                className="text-2xl font-semibold"  // Increase text size
            >
                {`${Math.round(percentage)}%`}
            </text>
        </svg>
    );
}
