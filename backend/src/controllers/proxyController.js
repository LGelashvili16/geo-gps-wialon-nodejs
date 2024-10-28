// Logic for fetching from external API, processing, saving to DB

import { getAllItems, getSid } from "../services/apiService.js";

const eid = await getSid();

const allItems = await getAllItems(eid);

console.log(allItems);
