const axios = require('axios');
const fs = require('fs');
const https = require('https');

const sendPassportEvent = data => {
  const httpsAgent = new https.Agent({
    cert: fs.readFileSync(process.env.DEV_CERT_PEM),
    key: fs.readFileSync(process.env.DEV_CERT_PEM),
    ca: fs.readFileSync(process.env.COSMOS_CA),
  });

  return axios.post(`${process.env.PASSPORT_WRITER_API}/passports`, data, { httpsAgent });
}

module.exports = {
  sendPassportEvent
}
