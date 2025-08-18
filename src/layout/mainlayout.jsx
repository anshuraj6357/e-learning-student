import React from 'react';

import { Outlet } from 'react-router-dom';
import { Search } from "../pages/student/search.jsx";
import { Courses } from "@/pages/student/courses";

export function MainLayout() {

 
    return (
        <div>
             <Search/>
           
            <div >

                <Courses /> 
                <Outlet />
            </div>

        </div>
    )
}