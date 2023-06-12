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
