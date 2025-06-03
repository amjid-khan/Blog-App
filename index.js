import express, { urlencoded } from "express"
import path from "path"
import dotenv from "dotenv"
import router from "./routes/user.js"
import connectDB from "./DB/connectdb.js"
dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use("/user", router)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home")
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