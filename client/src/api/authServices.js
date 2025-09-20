import axiosInstance from "@/api/axios";
import { StorageKeys } from "@/utils/constant";

const authService = {
    register: async (userdata) => {
        const response = await axiosInstance.post("/auth/register", userdata);
        return response.data;
    },

    login: async (credentials) => {
        const response = await axiosInstance.post("/auth/login", credentials);
        console.log("Login credentials : ", response.data.data)
        if (response.data?.data?.accessToken) {
            localStorage.setItem(
                StorageKeys.ACCESS_TOKEN,
                response.data.data.accessToken
            );
        }
        if (response.data?.data?.refreshToken) {
            localStorage.setItem(
                StorageKeys.REFRESH_TOKEN,
                response.data.data.accessToken
            );
        }

        if (response.data?.data?.user) {
            const { name, email } = response.data.data.user;
            const user = { name, email };
            localStorage.setItem(
                StorageKeys.USER,
                JSON.stringify(user)
            );
        }

        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post("/auth/logout", { withCredentials: true });
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(StorageKeys.USER);
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await axiosInstance.get("/auth/current-user");
        return response.data;
    },
};

export default authService;