import e from "express";
import { userSignup } from "../controllers/userController.js";
const router = e.Router();

router.post("/signup", userSignup);

export default router;
