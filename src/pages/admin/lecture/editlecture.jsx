import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/Switch";
import { Showlecture } from '@/pages/admin/lecture/showlecture'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEditcourseLectureMutation, useRemovelectureMutation, useGetcourselectureQuery } from '@/features/api/courseapi'



function ProgressBar({ progress }) {

    return (
        <div className="w-full md:w-1/2 mt-2">
            <div className="w-full bg-gray-200 rounded-lg h-3 overflow-hidden">
                <div
                    className="bg-blue-500 h-3 rounded-lg transition-all duration-200"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-sm text-gray-600 mt-1 block text-right">{progress}%</span>
        </div>
    );
}

export function Editlecture() {
    const navigate = useNavigate();


    const { courseId, lectureId } = useParams();
    const { data: dataGetcourselecture,refetch } = useGetcourselectureQuery(lectureId)
    const [Removelecture, { isSuccess, error }] = useRemovelectureMutation();
    const [EditcourseLecture, { isLoading,isSuccess:uploadsuccess }] = useEditcourseLectureMutation();
    const [lectureTitle, setLectureTitle] = useState("");
    const [videoinfo, setVideoFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [isPreview, setisPreview] = useState(false)
    console.log("dataGetcourselecture", dataGetcourselecture)

    const setisPreviewchecker = () => {
        setisPreview((prev) => !prev);
        console.log(isPreview);
    };
    console.log(isPreview);

    const changeRemoveleecture = (e) => {
        e.preventDefault();
        console.log(lectureId)
        console.log("trigger 1")
        Removelecture(lectureId);
    }


    useEffect(()=>{
        if(uploadsuccess){
              toast.success('uploaded Succes')
             refetch()
        }
       },[refetch,uploadsuccess])
    useEffect(() => {
        if (isSuccess) {
            console.log("trigger 2")
            toast.success('Removed Succes')
            navigate(`/admin/course/${courseId}/lectures`)
        }
    }, [isSuccess])

    // Handle file selection and upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;


        const formData = new FormData();
        formData.append("file", file);

        setMediaProgress(true);

        try {
            const res = await axios.post("http://localhost:3000/api/v1/uploadmedia/lecture/videoupload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    withcredentials: 'include'
                },
                withCredentials: true,
                onUploadProgress: ({ loaded, total }) => {
                    setUploadProgress(Math.round((loaded * 100) / total));
                },
            });
            console.log(res)
            if (res?.data?.success) {
                setVideoFile(res.data.uploadedfile);
                toast.success(res?.data?.message);
                setMediaProgress(false);
                setUploadProgress(0);
            }
        } catch (error) {
            console.error("Video upload failed:", error);
            toast.error("Video upload failed");
            setMediaProgress(false);
            setUploadProgress(0);
        }
    };

    const changeHandler = (e) => {
        e.preventDefault();
        console.log("Lecture Title:", lectureTitle);
        console.log("Selected Video File:", videoinfo);
        console.log("Is Free:", isPreview);
        EditcourseLecture({ isPreview, lectureTitle, videoinfo, courseId, lectureId })
    };
    console.log("ata ", dataGetcourselecture?.lecture)
    return (
        <div className="max-w-3xl mx-auto my-10">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Edit Lecture</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                            Make changes and click Save when done
                        </CardDescription>
                    </div>
                    <Button variant="destructive" className="mt-2 md:mt-0" onClick={changeRemoveleecture}>Remove Lecture</Button>
                </CardHeader>

                <form onSubmit={changeHandler} encType="multipart/form-data">
                    <CardContent className="space-y-6">

                        <div className="flex flex-col">
                            <label htmlFor="lectureTitle" className="mb-2 font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="lectureTitle"
                                id="lectureTitle"
                                value={lectureTitle}
                                onChange={(e) => setLectureTitle(e.target.value)}
                                placeholder="Enter the lecture title here"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>


                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-gray-700">Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="w-full md:w-1/2 text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>


                        {mediaProgress && <ProgressBar progress={uploadProgress} />}

                        <div className="pt-4">
                            <Switch checked={isPreview} onChange={setisPreviewchecker} label="Is this video free?" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button >
                            {
                                isLoading ?
                                    <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" /> :

                                    "  Upload Lecture"

                            }


                        </Button>
                    </CardFooter>
                </form>
            </Card>


            <div>
                {dataGetcourselecture?.lecture ? (
                    Array.isArray(dataGetcourselecture.lecture)
                        ? dataGetcourselecture.lecture.map((course, index) => (
                            <Showlecture
                                key={course._id || index}
                                title={course.lectureTitle}
                                videourl={course.videoUrl}
                                ispreview={course.isPreview}

                            />
                        ))
                        : (
                            <Showlecture
                                key={dataGetcourselecture.lecture._id}
                                title={dataGetcourselecture.lecture.lectureTitle}
                                videourl={dataGetcourselecture.lecture.videoUrl}
                                ispreview={dataGetcourselecture.lecture.isPreview}
                            />
                        )
                ) : (
                    <p>No lectures found</p>
                )}
            </div>




        </div>





    );
}
