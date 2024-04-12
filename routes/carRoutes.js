import e from "express";
import { addCar, getAllCar } from "../controllers/carController.js";
const router = e.Router();

router.get("/", getAllCar);
router.post("/addCar", addCar);

export default router;
