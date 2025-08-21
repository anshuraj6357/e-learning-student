import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
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
import { userLoggedout } from "@/features/authSlice";

export function Navbar() {
  const [photourl, setPhotourl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((store) => store.auth);

  const { data: userdata } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    if (userdata?.profile?.photourl) {
      setPhotourl(userdata.profile.photourl);
    }
  }, [userdata]);

  const logoutEventHandler = async () => {
    try {
      await logoutUser();
      dispatch(userLoggedout());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <nav className="w-full border-b bg-blue-500 text-black dark:bg-gray-900 dark:text-white shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">E-learning</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      userdata?.profile?.photourl ||
                      photourl ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile"
                  />
                  <AvatarFallback>
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <Link to="/editprofile">My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/mylearning">My Learning</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                {userdata?.profile?.Role === "Teacher" && (
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={logoutEventHandler}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-1" />
              <Link to="/login">Login</Link>
            </Button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <Link to="/login">Login</Link>
            </Button>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <Avatar>
                      <AvatarImage
                        src={
                          userdata?.profile?.photourl ||
                          photourl ||
                          "https://github.com/shadcn.png"
                        }
                        alt="profile"
                      />
                      <AvatarFallback>
                        {user?.username?.[0]?.toUpperCase() || "U"}
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
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  {userdata?.profile?.Role === "Teacher" && (
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={logoutEventHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DarkMode />
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown (links below navbar) */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800 px-4 py-3 space-y-2">
          <Link to="/" className="block text-white">
            Home
          </Link>
          <Link to="/mylearning" className="block text-white">
            My Learning
          </Link>
          {userdata?.profile?.Role === "Teacher" && (
            <Link to="/admin/dashboard" className="block text-white">
              Dashboard
            </Link>
          )}
          <button
            onClick={logoutEventHandler}
            className="block w-full text-left text-red-300"
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
