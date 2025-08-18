import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Lock, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useGetCourseByIdQuery, useCourseProgressMutation, useGetcpQuery } from '@/features/api/courseapi';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CourseProgress() {



    const { courseId } = useParams();
    const { data: lecturedata, refetch } = useGetCourseByIdQuery(courseId);
    const course = lecturedata?.course?.Lectures[0];
    const getcurrlecture = course?._id || lecturedata?.course?.Lectures[0]?._id

    console.log("currentLecture", getcurrlecture);

    const { data: useGetcpdata } = useGetcpQuery(courseId)
    console.log("dummy", useGetcpdata)
    const lecturestatus = useGetcpdata?.cp?.lectureProgress || []
    console.log("usegetcpdata", useGetcpdata?.cp?.lectureProgress)
    const [currentLecture, setCurrentLecture] = useState(getcurrlecture);
    const [openModules, setOpenModules] = useState('');



    const [CourseProgress] = useCourseProgressMutation();


    useEffect(() => {
        refetch()
        console.log("currentLecture", currentLecture);
    }, [])


    const toggleModule = (moduleId) => {
        setOpenModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };





    const completedVideo = (e) => {
        e.preventDefault();
        CourseProgress({ courseId, lectureId: currentLecture });
    };

    const completed = useGetcpdata?.cp?.completed;
    const percentProgress = useGetcpdata?.cp?.courseprogresscompleted || 0;
    console.log("completed", completed);
    console.log("percentProgress", percentProgress)
    if (!course) return <p>No lecture uploaded</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Link to="/courses" className="flex items-center gap-1 text-blue-600 hover:underline">
                            <ArrowLeft size={18} /> Back to Courses
                        </Link>
                        <h1 className="text-lg font-semibold">{course.CourseTitle}</h1>
                    </div>
                    <Button size="sm" className="flex items-center gap-2">
                        {completed ? (
                            <>
                                <CheckCircle size={16} /> Completed
                            </>
                        ) : (
                            <>
                                <PlayCircle size={16} /> Continue Learning
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Video & Info */}
                <div className="lg:col-span-2">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                        {currentLecture?.videoUrl ? (
                            <video
                                src={currentLecture.videoUrl}
                                controls
                                onEnded={completedVideo}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white font-bold">
                                <Lock size={40} className="text-gray-400" /> Video not uploaded
                            </div>
                        )}
                    </div>

                    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold">{currentLecture?.lectureTitle}</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            This is the description for {currentLecture?.lectureTitle}.
                        </p>
                    </div>
                </div>

                {/* Sidebar - Modules & Lectures */}
                <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg shadow-sm p-4">
                        <h2 className="text-lg font-semibold mb-4">Course Content</h2>

                        {lecturedata?.course?.Lectures?.length > 0 && lecturedata?.course?.Lectures.map((module) => (
                            <div key={module._id} className="mb-4">
                                <div className='flex items-center justify-between gap-2 mb-1'>
                                    {lecturestatus.some(
                                        lecture => lecture.lectureId === module._id && lecture.viewed
                                    ) ? (
                                        <CheckCircle size={16} className='text-green-500' />
                                    ) : (
                                        <PlayCircle size={16} className='text-blue-500' />
                                    )}

                                    <button
                                        onClick={() => toggleModule(module._id)}
                                        className="flex justify-between items-center w-full text-left text-gray-800 font-medium py-2"
                                    >
                                        <span>{module.lectureTitle}</span>
                                        {openModules.includes(module._id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                </div>

                                {openModules.includes(module._id) && (
                                    <div className="ml-4 space-y-2">
                                        <div
                                            onClick={() => setCurrentLecture(module)}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200
                                                ${currentLecture?._id === module._id
                                                    ? "bg-blue-50 border border-blue-300 shadow-inner"
                                                    : "hover:bg-gray-50 hover:shadow-sm"
                                                }`}
                                        >
                                            {module.isPreview ? (
                                                <PlayCircle size={16} className="text-blue-500" />
                                            ) : (
                                                <Lock size={16} className="text-gray-400" />
                                            )}
                                            <span className="text-gray-700 text-sm truncate">{module.lectureTitle}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Card */}
                <Card className="lg:col-span-3 mt-6">
                    <CardHeader>
                        <CardTitle>Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-700 font-medium">{percentProgress || 0}% course complete</p>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div
                                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${percentProgress}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
