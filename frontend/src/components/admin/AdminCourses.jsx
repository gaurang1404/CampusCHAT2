import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2 } from 'lucide-react'
import store from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCollege } from '@/redux/authSlice'
import axios from 'axios'
import { API_ENDPOINT } from '@/utils/const'

export const AdminCourses = () => {
    const { loading, college } = useSelector(store => store.auth);
    const [newCourse, setNewCourse] = useState({ code: '', name: '', semesterId: '', credits: 1 })
    const [departments, setDepartments] = useState([]);
    const [availableSemesters, setAvailableSemesters] = useState([]);  // To store semesters for the selected department
    const [dialogOpen, setDialogOpen] = useState(false);  // Track dialog open state
    const [adding, setAdding] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setDepartments(college.departments);
    }, [college]);

    // Reset available semesters when the dialog is opened
    useEffect(() => {
        if (dialogOpen) {
            setAvailableSemesters([]); // Reset semesters when dialog opens
        }
    }, [dialogOpen]);

    const handleDepartmentChange = (value) => {
        setNewCourse({ ...newCourse, department: value, semester: '' });  // Reset semester when department changes
        const selectedDepartment = college.departments.find(dept => dept.name === value);
        setAvailableSemesters(selectedDepartment?.currentSemesters || []);
    }

    const addCourse = async (newCourse) => {
        setAdding(true);
        try {
            console.log(newCourse);
            const response = await axios.post(`${API_ENDPOINT}/course/${newCourse.departmentId}/add`, newCourse, { withCredentials: true });
            if (response.data.success) {
                const clg = response.data.college;
                dispatch(setCollege(clg));
                setNewCourse({ code: '', name: '', semesterId: '', credits: 1 });
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to add course.");
        } finally {
            setAdding(false);
            setDialogOpen(false);
        }

    }


    const deleteCourse = async (id) => {
        setAdding(true);
        try {
            const response = await axios.post(`${API_ENDPOINT}/course/delete`, { courseId: id }, { withCredentials: true });
            if (response.data.success) {
                const clg = response.data.college;
                dispatch(setCollege(clg));
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete course.");
        } finally {
            setAdding(false);
            setDialogOpen(false);
        }
    }

    return (
        <Card style={{ borderRadius: "1rem" }} className="w-full max-w-7xl mx-auto">
            <CardHeader>
                <CardTitle>Manage Courses</CardTitle>
                <CardDescription>Add, view, or remove courses offered by the college.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    departments && availableSemesters ?

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <div>
                                <DialogTrigger asChild>
                                    <Button className="mb-4">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                                    </Button>
                                </DialogTrigger>
                                <DialogContent style={{ borderRadius: "1rem" }} className="bg-white sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Course</DialogTitle>
                                        <DialogDescription>Enter the details of the new course here.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="courseCode" className="text-right">Code</Label>
                                            <Input
                                                id="courseCode"
                                                value={newCourse.code}
                                                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="courseName" className="text-right">Name</Label>
                                            <Input
                                                id="courseName"
                                                value={newCourse.name}
                                                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="courseDepartment" className="text-right">Department</Label>
                                            <Select onValueChange={handleDepartmentChange}>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    {departments && departments.map((dept) => (
                                                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="courseSemester" className="text-right">Semester</Label>
                                            <Select
                                                onValueChange={(value) => setNewCourse({ ...newCourse, semesterId: value })}
                                                disabled={!newCourse.department} // Disable if no department is selected
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select semester" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    {availableSemesters.map((semester) => (
                                                        <SelectItem key={semester._id} value={semester._id}>{semester.number}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="courseCredits" className="text-right">Credits</Label>
                                            <Input
                                                id="courseCredits"
                                                type="number"
                                                value={newCourse.credits}
                                                onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            style={{ borderRadius: "1rem", backgroundColor: "blue", color: "white" }}
                                            className="bg-blue-700 text-white hover:bg-blue-800"
                                            onClick={() => {
                                                addCourse(newCourse);
                                                setDialogOpen(false);
                                            }}
                                        >
                                            Add Course
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </div>
                        </Dialog>

                        :

                        <p>Add departments and a semester to add courses</p>
                }

                <Accordion type="multiple" className="w-full">
                    {departments && departments.map((department) => (
                        <AccordionItem value={`department-${department._id}`} key={department._id}>
                            <AccordionTrigger style={{ textDecoration: "none" }} >{department.name}</AccordionTrigger>
                            <AccordionContent>
                                <Accordion type="multiple" className="w-full pl-4">
                                    {department.currentSemesters.length == 0 ? "No ongoing semesters" : department.currentSemesters.map((semester) => (
                                        <AccordionItem value={`semester-${semester._id}`} key={semester._id}>
                                            <AccordionTrigger>Semester: {semester.number}</AccordionTrigger>
                                            <AccordionContent>
                                                {semester.courses ? semester.courses.length === 0 ? "No courses added" :
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Code</TableHead>
                                                                <TableHead>Name</TableHead>
                                                                <TableHead>Credits</TableHead>
                                                                <TableHead>Actions</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {semester.courses.map((course) => (
                                                                <TableRow key={course._id}>
                                                                    <TableCell>{course.code}</TableCell>
                                                                    <TableCell>{course.name}</TableCell>
                                                                    <TableCell>{course.credits}</TableCell>
                                                                    <TableCell>
                                                                        <Dialog>
                                                                            <DialogTrigger asChild>
                                                                                <Button variant="destructive" size="icon">
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent style={{ borderRadius: "1rem" }} className="sm:max-w-[425px] bg-white">
                                                                                <DialogHeader>
                                                                                    <DialogTitle>Delete {course.name} course?</DialogTitle>
                                                                                    <DialogDescription>
                                                                                        This action is irreversible, are you sure?
                                                                                    </DialogDescription>
                                                                                </DialogHeader>
                                                                                <DialogFooter>

                                                                                    <Button
                                                                                        style={{ backgroundColor: "blue", color: "white", borderRadius: "1rem" }}
                                                                                        className="hover:bg-blue-800 w-full"
                                                                                        onClick={() => deleteCourse(course._id)}>
                                                                                        {adding ? "Deleting..." : "Delete Course"}
                                                                                    </Button>
                                                                                </DialogFooter>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                    : <p>No courses added yet</p>
                                                }

                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
