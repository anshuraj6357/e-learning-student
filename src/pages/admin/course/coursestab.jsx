import React from "react";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/pages/admin/course/textedit";
import { useUpdateCourseMutation, useGetCourseByIdQuery, usePublishchangeMutation,useDeleteCoursesMutation } from '@/features/api/courseapi'
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

export function CourseTab() {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    console.log("course id params", courseId)
    const { data: getcoursedata, refetch } = useGetCourseByIdQuery(courseId);
    const [getcoursedataloading, setgetcoursedataloading] = useState(false)
    const fetchedcourse = getcoursedata?.course
    const [Publishchange] = usePublishchangeMutation();
const [DeleteCourses]=useDeleteCoursesMutation();
    const [UpdateCourse, { data, isloading, isSuccess, error }] = useUpdateCourseMutation()

    const [formdata, setformdata] = useState({
        CourseTitle: '',
        CourseSubtitle: '',
        Description: '',
        Category: '',
        CourseLevel: '',
        CoursePrice: '',
        CourseThumbnail: '',
    })
    const [isPublished, setisPublished] = useState('false');
    const stripHtml = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

const removecoursedbyid=()=>{
    console.log("courseId",courseId)
     DeleteCourses(courseId)
navigate('/admin/course')
}


    useEffect(() => {
        if (fetchedcourse) {
            setformdata({
                CourseTitle: fetchedcourse?.CourseTitle,
                CourseSubtitle: fetchedcourse?.CourseSubtitle,
                Description: fetchedcourse?.Description,
                Category: fetchedcourse?.Category,
                CourseLevel: fetchedcourse?.CourseLevel,
                CoursePrice: fetchedcourse?.CoursePrice,
                CourseThumbnail: '',

            })

        }
    }, [getcoursedata])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformdata((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const changeHandler = async (e) => {
        e.preventDefault();
        console.log("Sending FormData:");

        const fd = new FormData();
        fd.append("CourseTitle", formdata.CourseTitle);
        fd.append("CourseSubtitle", formdata.CourseSubtitle);
        fd.append("Description", formdata.Description);
        fd.append("Category", formdata.Category);
        fd.append("CourseLevel", formdata.CourseLevel);
        fd.append("CoursePrice", formdata.CoursePrice);

        if (formdata.CourseThumbnail) {
            fd.append("CourseThumbnail", formdata.CourseThumbnail); // must match multer field name
        }

        console.log("Sending FormData:", isPublished);

        await UpdateCourse({ formdata: fd, courseId });

    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setformdata((prev) => ({
                ...prev,
                CourseThumbnail: file,
            }));
        }
    };
    const changepublish = async (action) => {
        try {
            setgetcoursedataloading(true);
            const result = await Publishchange({ courseId, query: action });
            console.log('result.data', result.data)
            if (result.data) {
                await refetch();
                setgetcoursedataloading(false);
                toast.success(result.data.message)

            }

        } catch (error) {
            toast.error("not published")

        }

    };




    const categoryvalue = (e) => {
        setformdata((prev) => ({
            ...prev,
            Category: e
        }))
    }

    const coursevalue = (e) => {
        setformdata((prev) => ({
            ...prev,
            CourseLevel: e
        }))
    }





    const inputClass =
        "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-400";

    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="max-w-3xl mx-auto my-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        {/* Title */}
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Basic Course Information
                        </CardTitle>

                        {/* Description */}
                        <CardDescription className="text-gray-600">
                            Make changes to your course here. Click publish when you are done.
                        </CardDescription>

                        {/* Navigation / Action */}
                        <div>
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                onClick={() => {
                                    navigate(`/admin/course/${courseId}/lectures`)
                                }}
                            >
                                Go to Lecture Page
                            </button>
                        </div>
                    </div>


                    <div className="flex gap-3 mt-4 sm:mt-0">
                        <Button
                            className={`px-4 py-2 ${getcoursedata?.course?.isPublished
                                ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                } rounded-lg shadow-sm transition-colors duration-200`}
                            onClick={() => changepublish(getcoursedata?.course?.isPublished ? "false" : "true")}

                        >{
                                getcoursedataloading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    </>
                                ) : getcoursedata?.course?.isPublished ? "Unpublish" : "Publish"}
                        </Button>





                        <Button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors duration-200" onClick={removecoursedbyid}>
                            Remove Course
                        </Button>
                    </div>
                </CardHeader>
                <form onSubmit={changeHandler} encType="multipart/form-data">
                    <CardContent className="p-6 text-gray-700 space-y-5">
                        {/* Course Title */}
                        <div>
                            <label className={labelClass}>Course Title</label>
                            <input
                                name="CourseTitle"
                                type="text"
                                value={formdata.CourseTitle}
                                onChange={handleInputChange}
                                placeholder="Enter the course title here"
                                className={inputClass}
                            />
                        </div>

                        {/* Sub Title */}
                        <div>
                            <label className={labelClass}>Sub Title</label>
                            <input
                                name="CourseSubtitle"
                                type="text"
                                value={formdata.CourseSubtitle}
                                onChange={handleInputChange}
                                placeholder="Enter the course sub-title here"
                                className={inputClass}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelClass}>Description</label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <TextEditor
                                    value={formdata.Description}
                                    onChange={(html) => {
                                        setformdata((prev) => ({
                                            ...prev,
                                            Description: stripHtml(html) // ✅ stores plain text
                                        }));
                                    }}
                                />



                            </div>
                        </div>

                        {/* Category & Level */}
                        <div className="flex flex-col sm:flex-row gap-5">
                            <div className="flex-1">
                                <label className={labelClass}>Category</label>
                                <Select onValueChange={categoryvalue}>
                                    <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <label className={labelClass}>Course Level</label>
                                <Select onValueChange={coursevalue}>
                                    <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Course Level</SelectLabel>
                                            <SelectItem value="Beginer">Beginner</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Advance">Advance</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className={labelClass}>Course Price (INR)</label>
                            <input
                                type="number"
                                name="CoursePrice"
                                value={formdata.CoursePrice}
                                onChange={handleInputChange}
                                placeholder="Enter course price"
                                className={inputClass}
                            />

                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className={labelClass}>Course Thumbnail</label>
                            <input
                                type="file"
                                name='CourseThumbnail'
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <Button>
                            {
                                isloading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" >please wait</Loader2></>

                                ) : "Submit"
                            }
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
