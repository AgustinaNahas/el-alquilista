import axios from "axios";
// const csvtojson = require("csvtojson");

async function getDolarHoy() {
  return axios
    .get(
      `https://dolarapi.com/v1/dolares/oficial`
    )
    .then((data) => data.data.compra);
}

export default getDolarHoy;