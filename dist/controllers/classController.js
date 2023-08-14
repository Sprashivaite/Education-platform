import mongoose from "mongoose";
import User from "../models/user.js";
import Class from "../models/classModel.js";
export const grantAccessToClass = async (req, res) => {
    const { classId } = req.params;
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Convert the classId to ObjectId
        const objectIdClassId = new mongoose.Types.ObjectId(classId);
        // Check if the classId is already granted to the user
        if (user.grantedClassAccess.includes(objectIdClassId)) {
            return res
                .status(409)
                .json({ message: "Class already granted to the user." });
        }
        user.grantedClassAccess.push(objectIdClassId);
        await user.save();
        return res.status(200).json({ message: "Access granted successfully." });
    }
    catch (error) {
        console.error("Error granting access:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
export const addLinkToClass = async (req, res) => {
    const { classId } = req.params;
    const { link } = req.body;
    try {
        const updatedClass = await Class.findByIdAndUpdate(classId, { $push: { usefulLinks: link } }, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: "Class not found." });
        }
        return res
            .status(200)
            .json({ message: "Link added successfully.", class: updatedClass });
    }
    catch (error) {
        console.error("Error adding link:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
export const addLinkToFile = async (req, res) => {
    const { classId } = req.params;
    const { title, url } = req.body;
    try {
        const updatedClass = await Class.findByIdAndUpdate(classId, { $push: { usefulLinks: { title, url, isFile: true } } }, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: "Class not found." });
        }
        return res
            .status(200)
            .json({ message: "File link added successfully.", class: updatedClass });
    }
    catch (error) {
        console.error("Error adding file link:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
