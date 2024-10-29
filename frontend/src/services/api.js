export const fetchCars = async () => {
  const response = await fetch("http://localhost:3000/api/cars", {
    method: "POST",
  });

  const data = await response.json();

  return data;
};
