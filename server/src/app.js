import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// import middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// import all routes here
import userRoutes from "./routes/user.routes.js";
import sweetRoutes from "./routes/sweet.route.js";


// User all routes from here
app.use("/api/auth", userRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
