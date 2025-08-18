// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { DarkMode } from "../pages/darkmode";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import { useLogoutUserMutation, useLoadUserQuery } from "@/features/api/authapi";

export function Navbar() {
  const [photourl, setPhotourl] = useState("");
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

  const { data: userdata, error } = useLoadUserQuery();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  console.log("userdata", userdata)

  console.log(error)

  const redirect = () => {
    console.log("click")

  }

  useEffect(() => {
    if (error) {

      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (parsedUser?.[0]?.photourl) {
      setPhotourl(parsedUser[0].photourl);
    }
  }, [parsedUser]);

  // ✅ Handle toast on logout
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout successful");
    }
  }, [isSuccess, data]);

  // ✅ Logout handler
  const logoutEventHandler = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login"; // full refresh ensures clean state
    } catch (error) {
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <nav className="w-full border-b bg-blue-500 text-black dark:bg-gray-900 dark:text-white shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">E-learning</div>

        {/* Authenticated / Non-authenticated */}
        {!isAuthenticated || !userdata?.success ? (
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            <Link to="/login">Login</Link>
          </Button>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={userdata?.profile?.photourl || photourl || "https://github.com/shadcn.png"}
                      alt="profile"
                    />
                    <AvatarFallback>
                      {parsedUser?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>
                  <Link to="/editprofile">My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/mylearning">My Learning</Link>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                {
                  userdata?.profile?.Role === "Teacher" && (
                    <DropdownMenuItem>
                      <Link to='/admin/dashboard'> Dashboard</Link>
                    </DropdownMenuItem>
                  )
                }

                <DropdownMenuItem onClick={logoutEventHandler}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DarkMode />
          </div>
        )}
      </div>
    </nav>
  );
}
