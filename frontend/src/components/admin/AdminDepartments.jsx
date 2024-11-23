import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Trash2 } from 'lucide-react'
import { Input } from '@mui/material'
import axios from 'axios'
import { API_ENDPOINT } from '@/utils/const'
import { DialogDescription } from '@radix-ui/react-dialog'
import { setLoading, setCollege } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'

export const AdminDepartments = () => {
    const { loading, college } = useSelector(store => store.auth);
    const [departments, setDepartments] = useState([])    
    const [error, setError] = useState(null)
    const [newDepartment, setNewDepartment] = useState({ name: '', headOfDepartment: '' })
    const [adding, setAdding] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false) // New state to control dialog open state
    const dispatch = useDispatch();

    // Fetch all departments on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {                
                const departments = college.departments;
                if(departments == null){
                    return;
                }

                // Fetch students and faculties for each department
                const departmentsWithCounts = await Promise.all(departments.map(async (dept) => {
                    const studentsCount = await fetchNumberOfStudents(dept._id);
                    const facultiesCount = await fetchNumberOfFaculties(dept._id);
                    return {
                        ...dept,
                        numberOfStudents: studentsCount,
                        numberOfFaculties: facultiesCount
                    };
                }));

                setDepartments(departmentsWithCounts);
            } catch (error) {
                console.error("Error fetching departments:", error);
                setError('Failed to load departments.');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // Fetch the number of students for a department
    const fetchNumberOfStudents = async (departmentId) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/student/get/${departmentId}`, { withCredentials: true });
            return response.data.students.length;
        } catch (error) {
            console.error(`Error fetching students for department ${departmentId}:`, error);
            return 0; // Return 0 in case of error
        }
    };

    // Fetch the number of faculties for a department
    const fetchNumberOfFaculties = async (departmentId) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/faculty/get/${departmentId}`, { withCredentials: true });
            return response.data.faculties.length; // Assuming the response contains a `faculties` array
        } catch (error) {
            console.error(`Error fetching faculties for department ${departmentId}:`, error);
            return 0; // Return 0 in case of error
        }
    };

    // Add new department
    const addItem = async (department) => {
        setAdding(true);
        try {
            if(department.name.length === 0){
                toast.error("Department name is too small");
                return; 
            }
            const response = await axios.post(`${API_ENDPOINT}/department/add`, department, { withCredentials: true });
            if(response.data.success){
                const newDept = response.data.department;
                const college = response.data.college;
                
                dispatch(setCollege(college));            
    
                // Fetch students and faculties count for the newly added department
                const studentsCount = await fetchNumberOfStudents(newDept._id);
                const facultiesCount = await fetchNumberOfFaculties(newDept._id);
                setDepartments(prev => [...prev, { ...newDept, numberOfStudents: studentsCount, numberOfFaculties: facultiesCount }]);
                setNewDepartment({ name: '', headOfDepartment: '' });
                toast.success(response.data.message);
                setDialogOpen(false); // Close the dialog after adding department
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding department:", error);
            setError('Failed to add department.');
            toast.error("Failed to add department.");
        } finally {
            setAdding(false);
        }
    };

    // Delete a department
    const deleteItem = async (departmentId) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/department/delete/${departmentId}`, { withCredentials: true });
            if(response.data.success){
                setDepartments(prev => prev.filter(dept => dept._id !== departmentId));
                setDeletingId(null);
                dispatch(setCollege(response.data.college));
                toast.success(response.data.message); 
            }else{
                toast.error(response.data.message); 
            }

        } catch (error) {
            console.error("Error deleting department:", error);
            setError('Failed to delete department.');
        }
    };

    if (loading) return <h1>Loading departments...</h1>;
    if (error) return <p>{error}</p>;    

    return (
        <Card style={{ borderRadius: "1rem" }}>
            <CardHeader>
                <CardTitle>Manage Departments</CardTitle>
                <CardDescription>Add, view, or remove departments in the college.</CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mb-4" onClick={() => setDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add Department</Button>
                    </DialogTrigger>
                    <DialogContent style={{ borderRadius: "1rem" }} className="bg-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Department</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                    id="name"
                                    value={newDepartment.name}
                                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                                    placeholder="Department Name"
                                    className="col-span-4"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button style={{backgroundColor: "blue", color:"white", borderRadius: "1rem"}} className="hover:bg-blue-800 w-full" onClick={() => addItem(newDepartment)} disabled={adding}>
                                {adding ? "Adding..." : "Add Department"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Name of Department</TableHead>
                            <TableHead className="text-center">Head of Department</TableHead>
                            <TableHead className="text-center">Number of Students</TableHead>
                            <TableHead className="text-center">Number of Faculties</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.length > 0 ? departments.map((dept) => (
                            <TableRow className="text-center" key={dept._id}>
                                <TableCell>{dept.name}</TableCell>
                                <TableCell>{dept.headOfDepartment || "Not added"}</TableCell>
                                <TableCell>{dept.numberOfStudents}</TableCell>
                                <TableCell>{dept.numberOfFaculties}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="icon" onClick={() => setDeletingId(dept._id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent style={{ borderRadius: "1rem" }} className="bg-white sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Delete Department</DialogTitle>
                                                <DialogDescription>{dept.name} will be deleted permanently, along with any semesters, sections, student and faculty data belongin to this department. Click on Delete to permanently delete this department.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button className="w-full" style={{ backgroundColor: "red", color: "white", borderRadius: "1rem" }} onClick={() => deleteItem(dept._id)}>
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>                             
                        )) :  
                        <TableRow>
                            <TableCell>
                                <h1>No departments added yet</h1>
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
