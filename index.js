import e from "express";
import connectedDB from "./server/db.js";
import userRoutes from "./routes/userRoutes.js";
import carsRoutes from "./routes/carsRoutes.js";
import dotenv from "dotenv";
dotenv.config();
connectedDB();

const app = e();
const port = process.env.PORT;

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", carsRoutes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
