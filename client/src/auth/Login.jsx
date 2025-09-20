import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
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
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "@/store/authStore";
import { toast } from "sonner"

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth)


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(userData)).unwrap();
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            toast.error(error || "Login failed");
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm ">
                <CardHeader className="text-center">
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
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
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={(e) => handleSubmit(e)} type="submit" className="w-full bg-[#27ae60] hover:bg-[#12984a] cursor-pointer transition duration-500 ease-in-out">
                        {loading ? "logging in..." : "Login"}
                    </Button>

                    <CardAction>
                        Don't have an account?
                        <Link to={"/register"}>
                            <Button variant="/login" className="cursor-pointer">Sign Up</Button>
                        </Link>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    )
}
export default Login