import React from 'react';
import { toast } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom';
import { Search } from "../pages/student/search.jsx";
import { Courses } from "@/pages/student/courses";
import { useEffect } from 'react'
export function MainLayout() {
    const location = useLocation();

    const searchdatagot = location?.state?.searchResults?.searchedcourse;

   
    useEffect(() => {
          if (Array.isArray(searchdatagot) && searchdatagot.length === 0) {
            toast.success("No course Found");
        }
    }, [searchdatagot]);


    return (
        <div>
            <Search />

            <div >

                <Courses searchdatagot={searchdatagot} />
                <Outlet />
            </div>

        </div>
    )
}