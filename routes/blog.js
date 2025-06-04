import express from "express"
import multer from "multer"
import path from "path"
import Blog from "../models/blog.js"
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

// routes/blog.js

blogRouter.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    res.render("blog", {
        user: req.user,
        blog
    });
});


blogRouter.post("/add-new", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body
    const coverImageURL = `/upload/${req.file.filename}`;
    console.log("File path", coverImageURL);

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: coverImageURL
    })
    // return res.redirect("/")
    return res.redirect(`/blog/${blog._id}`)
})



export default blogRouter