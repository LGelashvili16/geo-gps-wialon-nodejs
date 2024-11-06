// Routes for API proxy functionality
import express from "express";
import {
  fetchDataAndSave,
  resetIntervalDistance,
} from "../controllers/carsController.js";

export const router = express.Router();

router.post("/cars", fetchDataAndSave);

router.post("/cars/:id", resetIntervalDistance);
