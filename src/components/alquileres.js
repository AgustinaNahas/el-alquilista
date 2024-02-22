import axios from "axios";
const csvtojson = require("csvtojson");

async function getAlquileres() {
  return axios
    .get(
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vRwl5hKPaEBkhHushcKEM8ICAAIcfKs-hG_CfM4Ps3DQNCqM8XmrTAQhMPvSluvCKjUyTD9yLkp-1EB/pub?gid=647954816&single=true&output=csv`
    )
    .then((data) => csvtojson().fromString(data.data));
}

export default getAlquileres;