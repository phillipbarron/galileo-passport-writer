

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
  console.log('building passport with', babelMessage);
  const { publisher: { id: user } } = babelMessage;
  const passportFromMessage = passportMapper.mapToPassport(babelMessage);
  console.info({ passportFromMessage });
  // get current state
  const currentPassport = await passportApiClient.getPassport(passportFromMessage.locator);
  console.info({ currentPassport });
  // build delta
  const delta = deltaService.generatePassportEvent({
    oldPassport: currentPassport,
    newPassport: passportFromMessage,
    user,
    service
  });

  console.info({ delta });
  // write to passport writer
  // return passporWriterClient.sendPassportEvent(delta);
}

module.exports = {
  sendPassportEvent
};
