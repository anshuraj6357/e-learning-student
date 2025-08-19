
import { CourseCard } from '@/pages/structure/coursecard';
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authapi";

export function EditProfile() {
  const [formdata, setformdata] = useState({
    username: "",
    photourl: null,
  });


  const { data: newdata, isLoading, refetch } = useLoadUserQuery();

  const [
    UpdateUser,
    { data: userdata, isLoading: userisLoading, error, isSuccess },
  ] = useUpdateUserMutation();

  const changeinputhandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };


  const ChangefileHandler = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setformdata({
        ...formdata,
        photourl: file,
      });
    }
  };

  const UpdateUSerHandler = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("username", formdata.username);
    if (formdata.photourl) {
      dataToSend.append("photourl", formdata.photourl);
    }

    UpdateUser(dataToSend);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      refetch();
    }
    if (error) {
      toast.error("Profile update failed");
    }
  }, [newdata, error,refetch, isSuccess]);



  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 my-24">

      <h1 className="font-extrabold text-4xl text-center md:text-left mb-16 text-gray-900 dark:text-white tracking-tight">
        Profile
      </h1>


      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">

        <div className="flex justify-center md:justify-start">
          <Avatar className="h-36 w-36 md:h-44 md:w-44 ring-4 ring-indigo-500 shadow-md">
            <AvatarImage
              src={newdata?.profile?.photourl || "https://github.com/shadcn.png"}
              alt={newdata?.profile?.username || "profile"}
            />
            <AvatarFallback className="bg-indigo-500 text-white text-2xl font-bold">
              {newdata?.profile?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col space-y-8 w-full max-w-lg">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Name:</h2>
            <p className="text-base text-gray-700 dark:text-gray-400 ml-4">
              {newdata?.profile?.username || "Loading..."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Email:</h2>
            <p className="text-base text-gray-700 dark:text-gray-400 ml-4">
              {newdata?.profile?.email || "Loading..."}
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition-all">
                Edit Profile
              </Button>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[450px] rounded-2xl p-6">
              <form onSubmit={UpdateUSerHandler} encType="multipart/form-data">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your profile details. Click save when done.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 mt-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input
                      id="name-1"
                      name="username"
                      value={formdata.username}
                      onChange={changeinputhandler}
                      disabled={userisLoading}
                      required
                      className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="photourl-1">Profile Photo</Label>
                    <Input
                      id="photourl-1"
                      type="file"
                      name="photourl"
                      accept="image/*"
                      onChange={ChangefileHandler}
                      disabled={userisLoading}
                      className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      disabled={userisLoading}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    disabled={userisLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
                  >
                    {userisLoading ? (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>


      <div className="w-full mt-20">
        <h1 className="font-bold text-3xl mb-8 text-gray-900 dark:text-white">
          Courses You’re Enrolled In
        </h1>

        {newdata?.enrolledcourses?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {newdata?.profile?.enrolledcourses?.map((course, index) => (
              <CourseCard
                key={course._id || index}
                courseId={course._id}
                image={course.CourseThumbnail}
                description={course.Description}
                price={course.CoursePrice}
                coursename={course.CourseTitle}
                level={course.CourseLevel}
                className="w-full rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
