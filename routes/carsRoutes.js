import e from "express";
import { cars, findCar } from "../controllers/carsController.js";
const router = e.Router();

router.get("/", cars);
router.get("/:carId", findCar)

export default router;
