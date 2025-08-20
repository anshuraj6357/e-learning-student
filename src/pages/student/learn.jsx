import React from 'react';

import { CourseCard } from '@/pages/structure/coursecard'

import {useLoadUserQuery} from '@/features/api/authapi'

export function MyLearning() {


const {data} =useLoadUserQuery();

console.log("data",data?.profile?.enrolledcourses)





    const isloadings = false;
    return (
        <div>
            <div> My Learning </div>
            <div>
                {data?.profile?.enrolledcourses?.length>0 ?(
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    { data?.profile?.enrolledcourses?.map((course, index) => (
                                        <CourseCard
                                            key={index}
                                            image={course.CourseThumbnail}
                                            name={course.CourseSubtitle}
                                            description={course.Description}
                                            price={course.CoursePrice}
                                            authorname={course.authorname}
                                            level={course.CourseLevel}
                                        />
                                    ))}
                                </div>
                            ):<p> you are not enrolled in any of the courses</p>
                            }


            </div>

        </div>
    )
}