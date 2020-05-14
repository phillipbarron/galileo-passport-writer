const axios = require('axios');

const getPassport = locator => axios.get(`${process.env.PASSPORT_API}/${locator}`);

module.exports = {
  getPassport
}
