import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCoursesQuery } from '@/features/api/courseapi'
import {Badge} from '@/components/ui/badge'
import { Edit, Trash } from "lucide-react";
import {useEffect} from 'react'

export function Coursetable() {


    const { data, isloading: dataloading, error: dataerror,refetch } = useGetCoursesQuery();
console.log(data?.course?.isPublish)
useEffect(() => {
  refetch(); // called once when component mounts
}, [refetch]);

    const navigate = useNavigate();


    function changePageHandler(e) {

        navigate('/admin/addcourses')

    }
    return (
        <div>

            <Button onClick={changePageHandler}>Create new course</Button>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.course?.map((course ,index) => (
                        <TableRow key={course._id || index}>
                            <TableCell className="font-medium">{course.CoursePrice || "N/A"}</TableCell>
                            <TableCell><Badge>{course.isPublished?"publish":"Draft"}</Badge></TableCell>
                            <TableCell>{course.CourseTitle || "N/A"}</TableCell>
                            <TableCell className="w-4 h-4 mr-1" onClick={()=>navigate(`${course._id }`)}><Edit/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}


















