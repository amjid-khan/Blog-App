import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto"
import { createToken } from "../services/authentication.js"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")
    this.salt = salt;
    this.password = hashedPassword
    next()
})

userSchema.statics.matchPasswordGeneratetoken = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");
    const hashedPassword = createHmac("sha256", user.salt).update(password).digest("hex");
    if (hashedPassword !== user.password) throw new Error("Incorrect Password");
    const token = createToken(user)
    return token;
};

const User = mongoose.model("User", userSchema)

export default User