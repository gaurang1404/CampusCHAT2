import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavBar } from '../shared/NavBar'
import { AdminDepartments } from './AdminDepartments'
import { AdminSemesters } from './AdminSemesters'
import { AdminCourses } from './AdminCourses'
import { AdminSections } from "./AdminSections"
import { AdminPeople } from './AdminPeople'

export default function AdminDashboard() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4 space-y-8 max-w-7xl mt-4" >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">College Admin Dashboard</h1>
        </header>

        <Tabs defaultValue="departments" className="space-y-4 ">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>

          <TabsContent value="departments">
            <AdminDepartments />
          </TabsContent>

          <TabsContent value="semesters">
            <AdminSemesters />
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>

          <TabsContent value="sections">
            <AdminSections />
          </TabsContent>

          <TabsContent value="people">
            <AdminPeople />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}