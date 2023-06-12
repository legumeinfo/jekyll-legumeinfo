// location linkout query for the LIS GraphQL API
const locationLinkoutsQuery = `
      query LocationLinkoutsQuery($identifier: ID!, $start: Int!, $end: Int!) {
        locationLinkouts(identifier: $identifier, start: $start, end: $end) {
          href
          text
        }
      }
`;
