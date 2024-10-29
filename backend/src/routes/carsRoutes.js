// Routes for API proxy functionality
import express from "express";
import { fetchDataAndSave } from "../controllers/carsController.js";

export const router = express.Router();

router.post("/cars", fetchDataAndSave);
