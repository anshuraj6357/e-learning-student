import React from 'react';
import { NewSkeleton } from '@/pages/structure/skeleton'
import { CourseCard } from '@/pages/structure/courseskeleton'



export function MyLearning() {
    const isloadings = false;
    const mylearningcourses = [];
    return (
        <div>
            <div> My Learning </div>
            <div>
                {
                    isloadings ?
                        <NewSkeleton /> :
                        mylearningcourses.length == 0 ?
                            (
                                <p> you are not enrolled in any of the courses</p>
                            ) :
                            (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    {mylearningcourses.map((course, index) => (
                                        <CourseCard
                                            key={index}
                                            image={course.image}
                                            name={course.name}
                                            description={course.description}
                                            price={course.price}
                                            authorname={course.authorname}
                                            level={course.level}
                                        />
                                    ))}
                                </div>
                            )}


            </div>

        </div>
    )
}