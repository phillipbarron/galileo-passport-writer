const homeResolver = require("./home-resolver");

const getTags = tags => {
  console.log("InsideGetTags", JSON.stringify(tags));
  const taggings =
  tags && tags.types && tags.types.about
    ? tags.types.about.map((tag) => ({
        predicate: "http://www.bbc.co.uk/ontologies/passport/predicate/About",
        value: tag,
      }))
    : undefined;
    console.log("InsideGetTags - returning ", taggings);
    return taggings
}
const mapToPassport = (babelMessage) => {
  const {
    programme: { languages, tags, taggings: categories },
  } = babelMessage;
  const home =
    categories.length > 0 ? homeResolver.getHome(categories[0]) : undefined;
  const language = languages.length > 0 ? languages[0] : undefined;
  if (!home || !language) return;
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;

  return {
    locator,
    language,
    home,
    taggings: getTags(tags),
  };
};

module.exports = {
  mapToPassport,
};
