

const mapToPassport = babelMessage => {
  const locator = `urn:bbc:pips:pid:${babelMessage.locator.split(':').pop()}`
  return {
    locator,
  };
};


module.exports = {
  mapToPassport
}