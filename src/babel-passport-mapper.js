const mapToPassport = babelMessage => {
  const { programme: { languages }} = babelMessage;
  const language = languages.length > 0 ? languages[0] : undefined;
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;
  return {
    locator,
    language,
  };
};


module.exports = {
  mapToPassport
}