import mongoose from "mongoose"
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)
export default Blog