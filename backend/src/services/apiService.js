import { ALL_CARS_URL, LOGIN_URL, LOGOUT_URL } from "../config/apiEndpoints.js";
import dotenv from "dotenv";
dotenv.config();

const wialonUrl = `${LOGIN_URL}{"token":"${process.env.TOKEN}"}`;

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const getSid = async () => {
  try {
    const response = await fetch(wialonUrl, options);

    const data = await response.json();

    if (!data.eid) {
      throw new Error("Failed to get sid!");
    }

    return data.eid;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async (sid) => {
  try {
    const response = await fetch(`${LOGOUT_URL}${sid}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on logout!", error);
  }
};

export const getAllItems = async (sid) => {
  const params = JSON.stringify({
    spec: {
      itemsType: "avl_unit",
      propName: "sys_name",
      propValueMask: "*",
      sortType: "sys_name",
    },
    force: 1,
    // flags: 8397079,
    // flags: 4294967295,
    flags: 8217,
    from: 0,
    to: 0,
  });

  const url = `${ALL_CARS_URL}${encodeURIComponent(params)}&sid=${sid}`;

  try {
    const response = await fetch(url, {
      method: "POST",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error on items access!", error);
  }
};
