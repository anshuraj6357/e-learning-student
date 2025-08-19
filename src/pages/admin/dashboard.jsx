import React from 'react'
import { useFetchAllsoldedcoursesQuery } from '@/features/api/purchaseapi';
import {   useGetCoursesQuery } from '@/features/api/courseapi';
import { Users, ShoppingCart, DollarSign, BookOpen } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useEffect,useState} from 'react'
export function Dashboard() {
  const { data: fetcheddata,refetch:refetchsold } = useFetchAllsoldedcoursesQuery();
const {data:coursedata,refetch:refetchcourse}= useGetCoursesQuery();

  console.log(fetcheddata);
const [totalRevenue, setTotalRevenue] = useState(0);

useEffect(() => {
    refetchsold();
  refetchcourse();
  if (fetcheddata?.allpurchasedcourse) {
    const revenue = fetcheddata.allpurchasedcourse.reduce((acc, course) => {
      return acc + (course?.courseId?.CoursePrice || 0);
    }, 0);

    setTotalRevenue(revenue);
  }
}, [fetcheddata,refetchsold,refetchcourse]);



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <Card className="shadow-md rounded-2xl hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <ShoppingCart className="text-blue-500 w-6 h-6" />
            <CardTitle className="text-lg">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-800">{fetcheddata?.allpurchasedcourse?.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <DollarSign className="text-green-500 w-6 h-6" />
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-800">₹ {totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <Users className="text-purple-500 w-6 h-6" />
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-800">N/A</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="text-orange-500 w-6 h-6" />
            <CardTitle className="text-lg">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-gray-800">{coursedata?.course.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Recent Course Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption className="text-gray-500">
              A list of your most recent course purchases.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[120px] font-semibold text-gray-700">Price</TableHead>
                <TableHead className="font-semibold text-gray-700">Buyer ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Course Title</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetcheddata?.allpurchasedcourse?.length > 0 ? (
                fetcheddata.allpurchasedcourse.map((course, index) => (
                  <TableRow
                    key={course._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-800">
                      ₹ {course?.courseId?.CoursePrice || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {course?.userId || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-800 font-medium">
                      {course?.courseId?.CourseTitle || "N/A"}
                    </TableCell>
                    <TableCell className="text-right text-gray-600">
                      {course?.courseId?.Category || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                    No courses sold yet 🚀
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
