import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from 'lucide-react';
import { setCollege } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINT } from '@/utils/const';
import { toast } from 'sonner';

export const AdminPeople = () => {
  
  const { loading, college } = useSelector(store => store.auth);

  // State for data
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [list, setList] = useState("Student");
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();
  // State for filters
  const [filters, setFilters] = useState({
    department: '',
    semester: '',
    section: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get(`${API_ENDPOINT}/student/getAll`, { withCredentials: true });
        if (studentsRes.data.success) {
          setStudents(studentsRes.data.students);          
          const facultyRes = await axios.get(`${API_ENDPOINT}/faculty/getAll`, { withCredentials: true });
          if (facultyRes.data.success) {
            setFaculty(facultyRes.data.faculties);
          } else {
            toast.error(facultyRes.data.message);
          }
        } else {
          toast.error(studentsRes.data.message);
        }

        // Ensure that college object is available before setting departments



        const generatedSemesters = [1, 2, 3, 4, 5, 6, 7, 8];

        setSemesters(generatedSemesters);
      } catch (error) {
        console.error("Error adding department:", error);
        toast.error("Failed to add department.");
      }
    };

    fetchData();
  }, []); // Add college as a dependency to re-run effect if it changes

  useEffect(() => {
    if (college && college.departments) {
      const depts = college.departments;
      setDepartments(depts);
    }
  }, [college])

  const filterData = (data) => {
    return data.filter(item => {
      const departmentMatch = !filters.department || item.departmentId.name === filters.department;
      const semesterMatch = !filters.semester || item.semester === filters.semester;
      const sectionMatch = !filters.section || item.section === filters.section;
      return departmentMatch && semesterMatch && sectionMatch;
    });
  };

  // Handle adding new person (student or faculty)
  const handleAddPerson = async (type) => {
    try {  

      if (type === 'student') {
        setStudents([...students, response.data]);
      } else {
        //! setAdding(true);

        try {
          
          const response = await axios.post(`${API_ENDPOINT}/registered-faculty/add`, newPerson, { withCredentials: true });
          console.log(response);
          
          if (response.data.success) {
            console.log("Hi");
            const college = response.data.college;
            dispatch(setCollege(college));
            
            const facultyRes = await axios.get(`${API_ENDPOINT}/faculty/getAll`, { withCredentials: true });
            if (facultyRes.data.success) {
              setFaculty(facultyRes.data.faculties);
            } else {
              toast.error(facultyRes.data.message);
            }
          } else {
            toast.error(response.data.message);
          }
          console.log("Hi");
        } catch (error) {
          console.error("Error adding faculty:", error);
          toast.error("Failed to add department.");
        }
      }

      setNewPerson({
        firstName: '',
        lastName: '',
        collegeEmail: '',
        departmentId: '',
        position: '',
      });

    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  // Handle deletion
  const handleDelete = async (id, type) => {
    try {
      const endpoint = type === 'student' ? `/student/${id}` : `/faculties/${id}`;
      await axios.delete(endpoint);

      if (type === 'student') {
        setStudents(students.filter(student => student.id !== id));
      } else {
        setFaculty(faculty.filter(member => member.id !== id));
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <Card style={{borderRadius: "1rem"}} className="w-max-7xl">
      <CardHeader>
        <CardTitle>People Management</CardTitle>
        <CardDescription>View students and faculty members across departments</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: "white" }}>

              {
                college && college.departments && college.departments.map((dept) => (
                  <SelectItem key={dept._id} value={dept.name}>{dept.name}</SelectItem>
                )
                )}
            </SelectContent >

          </Select>
          {
            list === "Student" ?
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, semester: value }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Semester" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: "white" }}>
                  {semesters.map((semester, i) => (
                    <SelectItem key={i} value={semester}>{semester}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              : null
          }
          {
            list === "Student" ?


              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, section: value }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Section" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: "white" }}>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((section, i) => (
                    <SelectItem key={i} value={section}>Section {section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              : null
          }
        </div>

        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger
              onClick={() => {
                setList("Student")
              }}
              value="students">Students</TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setList("Faculty")
              }}
              value="faculty">Faculty</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Section</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterData(students) && filterData(students).length > 0 ? filterData(students).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.firstName + " " + student.lastName}</TableCell>
                      <TableCell>{student.collegeEmail}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.section}</TableCell>                      
                    </TableRow>
                  ))
                  :
                  <TableRow className='min-w-full flex justify-center items-center'>
                    <h1 className='text-lg'>No students added yet</h1>
                  </TableRow>
                }
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          {/* Faculty Tab */}
          <TabsContent value="faculty">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterData(faculty) && filterData(faculty).length > 0 ? filterData(faculty).map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.firstName + " " + member.lastName}</TableCell>
                      <TableCell>{member.collegeEmail}</TableCell>
                      <TableCell>{member.departmentId.name}</TableCell>
                      <TableCell>{member.position}</TableCell>                     
                    </TableRow>
                  ))
                  :
                  <TableRow className='min-w-full flex justify-center items-center'>
                    <h1 className='text-lg'>No faculties added yet</h1>
                  </TableRow>
                }
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
