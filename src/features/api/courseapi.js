import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_API = "http://localhost:3000/api/v1/course/";

const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include', // send cookies
    }),
    endpoints: (builder) => ({
        CreateCourse: builder.mutation({
            query: ({ CourseTitle, Category }) => ({
                url: 'createcourse',
                method: 'POST',
                body: ({ CourseTitle, Category }),
            })
        }),
        coursecreatordetail:builder.query({
            query:(userId)=>({
                url:`coursecreatordetail/${userId}`
            })
        }),
        getCourses: builder.query({
            query: () => ({
                url: 'getallcourses',
                method: 'GET',
            })
        }),
        UpdateCourse: builder.mutation({
            query: ({ formdata, courseId }) => ({
                url: `/editcourse/${courseId}`,
                method: 'PUT',
                body: formdata,
            })
        }),
        GetCourseById: builder.query({
            query: (courseId) => ({
                url: `getcoursedetails/:${courseId}`
            })
        }),
        CreateLecture: builder.mutation({
            query: ({ formdata, courseId }) => ({
                url: `/admin/course/${courseId}/lecture`,
                method: 'post',
                body: formdata
            })
        }),
        GetAlllectures: builder.query({
            query: (courseId) => ({
                url: `/admin/course/${courseId}/getalllectures`
            })
        }),
        Removelecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'DELETE'
            })
        }),
        EditcourseLecture: builder.mutation({
            query: ({ isPreview,lectureTitle, videoinfo, courseId, lectureId }) => ({
                url: `/admin/course/${courseId}/lecture/${lectureId}`,
                method: 'post',
                body: { isPreview,lectureTitle, videoinfo },
            })
        }),
        Getcourselecture:builder.query({
            query:(lectureId)=>({
                url:`/course/${lectureId}`
            })
        }),
        Publishchange:builder.mutation({
            query:({courseId,query})=>({
                url:`/admin/course/${courseId}?publish=${query}`,
                method:'PATCH'
            })
        }),
        CourseProgress:builder.mutation({
            query:({courseId,lectureId})=>({
                url:`/courseprogress/${courseId}/${lectureId}`,
                method:'POST',
                 body: { courseId, lectureId },
            })
        }),
        getallpurchasedourse:builder.query({
            query:()=>({
                url:'/getallpurchasedcourse'
            })
        }),
        Getcp:builder.query({
            query:(courseId)=>({
                url:`courseprogress/${courseId}`
            })
        }),
        DeleteCourses:builder.mutation({
            query:(courseId)=>({
                url:`deletecourse/${courseId}`,
                method:'DELETE'
            })
        })
    }),
});

export const { useCreateCourseMutation,
    useDeleteCoursesMutation,
    useGetcpQuery,
    useCourseProgressMutation,
    usePublishchangeMutation,
    useGetCoursesQuery,
    useGetcourselectureQuery,
    useUpdateCourseMutation,
    useGetCourseByIdQuery,
    useGetAlllecturesQuery,
    useCreateLectureMutation,
    useEditcourseLectureMutation,
    useCoursecreatordetailQuery,
    useRemovelectureMutation } = courseApi;
export default courseApi;


