import express from "express"
import User from "../models/user.model.js"
const router = express.Router()

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    const user = await User.matchPassword(email, password)
    console.log("User", user);
    return res.redirect("/")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})


export default router