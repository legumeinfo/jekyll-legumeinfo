// gene linkout query for the LIS GraphQL API
const geneLinkoutsQuery = `
      query GeneLinkoutsQuery($identifier: ID!) {
        geneLinkouts(identifier: $identifier) {
          href
          text
        }
      }
`;
