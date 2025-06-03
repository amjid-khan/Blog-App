import express from "express"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home")
})


app.listen(process.env.PORT, () => {
    console.log(`Server is ready on port : ${process.env.PORT}`)
})