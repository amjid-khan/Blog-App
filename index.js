import express from "express"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

app.set("view engine", "ejs")
app.set("view", path.resolve("./views"))

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server is ready on port : ${process.env.PORT}`)
})