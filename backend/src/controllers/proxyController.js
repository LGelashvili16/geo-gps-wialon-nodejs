// Logic for fetching from external API, processing, saving to DB

import { getAllItems, getSid } from "../services/apiService.js";

export const fetchDataAndSave = async (req, res, next) => {
  try {
    const eid = await getSid();
    const allItems = await getAllItems(eid);
  } catch (error) {
    next(error);
  }
};
