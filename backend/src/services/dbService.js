import { dbPool } from "../config/db.js";

export const carExists = async (car_id) => {
  const query = `SELECT 1 FROM cars_tb WHERE car_id = ? LIMIT 1`;
  const [rows] = await dbPool.query(query, [car_id]);
  return rows.length > 0;
};

export const addCarToCarsTable = async (
  car_id,
  car_name,
  icon_url,
  initial_distance,
  total_distance = 0,
  next_oil_change_km = 10000
) => {
  const query = `
    INSERT INTO cars_tb (car_id, car_name, icon_url, initial_distance, total_distance, next_oil_change_km) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const queryArgs = [
    car_id,
    car_name,
    icon_url,
    initial_distance,
    total_distance,
    next_oil_change_km,
  ];

  try {
    const [dbResult] = await dbPool.query(query, queryArgs);
    console.log("Car added:", dbResult);
    return dbResult;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

// try {
//   const result = await addCarToCarsTable(15011, "WI 111 NG", 275250);
// } catch (error) {
//   console.error(error);
// }

export const addOilChangeRecord = async (
  car_id,
  oil_change_date,
  kilometers
) => {
  const car = await getCarWithHistory(car_id);

  if (car.initial_distance === car.total_distance) {
    throw new Error("Interval is already updated!");
    // return "Interval is already updated!";
  }

  const query = `
    INSERT INTO oil_change_history_tb (car_id, oil_change_date, kilometers) 
    VALUES (?, ?, ?)
  `;

  const queryArgs = [car_id, oil_change_date, kilometers];

  try {
    const [dbResult] = await dbPool.query(query, queryArgs);
    console.log("Record added:", dbResult);
    return dbResult;
  } catch (error) {
    console.error("Error adding oil change record:", error);
    throw error;
  }
};

// try {
//   const result = await addOilChangeRecord(15015, "2024-12-07", 293190);
// } catch (error) {
//   console.error(error);
// }

export const getAllCarsWithHistory = async () => {
  const query = `
    SELECT 
      c.car_id, 
      c.car_name, 
      c.initial_distance,
      c.total_distance, 
      c.next_oil_change_km,
      c.icon_url,
      c.last_reset_date,
      h.id AS oil_change_id, 
      h.oil_change_date, 
      h.kilometers
    FROM 
      cars_tb c
    LEFT JOIN 
      oil_change_history_tb h ON c.car_id = h.car_id
    ORDER BY 
      c.car_id, h.oil_change_date DESC;
  `;

  try {
    const [rows] = await dbPool.query(query);

    const cars = rows.reduce((acc, row) => {
      let car = acc.find((c) => c.car_id === row.car_id);

      if (!car) {
        car = {
          car_id: row.car_id,
          car_name: row.car_name,
          initial_distance: row.initial_distance,
          total_distance: row.total_distance,
          next_oil_change_km: row.next_oil_change_km,
          icon_url: row.icon_url,
          last_reset_date: row.last_reset_date,
          history: [],
        };
        acc.push(car);
      }

      if (row.oil_change_id) {
        car.history.push({
          oil_change_id: row.oil_change_id,
          oil_change_date: row.oil_change_date,
          kilometers: row.kilometers,
        });
      }

      return acc;
    }, []);

    return cars;
  } catch (error) {
    console.error("Error fetching cars with history:", error);
    throw error;
  }
};

// try {
//   const result = await getAllCarsWithHistory();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

export const getCarWithHistory = async (car_id) => {
  const query = `
    SELECT 
      c.car_id, 
      c.car_name,
      c.initial_distance, 
      c.total_distance, 
      c.next_oil_change_km, 
      c.icon_url,
      c.last_reset_date, 
      o.id AS oil_change_id, 
      o.oil_change_date, 
      o.kilometers
    FROM 
      cars_tb c
    LEFT JOIN 
      oil_change_history_tb o ON c.car_id = o.car_id
    WHERE 
      c.car_id = ?
    ORDER BY 
      o.oil_change_date DESC;
  `;

  try {
    const [rows] = await dbPool.query(query, [car_id]);

    if (rows.length === 0) {
      return null;
    }

    const car = {
      car_id: rows[0].car_id,
      car_name: rows[0].car_name,
      initial_distance: rows[0].initial_distance,
      total_distance: rows[0].total_distance,
      next_oil_change_km: rows[0].next_oil_change_km,
      icon_url: rows[0].icon_url,
      last_reset_date: rows[0].last_reset_date,
      history: rows
        .filter((row) => row.oil_change_id !== null)
        .map((row) => ({
          oil_change_id: row.oil_change_id,
          oil_change_date: row.oil_change_date,
          kilometers: row.kilometers,
        })),
    };

    // console.log(`Car ${car_id} with History:`, car);
    return car;
  } catch (error) {
    console.error("Error fetching car with history:", error);
    throw error;
  }
};

// try {
//   const result = await getCarWithHistory(15015);
// } catch (error) {
//   console.error(error);
// }

export const updateTotalDistance = async (carId, newDistance) => {
  const result = await dbPool.query(
    `UPDATE cars_tb SET total_distance = ? WHERE car_id = ?`,
    [newDistance, carId]
  );

  return result;
};

export const updateInitialDistance = async (carId, newInitialDistance) => {
  const car = await getCarWithHistory(carId);

  if (car.initial_distance === car.total_distance) {
    throw new Error("Interval is already updated!");
    // return "Interval is already updated!";
  }

  const result = await dbPool.query(
    `UPDATE cars_tb SET initial_distance = ?, last_reset_date = NOW() WHERE car_id = ?`,
    [newInitialDistance, carId]
  );

  return result;
};

export const updateNextIntervalKm = async (id, newInterval) => {
  const result = await dbPool.query(
    `UPDATE cars_tb SET next_oil_change_km = ? WHERE car_id = ?`,
    [+newInterval, id]
  );

  return result;
};
