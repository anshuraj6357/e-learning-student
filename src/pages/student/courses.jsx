import { CourseCard } from '@/pages/structure/courseskeleton';
import { NewSkeleton } from '@/pages/structure/skeleton';
import { useGetCoursesQuery  } from '@/features/api/courseapi';
import { useEffect } from 'react'
export function Courses() {
  const { data, isLoading, isSuccess, error, refetch } = useGetCoursesQuery();


  const publishedCourses = data?.course?.filter(course => course.isPublished) || [];



  useEffect(() => {
    refetch();
    if (!isSuccess) {
          localStorage.removeItem("user");
     console.log("success")
        localStorage.removeItem("token");

    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
        My Courses
      </h2>

      <div className="w-full max-w-6xl">
        {isLoading ? (
          <NewSkeleton />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {data && data?.course?.length > 0 ? (
              publishedCourses.map((courseidx, index) => (

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
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
