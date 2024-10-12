import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

const performanceData = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 78 },
    { name: 'English', score: 92 },
    { name: 'History', score: 88 },
    { name: 'Art', score: 95 },
  ];

export const Discussion = () => {
    return (
        <div>
            <TabsContent value="discussions">
                <Card>
                    <CardHeader>
                        <CardTitle>Class Discussions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {performanceData.map((course) => (
                                <li key={course.name} className="flex justify-between items-center">
                                    <span>{course.name} Discussion Board</span>
                                    <Button variant="outline">Join Chat</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        </div>
    )
}
