import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/store/authStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";

function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    console.log(error)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(registerUser(userData)).unwrap();
            toast.success(response.message || "User registered successfully");
            navigate("/login");

        } catch (errorMessage) {
            toast.error(errorMessage || "Something went wrong while registering user");
        }
    };




    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm ">
                <CardHeader className="text-center">
                    <CardTitle> Register your account</CardTitle>
                    <CardDescription>
                        Enter your details to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleOnChange}
                                    required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        onClick={(e) => handleRegister(e)}
                        type="submit" className="w-full bg-[#27ae60] hover:bg-[#12984a] cursor-pointer transition duration-500 ease-in-out">
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    <CardAction>
                        Already have an account?
                        <Link to={"/login"}>
                            <Button variant="link" className="cursor-pointer">Login</Button>
                        </Link>
                    </CardAction>

                </CardFooter>
            </Card>
        </div>
    )
}
export default Register