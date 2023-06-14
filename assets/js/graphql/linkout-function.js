// gene linkout query for the LIS GraphQL API
const geneLinkoutsQuery = `
      query GeneLinkoutsQuery($identifier: ID!) {
        geneLinkouts(identifier: $identifier) {
          href
          text
        }
      }
`;

// location linkout query for the LIS GraphQL API
const locationLinkoutsQuery = `
      query LocationLinkoutsQuery($identifier: ID!, $start: Int!, $end: Int!) {
        locationLinkouts(identifier: $identifier, start: $start, end: $end) {
          href
          text
        }
      }
`;

// the linkout function to give to the linkout component
function linkoutFunction({type, variables}, {abortSignal}) {
    if (type == 'gene') {
        // returns a Promise that resolves to an array of linkout objects that the
        // linkout Web Component knows how to parse: {text: string, href: string}[]
        return graphqlQuery(uri, geneLinkoutsQuery, variables, abortSignal)
            .then(({data}) => ({results: data.geneLinkouts}));
    } else if (type == 'location') {
        // returns a Promise that resolves to an array of linkout objects that the
        // linkout Web Component knows how to parse: {text: string, href: string}[]
        return graphqlQuery(uri, locationLinkoutsQuery, variables, abortSignal)
            .then(({data}) => ({results: data.locationLinkouts}));
    }
    return Promise.reject();
}
