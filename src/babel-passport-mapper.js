
const getHome = homeKey => `http://www.bbc.co.uk/ontologies/passport/home/${homeKey}`;

const mapToPassport = babelMessage => {
  const { programme: { languages, taggings }} = babelMessage;
  const home = taggings.length > 0 ? taggings[0] : undefined;
  if (!home) return;
  const language = languages.length > 0 ? languages[0] : undefined;
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;
  // todo get the tags
  return {
    locator,
    language,
    home
  };
};


module.exports = {
  mapToPassport
}