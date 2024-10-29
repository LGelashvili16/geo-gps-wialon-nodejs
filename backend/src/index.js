import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { router as carsRouter } from "./routes/carsRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", carsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
