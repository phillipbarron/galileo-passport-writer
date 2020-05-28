const mapToPassport = babelMessage => {
  const { programme: { languages, taggings }} = babelMessage;
  const language = languages.length > 0 ? languages[0] : undefined;
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;
  const home = taggings.length > 0 ? taggings[0] : undefined;
  return {
    locator,
    language,
    home
  };
};


module.exports = {
  mapToPassport
}