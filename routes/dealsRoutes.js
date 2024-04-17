import e from "express";
import { addDeals, deals } from "../controllers/dealsController.js";

const router = e.Router();

router.post("/addDeals", addDeals);
router.get("/", deals);

export default router;
