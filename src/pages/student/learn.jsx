import React from 'react';

import { CourseCard } from '@/pages/structure/coursecard'

import { useLoadUserQuery } from '@/features/api/authapi'

export function MyLearning() {


    const { data } = useLoadUserQuery();

    console.log("data", data?.profile?.enrolledcourses)
    return (
        <div>
            <div> My Learning </div>
            <div>
                {data?.profile?.enrolledcourses?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {data?.profile?.enrolledcourses?.map((courseidx, index) => (
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
                        ))}
                    </div>
                ) : <p> you are not enrolled in any of the courses</p>
                }


            </div>

        </div>
    )
}