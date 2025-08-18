
import { BadgeInfo, Lock } from "lucide-react";
import { useEffect } from 'react'
import React from "react";
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BuyCourseButton } from "@/pages/admin/course/buycoursebutton";
import { useCoursecreatordetailQuery, useGetCourseByIdQuery } from "@/features/api/courseapi";
import { useCheckcoursestatusQuery } from "@/features/api/purchaseapi";
import { useLoadUserQuery } from '@/features/api/authapi'


const CourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();



    const { data, isLoading, isError, refetch } = useGetCourseByIdQuery(courseId);


    const userId = data?.course?.Createdby
    const { data: userdata } = useCoursecreatordetailQuery(userId);

    const { data: purchasecoursedatacheck, isSuccess: purchasestatus } = useCheckcoursestatusQuery(courseId)

    console.log(purchasecoursedatacheck)

    useEffect(() => { refetch() }, [])

    const { data: userdatacheck} = useLoadUserQuery();
    console.log("user data", userdatacheck)
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load course details.</p>;



    return (
        <div className="space-y-5">
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">{data?.course?.CourseTitle}</h1>
                    <p className="text-base md:text-lg">{data?.course?.CourseSubtitle}</p>
                    <p>
                        Created By{" "}
                        <span className="text-[#C0C4FC] underline italic">
                            {userdata?.userdetail?.username}
                        </span>
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={"16"} />
                        <p>Last updated </p>
                    </div>
                </div>


            </div>

            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
                    <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: data?.course?.Description }}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-bold text-lg md:text-2xl">
                                Course Content
                            </CardTitle>
                            <CardDescription>
                                {data?.course?.Lectures.length}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data?.course?.Lectures?.length > 0 ? (
                                data.course.Lectures.map((lecture) => (
                                    <div
                                        key={lecture._id}
                                        className="flex flex-col items-start gap-2 p-2 hover:bg-gray-100 rounded-md transition duration-200"
                                    >
                                        {lecture.isPreview ? (
                                            <>
                                                <video
                                                    width="100%"
                                                    height="auto"
                                                    controls
                                                    className="rounded-md shadow-sm"
                                                >
                                                    <source src={lecture.videoUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <p className="text-gray-800 font-semibold text-sm md:text-base truncate">
                                                    {lecture.lectureTitle}
                                                </p>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition duration-200">
                                                <Lock size={16} className="text-gray-500" />
                                                <p className="text-gray-800 font-semibold text-sm md:text-base truncate">
                                                    {lecture.lectureTitle}
                                                </p>
                                            </div>



                                        )}


                                    </div>
                                ))
                            ) : (
                                <p>No lectures available.</p>
                            )}

                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card className="max-w-full mx-auto border rounded-lg shadow-lg">
                        <CardContent className="p-4 flex flex-col">

                            <div className="w-full h-48 md:h-64 mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={data?.course?.CourseThumbnail}
                                    alt={data?.course?.CourseTitle}
                                    className="w-full h-full object-cover"
                                />

                            </div>
                            <h1 className="text-lg md:text-xl font-semibold">{data?.course?.CoursePrice}₹</h1>
                            <div>

                            </div>
                        </CardContent>


                        <CardFooter className="flex justify-center p-4">
                            {
                                userdatacheck?.profile?.enrolledcourses.length>0 && userdatacheck?.profile?.enrolledcourses.some((data)=>data?._id===`${courseId}`) ? (
                                    <>
                                        <Button onClick={() => navigate(`/course-progress/${courseId}`)}> start learning</Button>
                                    </>
                                ) :
                                    <BuyCourseButton courseId={courseId} />
                            }

                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default CourseDetails;


