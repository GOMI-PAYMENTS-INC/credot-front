import gql from 'graphql-tag';

const searchQuery = {
  search: gql`
    query Search($country: CountryType!, $translateType: TranslateType, $text: String!) {
      search(country: $country, translateType: $translateType, text: $text) {
        main {
          id
          text
          ko
          en
          translated
          count
          relevance
          thumbnailLink
        }
        relations {
          id
          text
          ko
          en
          translated
          count
          relevance
          thumbnailLink
        }
      }
    }
  `,
};

export default searchQuery;
