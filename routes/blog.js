import express from "express"
import multer from "multer"
import path from "path"
const blogRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/upload`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })


blogRouter.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

blogRouter.post("/add-new", upload.single("coverImage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/",)
})



export default blogRouter
