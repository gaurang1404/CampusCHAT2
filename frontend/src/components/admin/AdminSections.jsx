import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Pen, PenIcon, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { API_ENDPOINT } from "@/utils/const";
import { setCollege } from "@/redux/authSlice";
import { Update } from "@mui/icons-material";
import { DialogDescription } from "@radix-ui/react-dialog";

export const AdminSections = () => {
  const { loading, college } = useSelector((store) => store.auth);
  const [departments, setDepartments] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [loadingFaculties, setLoadingFaculties] = useState(false);

  // New state for course-faculty mappings per section
  const [sectionMappings, setSectionMappings] = useState([]);

  useEffect(() => {
    if (college) {
      setDepartments(college.departments);
    }
  }, [college]);

  // Function to fetch course-faculty mapping for a given section
  const fetchCourseFacultyMapping = async (sectionId) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/mapping/${sectionId}`, { withCredentials: true });
      if (response.data.success) {
        setSectionMappings((prevMappings) => [
          ...prevMappings.filter((mapping) => mapping.sectionId !== sectionId),
          ...response.data.mapping.map((item) => ({ ...item, sectionId })),
        ]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course-faculty mapping.");
    }
  };

  const addSection = async (semesterId) => {
    setAdding(true);
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/section/add`,
        { semesterId, name: newSection },
        { withCredentials: true }
      );
      if (response.data.success) {
        const clg = response.data.college;
        dispatch(setCollege(clg));
        setNewSection("");
        setDialogOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add section.");
    } finally {
      setAdding(false);
    }
  };

  const fetchFaculties = async (departmentId) => {
    setLoadingFaculties(true);
    try {
      const response = await axios.get(`${API_ENDPOINT}/faculty/get/${departmentId}`, { withCredentials: true });
      if (response.data.success) {
        setFaculties(response.data.faculties);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch faculties.");
    } finally {
      setLoadingFaculties(false);
    }
  };

  const updateFaculty = async (semesterId, sectionId, courseId, facultyId) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/course/course-faculty-assignment`,
        { semesterId, sectionId, courseId, facultyId },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Faculty updated successfully.");
        dispatch(setCollege(response.data.college));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update faculty.");
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}/section/delete/${sectionId}`, { withCredentials: true });
      if (response.data.success) {
        toast.success("Section deleted successfully.");
        dispatch(setCollege(response.data.college));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete section.");
    }
  };


  return (
    <Card style={{ borderRadius: "1rem" }} className="w-full max-w-7xl mx-auto rounded-2xl">
      <CardHeader>
        <CardTitle>Section Course Management</CardTitle>
        <CardDescription>Add, view, or remove courses offered by the college.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {departments ? departments.map((dept) => (
            <AccordionItem key={dept._id} value={dept._id}>
              <AccordionTrigger className="text-md">{dept.name}</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full pl-4">
                  {dept.currentSemesters && dept.currentSemesters.length > 0 ? dept.currentSemesters.map((semester) => (
                    <AccordionItem key={semester._id} value={`${dept._id}-${semester._id}`}>
                      <AccordionTrigger className="text-base font-medium">Semester {semester.number}</AccordionTrigger>
                      <AccordionContent>
                        <Accordion type="single" collapsible className="w-full pl-4">
                          {semester.sections.map((section) => (
                            <AccordionItem key={section._id} value={`${semester._id}-${section._id}`} onClick={() => fetchCourseFacultyMapping(section._id)}>
                              <AccordionTrigger className="text-sm font-medium">Section - {section.name}</AccordionTrigger>
                              <AccordionContent>
                                <div className="flex justify-end gap-4 mb-4">
                                  {/* Delete Section Button */}
                                  <Dialog>
                                    <DialogTrigger>
                                      <Button
                                        style={{ backgroundColor: "red", color: "white", borderRadius: "1rem" }}
                                        className="text-white rounded-lg"                                        
                                      >
                                        Delete Section
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent style={{backgroundColor: "white", borderRadius: "1rem"}}>
                                      <DialogHeader>
                                        <DialogTitle>Delete Section - {section.name}?</DialogTitle>
                                        <DialogDescription>This action cannot be reversed back, are you sure?</DialogDescription>
                                      </DialogHeader>                                      
                                      <DialogFooter>
                                        <Button
                                          onClick={() => deleteSection(section._id)}                                          
                                          style={{ backgroundColor: "red", color: "white", borderRadius: "1rem" }}
                                        >
                                          Delete Section
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                </div>
                                {sectionMappings.filter(mapping => mapping.sectionId === section._id).length > 0 ? (
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-1/4">Course Code</TableHead>
                                        <TableHead className="w-1/2">Course Name</TableHead>
                                        <TableHead className="w-1/4">Faculty</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>

                                      {sectionMappings.filter(mapping => mapping.sectionId === section._id).map((cf) => (
                                        <TableRow key={`${cf.courseId?._id}-${cf.facultyId?._id}`}>
                                          <TableCell className="font-medium">{cf.courseId?.code}</TableCell>
                                          <TableCell>{cf.courseId?.name}</TableCell>
                                          <TableCell>
                                            <Dialog>
                                              <DialogTrigger onClick={() => fetchFaculties(dept._id)}>
                                                <Button className="mb-4">
                                                  {cf.facultyId ? (
                                                    <div className="flex gap-2">
                                                      <Update /> <p>{cf.facultyId?.firstName} {cf.facultyId?.lastName}</p>
                                                    </div>
                                                  ) : (
                                                    "Add Faculty"
                                                  )}
                                                </Button>
                                              </DialogTrigger>
                                              <DialogContent style={{ borderRadius: "1rem" }} className="bg-white">
                                                <DialogHeader>
                                                  <DialogTitle>Select Faculty</DialogTitle>
                                                </DialogHeader>
                                                <div>
                                                  {/* Dropdown or Listbox for selecting faculty */}
                                                  <select
                                                    className="p-2 w-full"
                                                    value={selectedFaculty}
                                                    onChange={(e) => setSelectedFaculty(e.target.value)}
                                                  >
                                                    <option value="">Select Faculty</option>
                                                    {faculties.map((faculty) => (
                                                      <option key={faculty._id} value={faculty._id}>
                                                        {faculty.firstName} {faculty.lastName}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </div>
                                                <DialogFooter>
                                                  <Button
                                                    onClick={() => updateFaculty(semester._id, section._id, cf.courseId._id, selectedFaculty)}
                                                    disabled={!selectedFaculty}
                                                    style={{ backgroundColor: "blue", color: "white", borderRadius: "1rem" }}
                                                  >
                                                    Update Faculty
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
                                  <p>No courses added yet</p>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                          <div className="mt-4 flex justify-end">
                            <Dialog>
                              <DialogTrigger className="flex">
                                <Button className="flex items-left gap-2">
                                  <PlusCircle /> Add Section
                                </Button>
                              </DialogTrigger>
                              <DialogContent style={{ borderRadius: "1rem" }} className="bg-white">
                                <DialogHeader>
                                  <DialogTitle>Add New Section</DialogTitle>
                                  <input
                                    className="p-2 w-full"
                                    placeholder="Section Name"
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                  />
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    onClick={() => addSection(semester._id)}
                                    disabled={adding || !newSection}
                                    style={{ backgroundColor: "blue", color: "white", borderRadius: "1rem" }}
                                  >
                                    {adding ? "Adding..." : "Add Section"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  )) : (
                    <p>No Semesters</p>
                  )}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          )) : (
            <p>No Departments</p>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};
