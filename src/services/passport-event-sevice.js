const passportMapper = require("../babel-passport-mapper");
const passporWriterClient = require("../passport-writer-client");
const generatePassportEvent = require("@bbc/passport-event-generator");

const service = {
  identifier: "galileo-passport-writer",
  version: "1.0.0",
};

const sendPassportEvent = async (babelMessage) => {
  const {
    audit: {
      user: { id: user },
    },
    publication: { updateType },
  } = babelMessage;
  if (updateType === 'revoke') return false; // todo - have this send negative availability assertion
  const passportFromMessage = passportMapper.mapToPassport(babelMessage);
  // build delta
  if (passportFromMessage) {
    const delta = generatePassportEvent.default({
      oldPassport: {},
      newPassport: passportFromMessage,
      user,
      service,
    });

    const generatedAtTime = new Date(Date.now()).toISOString();

    const updatedAssertions = delta.assertions.map(assertion => {
      assertion.provenance.generatedAtTime = generatedAtTime;
      return assertion;
    });

    const deltaWithGeneratedAtTime = {
      ...delta,
      ...{ assertions: updatedAssertions}
    };
    console.info({ passportDelta: JSON.stringify(deltaWithGeneratedAtTime) });
    await passporWriterClient.sendPassportEvent(deltaWithGeneratedAtTime);
    return true;
  }
  console.info("insufficient data to create passport");
  return false;
};

module.exports = {
  sendPassportEvent,
};
