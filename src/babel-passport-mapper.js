const homeResolver = require("./home-resolver");

const mapToPassport = (babelMessage) => {
  const {
    programme: { languages, tags, taggings: categories },
  } = babelMessage;
  console.log("1", JSON.stringify(categories));
  const home =
    categories.length > 0 ? homeResolver.getHome(categories[0]) : undefined;
  const language = languages.length > 0 ? languages[0] : undefined;
  if (!home || !language) return;
  console.log("2", JSON.stringify(categories));
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;
  const taggings =
    tags && tags.types && tags.types.about
      ? tags.types.about.map((tag) => ({
          predicate: "http://www.bbc.co.uk/ontologies/passport/predicate/About",
          value: tag,
        }))
      : undefined;
  return {
    locator,
    language,
    home,
    tags,
  };
};

module.exports = {
  mapToPassport,
};
