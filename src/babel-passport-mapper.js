
const getHome = homeKey => `http://www.bbc.co.uk/ontologies/passport/home/${homeKey}`;

const getNewsCategory = categoriesArray => {
  console.log({ categoriesArray });
  return getHome(categoriesArray.filter(category => category.namespace === "news_categories")[0].tags[0]);
};

const mapToPassport = babelMessage => {
  const { programme: { languages, tags, taggings: categories }} = babelMessage;
  console.info({ categories });
  const home = categories.length > 0 ? getNewsCategory(categories) : undefined;
  if (!home) return;
  const language = languages.length > 0 ? languages[0] : undefined;
  const locator = `urn:bbc:pips:pid:${babelMessage.programme.pid}`;
  const taggings = tags && tags.types.about ? tags.tags.types.about.map(tag => ({
    predicate: "http://www.bbc.co.uk/ontologies/passport/predicate/About",
    value: tag,
  })) : undefined;
  return {
    locator,
    language,
    home,
    tags
  };
};


module.exports = {
  mapToPassport
}