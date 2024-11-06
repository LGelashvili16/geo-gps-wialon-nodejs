import { PROXY_SERVER } from "../config/apiEndpoints";

export const fetchCars = async () => {
  const response = await fetch(`${PROXY_SERVER}/api/cars`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new error("Failed to fetch cars!");
  }

  const data = await response.json();

  return data;
};

export const resetInterval = async (id, coveredKilometers) => {
  const response = await fetch(`${PROXY_SERVER}/api/cars/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coveredKilometers,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to reset interval");
  }

  const data = await response.json();
  return data;
};
