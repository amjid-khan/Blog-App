import express, { urlencoded } from "express"
import path from "path"
import dotenv from "dotenv"
import router from "./routes/user.js"
import connectDB from "./DB/connectdb.js"
import cookieParser from "cookie-parser"
import checkForAuth from "./middlewares/auth.js"
import blogRouter from "./routes/blog.js"

const app = express()




dotenv.config()


app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(checkForAuth("token"))
app.use((req, res, next) => {
    res.locals.user = req.user;  // yeh line zaroori hai
    next();
});


app.use("/user", router)
app.use("/blog", blogRouter)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})

// connect mongodb
connectDB()
    .then(() => {
        console.log("MongoDB Connet successfully")
        app.listen(process.env.PORT, () => {
            console.log(`Server is ready on port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });