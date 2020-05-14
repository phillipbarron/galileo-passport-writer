

const passportMapper = require("../babel-passport-mapper");
const passportApiClient = require('../passport-api-client');
const passporWriterClient = require('../passport-writer-client');
const deltaService = require('@bbc/passport-event-generator');

const service = {
  serviceIdentifier: 'galileo-passport-writer',
  serviceVersion: '1.0.0'
}
const sendPassportEvent = async babelMessage => {
  // build passport
  const { publisher: { id: user } } = babelMessage;
  const passportFromMessage = passportMapper.mapToPassport(babelMessage);
  // get current state
  const currentPassport = passportApiClient.getPassport(passportFromMessage.locator);
  // build delta
  const delta = deltaService.generatePassportEvent({
    oldPassport: currentPassport,
    newPassport: passportFromMessage,
    user,
    service
  });
  // write to passport writer
  passporWriterClient.sendPassportEvent(delta);
}

module.exports = {
  sendPassportEvent
};
