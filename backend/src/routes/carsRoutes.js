import express from "express";
import {
  changeNextIntervalKm,
  fetchDataAndSave,
  resetIntervalDistance,
} from "../controllers/carsController.js";

export const router = express.Router();

router.post("/cars", fetchDataAndSave);

router.post("/cars/reset-interval/:id", resetIntervalDistance);

router.post("/cars/change-interval/:id", changeNextIntervalKm);
