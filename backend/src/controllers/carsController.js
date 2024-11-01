// Logic for fetching from external API, processing, saving to DB

import { getAllItems, getSid } from "../services/apiService.js";
import {
  addCarToCarsTable,
  carExists,
  getAllCarsWithHistory,
  updateTotalDistance,
} from "../services/dbService.js";

export const fetchDataAndSave = async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

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
