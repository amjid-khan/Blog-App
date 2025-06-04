
const blogRouter = express.Router()

blogRouter.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

blogRouter.post("/add-new", (req, res) => {
    console.log(req.body)
    return res.redirect("/",)
})



export default blogRouter
