import { query } from './query.js';


/** The GraphQL query used to get publications. */
export const getPublicationsQuery = `
  query getPublicationQuery($title: String!, $page: Int, $pageSize: Int) {
    publications(title: $title, page: $page, pageSize: $pageSize) {
      results {
        year
        title
        journal
        firstAuthor
        doi
        pubMedId
      }
      pageInfo {
        hasNextPage
        numResults
        pageSize
        pageCount
      }
    }
  }
  `;


/**
 * Gets publications from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} pageData - An object containing pagination data for the GraphQL query, if any.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getPublications(queryData={}, pageData={}, options={}) {
  const {query: title} = queryData;
  const {page, pageSize} = pageData;
  const variables = {title, page, pageSize};
  const {abortSignal} = options;
  return query(getPublicationsQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `PublicationResults` into the `PublicationSearchResults` used by the `LisPublicationSearchElement`
 * (`<lis-publication-search-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `PublicationSearchResults` object.
 */
export function publicationsDataToSearchResults(data) {
  // extract the page info
  const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
    = data.publications.pageInfo;
  // extract the results
  const results = data.publications.results;
  // return the exprected paginated results object
  return {hasNext, numResults, pageSize, numPages, results};
}


/**
 * The publication search function to use for the `searchFunction` property of the `LisPublicationSearchElement`
 * (`<lis-publication-search-element>`) Web Component.
 * @param {object} queryData - An object containing data from the submitted search form.
 * @param {number} page - The page of results to load.
 * @param {object} options - An object containing optional parameters to pass to the `getPublications` function.
 * @returns {Promise} A `Promise` that resolves to the `PaginatedSearchResults<PublicationSearchResult[]>` used by the
 * `LisPublicationSearchElement` (`<lis-publication-search-element>`) Web Component.
 */
export function publicationSearchFunction(queryData, page, options={}) {
  return getPublications(queryData, {page, pageSize: 10}, options)
    .then(({data}) => publicationsDataToSearchResults(data));
}
