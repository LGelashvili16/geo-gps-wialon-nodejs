import {
  ALL_CARS_URL,
  LOCATION_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from "../config/apiEndpoints.js";
import dotenv from "dotenv";
dotenv.config();

// export const LOGIN_URL =
//   "https://local.geogps.ge/wialon/ajax.html?svc=token/login&params=";

// const wialonUrl = `${LOGIN_URL}{"token":"${process.env.TOKEN}"}`;

// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// };

// TOKEN='fd82ce59664d0b7f93fa52ff089d637fA0D917422E2128FF7157D78F8FFC3BAFF11B2EEF'

export const loginUser = async () => {
  try {
    const response = await fetch(
      `https://local.geogps.ge/wialon/ajax.html?svc=token/login&params={"token":"fd82ce59664d0b7f93fa52ff089d637fA0D917422E2128FF7157D78F8FFC3BAFF11B2EEF"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (!data.eid) {
      throw new Error("Failed to get sid!");
    }

    return {
      eid: data.eid,
      userId: data.user.id,
    };
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

export const refreshSession = async (sid) => {
  try {
    const response = await fetch(`http://local.geogps.ge/avl_evts?sid=${sid}`);

    const data = await response.json();

    console.log(data);
  } catch (error) {}
};

export const getAllItems = async (sid) => {
  const ALL_CARS_URL =
    "https://local.geogps.ge/wialon/ajax.html?svc=core/search_items&params=";

  const params = JSON.stringify({
    spec: {
      itemsType: "avl_unit",
      propName: "sys_name",
      propValueMask: "*",
      sortType: "sys_name",
    },
    force: 1,
    flags: 4294967295,
    from: 0,
    to: 0,
  });

  const url = `${ALL_CARS_URL}${encodeURIComponent(params)}&sid=${sid}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error on items access!", error);
  }
};

export const getCarLocation = async (lat, lon, userId, eid) => {
  // const url = `https://geocode-maps.wialon.com/local.geogps.ge/gis_geocode?coords=[{"lon":${long},"lat":${lati}}]&flags=1255211008&search_provider="google"&gis_sid=${gis_sid}&uid=${user.id}&sid=${eid}`;

  const baseUrl = "https://local.geogps.ge/gis_geocode";

  // Query parameters
  const params = new URLSearchParams({
    flags: 1255211008,
    city_radius: 10,
    dist_form_unit: 5,
    txt_dist: "km from",
    search_provider: "google",
    coords: JSON.stringify([{ lat, lon }]),
    uid: userId,
    sid: eid,
  });

  // Construct the full URL
  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
