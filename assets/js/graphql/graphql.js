// query the LIS GraphQL server given by graphqluri in _config.yml.
// https://github.com/legumeinfo/graphql-server
// we can use system variables in a js file when we have front matter as above!
const uri = "https://graphql.lis.ncgr.org/"

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
