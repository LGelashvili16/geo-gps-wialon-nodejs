// Logic for fetching from external API, processing, saving to DB

import { getAllItems, getSid } from "../services/apiService.js";

export const fetchDataAndSave = async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const eid = await getSid();
    const allItems = await getAllItems(eid);
    res.status(200).json(allItems.items);
  } catch (error) {
    next(error);
  }
};
