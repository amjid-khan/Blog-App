import express from "express"
import User from "../models/user.model.js"
import { createToken } from "../services/authentication.js"
const router = express.Router()

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordGeneratetoken(email, password);
        return res.cookie("token", token).redirect("/");  // return se ensure karo yeh response last hai
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect email or password"
        });  // yeh bhi return ho jaye taake code yahan ruk jaye
    }
});

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    const newUser = await User.create({
        fullName,
        email,
        password
    });
    const token = createToken(newUser);
    return res.cookie("token", token).redirect("/");
});


router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})


export default router