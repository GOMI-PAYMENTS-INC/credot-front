import gql from 'graphql-tag';

const searchQuery = {
  search: gql`
    query Search($country: CountryType!, $text: String!) {
      search(country: $country, text: $text) {
        reportInvokeId
        main {
          id
          text
          count
          relevance
        }
        relations {
          id
          text
          count
          relevance
        }
      }
    }
  `,
};

export default searchQuery;
