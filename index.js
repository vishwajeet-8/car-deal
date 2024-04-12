import e from "express";
import connectedDB from "./server/db.js";
import carRoutes from "./routes/carRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dealershipRoutes from "./routes/dealershipRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import dotenv from "dotenv";
dotenv.config();
connectedDB();

const app = e();
const port = process.env.PORT;

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dealerships", dealershipRoutes);
app.use("/api/deals", dealRoutes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
