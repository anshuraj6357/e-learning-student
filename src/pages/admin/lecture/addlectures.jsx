import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lectures } from '@/pages/admin/lecture/uploadedlecture'
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLectureMutation, useGetAlllecturesQuery } from '@/features/api/courseapi';
import { useEffect } from 'react'
export function Addlectures() {
    const [lectureTitle, setLectureTitle] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { data: loadlecturedata, isLoading: lectureloading, refetch } = useGetAlllecturesQuery(courseId);
    const [CreateLecture, { data: uploadlectures, isLoading, isSuccess, error }] = useCreateLectureMutation();
    console.log("loadlecturedata", loadlecturedata);





    useEffect(() => {
        refetch();
    }, [])

    useEffect(() => {

        if (isSuccess) {
            refetch();
            toast.success(uploadlectures?.message || 'Uploaded Successfully');

        } else if (error) {
            toast.error(uploadlectures?.message || 'failed to uload');
        }

    }, [isSuccess, error])


    const changeHandler = async (e) => {
        e.preventDefault();
        console.log("Lecture Title:", lectureTitle);
        CreateLecture({ formdata: { lectureTitle }, courseId });

    };


    return (
        <div className="max-w-4xl mx-auto my-8">
            <Card className="rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                {/* Header */}
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6">
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Add New Lecture
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter the lecture title and details below.
                        </CardDescription>
                    </div>
                </CardHeader>

             
                <CardContent className="p-6 space-y-6">
                    <form onSubmit={changeHandler} className="space-y-6">
                        {/* Lecture Title */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-gray-700">
                                Lecture Title
                            </label>
                            <input
                                type="text"
                                name="lectureTitle"
                                id="lectureTitle"
                                placeholder="Enter the lecture title here"
                                value={lectureTitle}
                                onChange={(e) => setLectureTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>

                   
                        <div className="flex justify-between items-center">
                       
                            <Button
                                type="button"
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                                onClick={() => navigate(`/admin/course/${courseId}`)}
                            >
                                Back to Course
                            </Button>

                         
                            <Button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" />
                                ) : (
                                    "Create Lecture"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div>
                {
                    lectureloading ? (
                        <p>Page is Loading</p>
                    ) : (loadlecturedata.length == 0) ?
                        (
                            <>
                                <p>not uploaded any lectures</p>
                            </>
                        ) : (
                            loadlecturedata?.Lectures.map((lecture, index) => (
                                <>
                                    <Lectures key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                                </>
                            ))
                        )}

            </div>
        </div>
    );
}
