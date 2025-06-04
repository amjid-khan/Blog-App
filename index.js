//  Import Required Modules
import express, { urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//  Import Local Files
import router from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import connectDB from "./DB/connectdb.js";
import checkForAuth from "./middlewares/auth.js";
import Blog from "./models/blog.js";

//  Initialize Express App
const app = express();

//  Load .env Configuration
dotenv.config();

//  Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

//  Auth Middleware (Custom)
app.use(checkForAuth("token"));

// Make Logged-in User Available in All EJS Templates
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//  Routes Setup
app.use("/user", router);
app.use("/blog", blogRouter);

// EJS Template Engine Configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//  Home Route
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

// Connect to MongoDB and Start Server
connectDB()
    .then(() => {
        console.log("MongoDB Connected Successfully");
        app.listen(process.env.PORT, () => {
            console.log(` Server is running on port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Database Connection Failed:", err);
    });
