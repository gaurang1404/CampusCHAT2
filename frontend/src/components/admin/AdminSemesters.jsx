import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@mui/material';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCollege } from '@/redux/authSlice';
import { API_ENDPOINT } from '@/utils/const';
import axios from 'axios';
import { toast } from 'sonner';

export const AdminSemesters = () => {
    const { loading, college } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [adding, setAdding] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [departments, setDepartments] = useState(college.departments);

    const [newSemester, setNewSemester] = useState({
        departmentId: null,
        number: '',
        year: '',
    });

    // Function to add a new semester to a department
    const addSemester = async () => {
        setAdding(true);
        try {
            if (newSemester.departmentId && newSemester.number && newSemester.year) {
                const response = await axios.post(`${API_ENDPOINT}/semester/add`, newSemester, { withCredentials: true });
                if (response.data.success) {
                    console.log(response.data);

                    dispatch(setCollege(response.data.college));
                    setDepartments(response.data.college.departments);
                    setNewSemester({ departmentId: null, number: '', year: '' });
                    setIsDialogOpen(false);
                } else {
                    toast.error(response.data.message || "Error adding semester.", { duration: 5000 });
                }
            } else {
                toast.error("Please fill out all fields.", { duration: 5000 });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding semester. Please try again.", { duration: 5000 });
        } finally {
            setAdding(false);
        }
    };

    // Function to delete a semester from a department
    const deleteSemester = async (departmentId, semesterId) => {
        setAdding(true);
        try {
            if (departmentId && semesterId) {
                const response = await axios.post(`${API_ENDPOINT}/semester/delete`, { departmentId, semesterId }, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setCollege(response.data.college));
                    setDepartments(response.data.college.departments);
                } else {
                    toast.error("Could not delete semester. Please try again.", { duration: 5000 });
                }
            } else {
                toast.error("Invalid department or semester ID.", { duration: 5000 });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting semester. Please try again.", { duration: 5000 });
        } finally {
            setAdding(false);
        }
    };

    return (
        <Card style={{ borderRadius: '1rem' }}>
            <CardHeader>
                <CardTitle>Manage Semesters</CardTitle>
                <CardDescription>
                    Add, view, or remove semesters and their details for different departments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    departments ?

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <div>
                                <DialogTrigger asChild>
                                    <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Semester
                                    </Button>
                                </DialogTrigger>
                                <DialogContent style={{ borderRadius: "1rem" }} className="sm:max-w-[425px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Add New Semester</DialogTitle>
                                        <DialogDescription>
                                            Enter the details of the new semester for a department.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="semesterNumber" className="text-right">
                                                Number
                                            </Label>
                                            <Input
                                                id="semesterNumber"
                                                value={newSemester.number}
                                                onChange={(e) =>
                                                    setNewSemester({ ...newSemester, number: e.target.value })
                                                }
                                                className="col-span-3"
                                                placeholder='Semester number'
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="year" className="text-right">
                                                Year
                                            </Label>
                                            <Input
                                                id="year"
                                                type="number"
                                                min="2024"
                                                max={new Date().getFullYear() + 10}
                                                value={newSemester.year}
                                                onChange={(e) =>
                                                    setNewSemester({ ...newSemester, year: e.target.value })
                                                }
                                                className="col-span-3"
                                                placeholder="yyyy"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="department" className="text-right">
                                                Department
                                            </Label>
                                            <select
                                                id="department"
                                                value={newSemester.departmentId}
                                                onChange={(e) => {
                                                    setNewSemester({
                                                        ...newSemester,
                                                        departmentId: e.target.value,
                                                    })
                                                }}
                                                className="col-span-3 p-2"
                                            >
                                                <option value={null}>Select Department</option>
                                                {departments && departments.map((dept) => (
                                                    <option key={dept._id} value={dept._id}>
                                                        {dept.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button style={{ backgroundColor: "blue", color: "white", borderRadius: "1rem" }} className="hover:bg-blue-800 w-full" onClick={addSemester} disabled={adding}>
                                            {adding ? "Adding..." : "Add Semester"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </div>
                        </Dialog>

                        :
                        <p>Add departments first to add semesters</p>
                }

                {departments && departments.map((department) => (
                    <Accordion key={department._id} type="single" collapsible>
                        <AccordionItem value={department._id}>
                            <AccordionTrigger className="p-2 hover:bg-blue-100" style={{ textDecoration: "none" }}>
                                {department.name}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    {department.currentSemesters && department.currentSemesters.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Number</TableHead>
                                                    <TableHead>Year</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {department.currentSemesters.map((semester) => (
                                                    <TableRow key={semester._id}>
                                                        <TableCell>{semester.number}</TableCell>
                                                        <TableCell>{semester.year}</TableCell>
                                                        <TableCell>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="icon"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent style={{ borderRadius: "1rem" }} className="sm:max-w-[425px] bg-white">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Delete semester?</DialogTitle>
                                                                        <DialogDescription>
                                                                            This action is irreversible, are you sure?
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <DialogFooter>

                                                                        <Button
                                                                            style={{ backgroundColor: "blue", color: "white", borderRadius: "1rem" }}
                                                                            className="hover:bg-blue-800 w-full"
                                                                            onClick={() => deleteSemester(department._id, semester._id)}>
                                                                            {adding ? "Deleting..." : "Delete Semester"}
                                                                        </Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-gray-500">No semesters added yet.</p>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </CardContent>
        </Card>
    );
};
