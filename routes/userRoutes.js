import e from "express";
const router = e.Router();
import { userLogin, userSignup } from "../controllers/userController.js";

router.post("/users/signup", userSignup);
router.get("/users/login", userLogin);

export default router;
