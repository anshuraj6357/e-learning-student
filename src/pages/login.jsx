import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authapi";

export function Login() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [createformdata, setcreateformdata] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    Role: "",
  });

  const getselectedValue = (value) => {
    setcreateformdata((prev) => ({
      ...prev,
      Role: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setcreateformdata({ ...createformdata, [name]: value });
  };

  const [loginUser, { isLoading: loginloading, isSuccess, error }] =
    useLoginUserMutation();
  const [
    registerUser,
    { isLoading: registerloading, isSuccess: registersuccess },
  ] = useRegisterUserMutation();

  const handleLoginSubmit = async () => {
    try {
      await loginUser(formdata).unwrap();
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error?.data?.message || error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      navigate("/");
    } else if (error) {
      toast.error(error?.data?.message || "Login failed");
    }
    if (registersuccess) {
      toast.success("Register successful");
      navigate("/");
    }
  }, [isSuccess, registersuccess, error]);

  const handleSignupSubmit = async () => {
    try {
      registerUser(createformdata).unwrap();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email and password to sign in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formdata.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formdata.password}
                    onChange={handleLoginChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLoginSubmit} className="w-full">
                  {loginloading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account by filling in the fields below.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    value={createformdata.username}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={createformdata.email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={createformdata.password}
                    onChange={handleSignupChange}
                  />
                </div>
                <Select onValueChange={getselectedValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid gap-3">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    name="phonenumber"
                    type="text"
                    placeholder="9876543210"
                    value={createformdata.phonenumber}
                    onChange={handleSignupChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSignupSubmit} className="w-full">
                  {registerloading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
