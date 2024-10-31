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
    return data.eid;
  } catch (error) {
    console.error("Error on Fetching the TOKEN!", error);
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

// FIXME: remove this obj.
const p = {
  params: [
    {
      svc: "core/update_data_flags",
      params: {
        spec: [{ type: "type", data: "avl_unit", flags: 8397079, mode: 1 }],
      },
    },
    {
      svc: "core/update_data_flags",
      params: { spec: [{ type: "id", data: 15013, flags: 513, mode: 1 }] },
    },
    {
      svc: "core/update_data_flags",
      params: {
        spec: [{ type: "type", data: "avl_unit_group", flags: 21, mode: 1 }],
      },
    },
    {
      svc: "core/update_data_flags",
      params: { spec: [{ type: "type", data: "avl_unit", flags: 1, mode: 1 }] },
    },
    {
      svc: "core/update_data_flags",
      params: {
        spec: [{ type: "type", data: "avl_unit_group", flags: 1, mode: 1 }],
      },
    },

    { svc: "core/get_hw_types", params: { includeType: true } },
  ],
  flags: 0,
};

const car = {
  act: 1,
  bact: 2219,
  cfl: 272,
  cls: 2,
  cneh: 0,
  cnkb: 0,
  cnm: 274889,
  cnm_km: 274889,
  crt: 2218,
  ct: 1573887008,
  dactt: 0,
  ftp: { ch: 0, tp: 0, fl: 0 },
  id: 15011,
  mu: 0,
  nm: "WI 111 NG",
  pflds: { 1: { id: 1, n: "registration_plate", v: "WI 111 NG" } },
  pfldsmax: 0,
  prp: { label_color: "16711680", solid_colors: "255", track_solid: "255" },
  uacl: 880265974775,
  ugi: 1,
  uri: "/avl_library_image/18/0/library/unit/MyYaris-icon.png",
};
