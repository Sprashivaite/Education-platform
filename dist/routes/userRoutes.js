import express from "express";
import { grantAccessToClass } from "../controllers/classController.js";
const router = express.Router();
// Grant access to a class for a user
// router.post(
//   "/:userId/grant-access/:classId",
//   async (req: Request, res: Response) => {
//     const { userId, classId } = req.params;
//     try {
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       user.grantedClassAccess.push(classId);
//       const updatedUser = await user.save();
//       return res.json(updatedUser);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Error granting access to the class for the user" });
//     }
//   }
// );
router.post("/:userId/grant-access/:classId", grantAccessToClass);
export default router;
