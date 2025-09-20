import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
// import api from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {

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

    const handleLogin = async (e) => {
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
        <div className="flex justify-center items-center min-h-[70vh]">
            <AuthForm onSubmit={handleLogin} isLogin />
        </div>
    );
}
