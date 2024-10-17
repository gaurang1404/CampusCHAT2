// CourseTable.jsx
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const CourseTable = ({ courses, totalCredits }) => {
    return (
        <Table>
            <TableCaption className="p-4">List of available courses for the current semester.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Course Name</TableHead>
                    <TableHead>Faculty in Charge</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Eligibility</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.name} className="hover:bg-blue-200">
                        <TableCell className="font-medium pl-[2rem]">{course.name}</TableCell>
                        <TableCell>{course.faculty}</TableCell>
                        <TableCell className="text-center">{course.credits}</TableCell>
                        <TableCell className="text-center">
                            <Badge className={course.isEligible ? "bg-[#34b134] text-white hover:bg-[#309d30]" : "bg-red-500 text-white hover:bg-red-700"}>
                                {course.isEligible ? "Eligible" : "Not Eligible"}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
                {/* Last Row for Total Credits */}
                <TableRow className="bg-gray-100">
                    <TableCell colSpan={2} className="font-bold text-right">Total Credits</TableCell>
                    <TableCell className="text-center font-bold">{totalCredits}</TableCell>
                    <TableCell className="text-center"></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const courses = [
    { name: "Introduction to Computer Science", faculty: "Dr. Jane Smith", credits: 4, isEligible: true },
    { name: "Calculus I", faculty: "Prof. John Doe", credits: 3, isEligible: true },
    { name: "English Composition", faculty: "Dr. Emily Johnson", credits: 2, isEligible: true },
    { name: "Physics for Engineers", faculty: "Prof. Michael Brown", credits: 4, isEligible: false },
    { name: "Introduction to Psychology", faculty: "Dr. Sarah Williams", credits: 3, isEligible: true },
];

export const Courses = () => {
    // Calculate the total credits
    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);

    return (
        <div className="container mx-auto">
            <h1 style={{ fontSize: "2rem" }} className="font-bold mb-6">Current semester</h1>
            <div className="rounded-3xl shadow-xl mb-12">
                <CourseTable courses={courses} totalCredits={totalCredits} />
            </div>

            <h1 style={{ fontSize: "2rem" }} className="font-bold mb-6">Previous semesters</h1>
            {[...Array(4)].map((_, index) => (
                <div key={index} className="shadow-xl rounded-3xl mb-[2rem]">
                    <CourseTable courses={courses} totalCredits={totalCredits} />
                </div>
            ))}
        </div>
    )
}
