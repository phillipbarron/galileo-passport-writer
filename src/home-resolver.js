const NEWS_CATEGORIES = 'news_categories';
const NEWS_LANGUAGES = 'news_languages';
const HOME_PREDICATE_BASEURI = 'http://www.bbc.co.uk/ontologies/passport/home/';

const WORLD_SERVICE_MAPPING = {
  'uk_chinese_simplified': 'UKChina'
};

const getHome = ({ namespace, tags }) => {
  const homeTag = tags[0];
  switch (namespace) {
    case NEWS_CATEGORIES:
      return `${HOME_PREDICATE_BASEURI}News`;
    case NEWS_LANGUAGES:
      return homeTag in WORLD_SERVICE_MAPPING ?
        `${HOME_PREDICATE_BASEURI + WORLD_SERVICE_MAPPING[homeTag]}`:
        `${HOME_PREDICATE_BASEURI + homeTag.charAt(0).toUpperCase() + homeTag.slice(1)}`;
      return undefined;
    default:
      return undefined;
  }
}

module.exports = {
  getHome
}
