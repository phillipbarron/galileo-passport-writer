

const passportMapper = require("../babel-passport-mapper");
const passportApiClient = require('../passport-api-client');
const passporWriterClient = require('../passport-writer-client');
const generatePassportEvent = require('@bbc/passport-event-generator');

const service = {
  identifier: 'galileo-passport-writer',
  version: '1.0.0'
};

const sendPassportEvent = async babelMessage => {
  // build passport
  console.log('building passport with', babelMessage);
  const { audit: { user: { id: user } }} = babelMessage;
  console.log('AND THE USER IS ', user);
  const passportFromMessage = passportMapper.mapToPassport(babelMessage);
  console.info({ passportFromMessage });
  // get current state
  // const currentPassport = passportFromMessage ? await passportApiClient.getPassport(passportFromMessage.locator): {};
  // build delta
  if (passportFromMessage) {
    const delta = generatePassportEvent.default({
      oldPassport: {},
      newPassport: passportFromMessage,
      user,
      service
    });
  
    console.info({ delta: JSON.stringify(delta) });
    return;
    // write to passport writer
    // return passporWriterClient.sendPassportEvent(delta);
  }
  console.info("insufficient data to create passport");
}

module.exports = {
  sendPassportEvent
};
