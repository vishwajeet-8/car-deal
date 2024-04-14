import e from "express";
import { cars } from "../controllers/carsController.js";
const router = e.Router();

router.get("/cars", cars);

export default router;
