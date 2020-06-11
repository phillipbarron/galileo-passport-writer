require('dotenv').config();
const testMessage = require('./testing.json');
const eventService = require('./services/passport-event-sevice');


const test = async () => {
  try {
    await eventService.sendPassportEvent(testMessage);
  } catch (ex) {
    console.log(ex);
  }
}

test();