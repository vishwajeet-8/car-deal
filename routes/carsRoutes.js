import e from "express";
import { addCars, cars } from "../controllers/carsController.js";
const router = e.Router();

router.post("/addCars", addCars);
router.get("/cars", cars);

export default router;