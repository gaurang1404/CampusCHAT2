import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const timeSlots = [
  { start: "8:55 AM", end: "9:50 AM" },
  { start: "9:50 AM", end: "10:45 AM" },
  { start: "10:45 AM", end: "11:15 AM", isBreak: true },
  { start: "11:15 AM", end: "12:10 PM" },
  { start: "12:10 PM", end: "1:05 PM" },
  { start: "1:05 PM", end: "2:00 PM", isBreak: true },
  { start: "2:00 PM", end: "2:55 PM" },
  { start: "2:55 PM", end: "3:50 PM" },
  { start: "3:50 PM", end: "4:45 PM" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Updated timetable data to ensure break after Biology Lab
const timetableData = {
  Monday: ["Math", "Physics", null, "Chemistry", "English", null, "Computer Science", "History", "PE"],
  Tuesday: [{ subject: "Biology Lab", span: 2 }, null, null,  "Geography", "Art", null, "Music", "English"],
  Wednesday: ["Chemistry", "English", null, { subject: "Physics Lab", span: 2 }, null, "Computer Science", "Math", "PE"],
  Thursday: [{ subject: "Chemistry Lab", span: 2 }, null, null, "Physics", "Math", null, "English", "History", "Geography"],
  Friday: ["Math", "Physics", null, "Chemistry", "Computer Science", null, { subject: "Project Work", span: 2 }, "English"],
};

export const Timetable = () => {    
  return (
    <div>
        <h1 className="text-2xl font-bold text-center mb-8 float-left"> Current Semester Timetable</h1>
        <TimeTableComponent/>

        <h1 className="text-2xl font-bold text-center mb-8 float-left"> Previous semester timetables</h1>
        <TimeTableComponent/>
    </div>    
  );
};

const TimeTableComponent = () => {
    return (
    <Card className=" pt-7 rounded-xl w-full max-w-7xl mx-auto overflow-x-auto shadow-xl mb-8">      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center bg-blue-100">Day</TableHead>
              {timeSlots.map((slot, index) => (
                <TableHead key={index} className={`text-center ${slot.isBreak ? 'bg-blue-100' : 'bg-blue-200'}`}>
                  {slot.start}<br />{slot.end}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day}>
                <TableCell className="font-medium bg-blue-200">{day}</TableCell>
                {timeSlots.map((_, index) => {
                  const subject = timetableData[day][index];

                  // Handle breaks
                  if (timeSlots[index].isBreak) {
                    return (
                      <TableCell key={index} className="text-center bg-blue-200">
                        {index === 2 ? 'Break' : 'Lunch'}
                      </TableCell>
                    );
                  }

                  // Check if subject is an object with a span
                  if (subject && typeof subject === "object" && subject.span === 2) {
                    if (index === 0 || index === 3 || index === 6 || index === 7) {
                      return (
                        <TableCell key={index} colSpan={2} className="text-center align-middle bg-blue-100">
                          {subject.subject}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={index} colSpan={2} className="text-center align-middle bg-red-100">
                          Error: Invalid 2-hour session start time
                        </TableCell>
                      );
                    }
                  }

                  if(subject == null){
                    return <></>
                  }

                  // Handle regular subjects with highlighting
                  return (
                    <TableCell key={index} className="text-center bg-blue-100">
                      {subject || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    )
}
