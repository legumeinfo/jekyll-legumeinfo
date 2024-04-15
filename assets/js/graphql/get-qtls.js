import { query } from './query.js';


/** The GraphQL query used to get QTLs. */
export const getQTLsQuery = `
  query getQTLsQuery($traitName: String!, $page: Int, $pageSize: Int) {
    qtls(traitName: $traitName, page: $page, pageSize: $pageSize) {
      results {
        trait {
           name
        }
        identifier
        linkageGroup {
           geneticMap {
              identifier
           }
           identifier
        }
        start
        end
        markerNames
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
 * Gets QTLs from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} pageData - An object containing pagination data for the GraphQL query, if any.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getQTLs(queryData={}, pageData={}, options={}) {
  const {query: traitName} = queryData;
  const {page, pageSize} = pageData;
  const variables = {traitName, page, pageSize};
  const {abortSignal} = options;
  return query(getQTLsQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `QtlResults` into the `QTLSearchResults` used by the `LisQTLSearchElement`
 * (`<lis-qtl-search-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `QTLSearchResults` object.
 */
export function qtlsDataToSearchResults(data) {
  // extract the page info
  const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
    = data.qtls.pageInfo;
  // flatten the results
  console.log(data);
  const results = data.qtls.results.map((qtl) => {
    const {
      trait: {
        name: trait_name,
      },
      identifier,
      linkageGroup,
      start,
      end,
      markerNames,
    } = qtl;
    const {geneticMap, identifier: linkageGroup_identifier} = linkageGroup;
    const {identifier: linkageGroup_geneticMap_identifier} = geneticMap || {identifier: ""};
    return {
      trait_name,
      identifier,
      linkageGroup_geneticMap_identifier,
      linkageGroup_identifier,
      start,
      end,
      markerNames,
    };
  });
  // return the exprected paginated results object
  return {hasNext, numResults, pageSize, numPages, results};
}


/**
 * The QTL search function to use for the `searchFunction` property of the `LisQTLSearchElement`
 * (`<lis-qtl-search-element>`) Web Component.
 * @param {object} queryData - An object containing data from the submitted search form.
 * @param {number} page - The page of results to load.
 * @param {object} options - An object containing optional parameters to pass to the `getQTLs` function.
 * @returns {Promise} A `Promise` that resolves to the `PaginatedSearchResults<QTLSearchResult[]>` used by the
 * `LisQTLSearchElement` (`<lis-qtl-search-element>`) Web Component.
 */
export function qtlSearchFunction(queryData, page, options={}) {
  return getQTLs(queryData, {page, pageSize: 10}, options)
    .then(({data}) => qtlsDataToSearchResults(data));
}
