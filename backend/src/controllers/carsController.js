// Logic for fetching from external API, processing, saving to DB

import { getAllItems, getSid } from "../services/apiService.js";
import {
  addCarToCarsTable,
  addOilChangeRecord,
  carExists,
  getAllCarsWithHistory,
  updateTotalDistance,
  updateInitialDistance,
  getCarWithHistory,
} from "../services/dbService.js";

export const fetchDataAndSave = async (req, res, next) => {
  try {
    // res.setHeader("Access-Control-Allow-Origin", "*");

    const eid = await getSid();
    const allItems = await getAllItems(eid);

    for (const item of allItems.items) {
      const exists = await carExists(item.id);
      if (!exists) {
        await addCarToCarsTable(
          item.id,
          item.nm,
          item.uri,
          item.cnm_km,
          item.cnm_km
        );
      } else {
        await updateTotalDistance(item.id, item.cnm_km);
      }
    }

    const allCarsDb = await getAllCarsWithHistory();

    res.status(200).json(allCarsDb);
  } catch (error) {
    next(error);
  }
};

export const resetIntervalDistance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const fullYear = `${year}-${month}-${day}`;

    // console.log(id);
    // console.log(fullYear);
    // console.log(body);

    const updatedInitialDistance = await updateInitialDistance(
      id,
      body.coveredKilometers
    );

    const addRecord = await addOilChangeRecord(
      id,
      fullYear,
      body.coveredKilometers
    );

    const car = await getCarWithHistory(id);

    console.log(updatedInitialDistance);

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};
