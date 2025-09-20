import axios from "axios";
import { StorageKeys } from "@/utils/constant";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN)

                if (!refreshToken) {
                    localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
                    window.location.href = "/login"
                    return Promise.reject(error)
                }

                const response = await axios.post(
                    `${API_URL}/auth/refresh-token`,
                    { refreshToken },
                    {
                        withCredentials: true
                    }
                )

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

                originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
                return axiosInstance(originalRequest)


            } catch (error) {
                localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
                localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
                window.location.href = "/login";

                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;