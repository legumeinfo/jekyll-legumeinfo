---
layout: blank
---

// query a local instance of the LIS GraphQL server:
// https://github.com/legumeinfo/graphql-server

// we can use system variables when we have (empty) front matter in a js file?
// TODO: use system.graphqluri
const uri = "{{ site.graphqluri }}"

// const uri = "https://jekyll.dev.lis.ncgr.org/graphql"

// A function that gets data from a GraphQL server via a POST request.
// Adapted from https://graphql.org/graphql-js/graphql-clients/
function graphqlQuery(uri, query, variables={}, abortSignal=undefined) {
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
      if (response.errors) throw response.errors;
      return response;
    });
}
// TODO: implement error handling

// Flatten GraphQL results that contain objects
const flatten = (obj, out={}, prefixes=[]) => {
    if (obj != null) {
        Object.keys(obj).forEach(key => {
            const key_prefixes = [...prefixes, key];
            if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
                out = flatten(obj[key], out, key_prefixes);
            } else {
                const prefix_key = key_prefixes.join('_');
                out[prefix_key] = obj[key];
            }
        });
    }
    return out;
};
