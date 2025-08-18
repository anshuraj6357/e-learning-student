import { Button } from "../src/components/ui/button";
import { Login } from "../src/pages/login.jsx";
import { Navbar } from "./pages/navbar";
// import { Search } from "./pages/student/search.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MyLearning } from "@/pages/student/mylearning"
import { EditProfile } from '@/pages/student/editprofile'
import { Sidebar } from '@/pages/admin/sidebar'
import { Dashboard } from '@/pages/admin/dashboard'
import { Addcourses } from '@/pages/admin/course/addcourse'
import { Coursetable } from '@/pages/admin/course/coursetble';
import { CourseTab } from '@/pages/admin/course/coursestab';
import { Addlectures } from '@/pages/admin/lecture/addlectures';
import { Editlecture } from '@/pages/admin/lecture/editlecture';
import CourseDetails from '@/pages/admin/course/coursedetail';
import { CourseProgress } from '@/pages/admin/course/courseprogress';
import { Footer } from '@/pages/footer';
import { Protectedroutes,Adminauthenticated } from './protectedroute'
function App() {





  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainLayout />} ></Route>
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/editprofile" element={<Protectedroutes><EditProfile /></Protectedroutes>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/mylearning" element={  <Protectedroutes> <MyLearning /></Protectedroutes>    }></Route>

          <Route path="/admin" element={         
            <Adminauthenticated>  <Sidebar /></Adminauthenticated>
          }
            
            >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="course" element={ <Coursetable /> } />
            <Route path='addcourses' element={<Addcourses />} />

          </Route>
          <Route path='/coursetab' element={
            <Adminauthenticated>  <Sidebar /></Adminauthenticated>  
            
          }></Route>
          <Route path='/admin/course/:courseId' element={<CourseTab />}></Route>
          <Route path="/admin/course/:courseId/lectures" element={<Addlectures />} />

          <Route path="/admin/course/:courseId/lecture/:lectureId" element={<Editlecture />} />
          <Route path='/course-details/:courseId' element={
            <Protectedroutes> <CourseDetails /></Protectedroutes>
           }></Route>
          <Route path='/course-progress/:courseId' element={    <Protectedroutes><CourseProgress /></Protectedroutes>}></Route>
        </Routes>



        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
