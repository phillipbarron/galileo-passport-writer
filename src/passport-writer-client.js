const axios = require('axios');

const sendPassportEvent = payload => axios.post(`${process.env.PASSPORT_API}/passports`, payload);

module.exports = {
  sendPassportEvent
}
