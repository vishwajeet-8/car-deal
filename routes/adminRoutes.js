import e from "express";
import { adminLogin, adminSignup } from "../controllers/adminController.js";
import { addCars } from "../controllers/carsController.js";
import verifyToken from "../middleware/authMiddleware.js";
const router = e.Router();

router.post("/signup", adminSignup);
router.get("/login", adminLogin);
router.post("/addCars",verifyToken, addCars);

export default router;
