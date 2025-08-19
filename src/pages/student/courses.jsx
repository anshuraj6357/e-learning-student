import { CourseCard } from '@/pages/structure/coursecard';

import { useGetCoursesQuery, useAllpublishedcoursesQuery, useSearchedcourseMutation } from '@/features/api/courseapi';



import { useState } from 'react'
export function Courses({ searchdatagot }) {


  const { data, isLoading, isSuccess, error, refetch } = useGetCoursesQuery();


  const { data: publisheddata, isLoading: publishedloading, isSuccess: publishedisSuccess, refetch: publishedrefetch } = useAllpublishedcoursesQuery();


  if (publishedloading) return <p>Course detail loading...</p>;


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
        My Courses
      </h2>

      <div className="w-full max-w-6xl">
        {isLoading ? (
          <h1>loading</h1>
        ) : (
          <div className="grid grid-cols-3 gap-6">


            {
            Array.isArray(searchdatagot) && searchdatagot.length > 0 ? (

                searchdatagot?.map((courseidx, index) => (
                  <CourseCard
                    courseId={courseidx._id || index}
                    image={courseidx.CourseThumbnail}
                    name={courseidx.Createdby.username}
                    description={courseidx.Description}
                    price={courseidx.CoursePrice}
                    coursename={courseidx.CourseTitle}
                    level={courseidx.CourseLevel}
                    className="w-full rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  />
                ))) :

                publisheddata && publisheddata?.published?.length > 0 ? (
                  publisheddata?.published?.map((courseidx, index) => (

                    <CourseCard
                      courseId={courseidx._id || index}
                      image={courseidx.CourseThumbnail}
                      name={courseidx.Createdby.username}
                      description={courseidx.Description}
                      price={courseidx.CoursePrice}
                      coursename={courseidx.CourseTitle}
                      level={courseidx.CourseLevel}
                      className="w-full rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    />
                  ))) : (
                  <p>No courses available.</p>
                )}
          </div>
        )}

      </div>
    </div>
  );
}
