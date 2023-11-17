---
# This YAML front matter ensures Jekyll will pass the site variables in.
layout: none # stops this from being rendered as a page
---

/** The URI of the GraphQL server to query. */
const uri = "{{ site.graphql_uri }}";


/**
 * Gets data from a GraphQL server via a POST request.
 * Adapted from https://graphql.org/graphql-js/graphql-clients/
 * @param {string} query - The GraphQL query.
 * @param {object} variables - The variables for the GraphQL query.
 * @returns {Promise<Response>} A `Promise` that resolves to a `Response` object.
 */
export function query(query, variables={}, abortSignal=undefined) {
    return fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        signal: abortSignal,
    })
    .then(r => r.json())
    .then((response) => {
      if (response.errors) {
        response.errors.forEach(console.error);
      }
      return response;
    });
}
