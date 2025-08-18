import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select";
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useCreateCourseMutation } from '@/features/api/courseapi'
export function Addcourses() {
    const [CourseTitle, setCoursetitle] = useState('');
    const [Category, setcategory] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate()
    const [CreateCourse, { data, isLoading: createcourseisloading, isSuccess }, error] = useCreateCourseMutation();
    const changehandler = async (e) => {
        e.preventDefault();
        console.log("coursetitle", CourseTitle)
        console.log("category", Category)
        try {
            const result = await CreateCourse({ CourseTitle, Category });
            console.log("your uploaded course", result)
        } catch (error) {
            console.log("error in getting course upload ", error)
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "success")
            navigate('/admin/course')
        } else if (error) {
            toast.error(data?.message || error || "please try again");
        }

    }, [isSuccess, data])




    const getselectedValue = (value) => {
        setcategory(value)
    }
    return (
        <div className="flex justify-center mt-12">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Let's Add a Course
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Add some basic details for your course below.
                    </p>
                </div>
                <form onSubmit={changehandler}>
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                                Course Title
                            </label>
                            <input
                                type="text"
                                name="CourseTitle"
                                value={CourseTitle}
                                onChange={(e) => setCoursetitle(e.target.value)}
                                placeholder="Enter the course title here"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                                Category
                            </label>
                            <Select onValueChange={getselectedValue}>
                                <SelectTrigger className="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next-Js">Next.js</SelectItem>
                                        <SelectItem value="React-Js">React.js</SelectItem>
                                        <SelectItem value="Backend-Developer">Backend Developer</SelectItem>
                                        <SelectItem value="Node-Js">Node.js</SelectItem>
                                        <SelectItem value="Express-Js">Express.js</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                                        <SelectItem value="HTML-CSS">HTML & CSS</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Django">Django</SelectItem>
                                        <SelectItem value="Flask">Flask</SelectItem>
                                        <SelectItem value="Machine-Learning">Machine Learning</SelectItem>
                                        <SelectItem value="Data-Science">Data Science</SelectItem>
                                        <SelectItem value="AWS">AWS</SelectItem>
                                        <SelectItem value="DevOps">DevOps</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                                {
                                    createcourseisloading ?
                                        (
                                            <>
                                                <Loader2 className="animate-spin mr-2 h-4 w-4" >please wait</Loader2>

                                            </>
                                        )
                                        :
                                        "  Add Course"

                                }

                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}
