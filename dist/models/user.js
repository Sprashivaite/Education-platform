import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    grantedClassAccess: [{ type: mongoose.Types.ObjectId, ref: "Class" }],
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next(null);
    }
    catch (err) {
        next(err);
    }
});
const User = mongoose.model("User", userSchema);
export default User;
