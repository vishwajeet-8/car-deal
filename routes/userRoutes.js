import e from "express";
const router = e.Router();
import { userLogin, userSignup } from "../controllers/userController.js";

router.post("/signup", userSignup);
router.get("/login", userLogin);

export default router;
