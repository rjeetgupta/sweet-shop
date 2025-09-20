import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm.jsx";
// import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector ((state) => state.auth);

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
        <div className="flex justify-center items-center min-h-[70vh]">
            <AuthForm onSubmit={handleRegister} isLogin={false} />
        </div>
    );
}
