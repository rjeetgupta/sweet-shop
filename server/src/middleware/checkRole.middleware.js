import ApiError from "../utils/ApiError.js";

const isAdmin = (req, _, next) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only admins can perform this action");
    }
    next();
};

export default isAdmin;
