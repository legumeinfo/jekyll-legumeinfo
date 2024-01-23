import { query } from './query.js';


/** The GraphQL query used to get linkouts for genes. */
export const getGeneLinkoutsQuery = `
  query GeneLinkoutsQuery($identifier: ID!) {
    geneLinkouts(identifier: $identifier) {
      results {
        href
        text
      }
    }
  }
`;


/**
 * Gets linkouts for genes from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getGeneLinkouts(queryData={}, options={}) {
  const {identifier} = queryData;
  const variables = {identifier};
  const {abortSignal} = options;
  return query(getGeneLinkoutsQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `GeneLinkoutsResults` into the `LinkoutResults` used by the `LisLinkoutElement`
 * (`<lis-linkout-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `LinkoutResults` object.
 */
export function geneLinkoutsToLinkoutResults(data) {
  const results = data.geneLinkouts.results;
  return {results};
}


/**
 * The gene linkouts function to use for the `linkoutFunction` property of the `LisLinkoutElement`
 * (`<lis-linkout-element>`) Web Component.
 * @param {object} linkoutData - An object containing the data needed to get linkouts.
 * @param {object} options - An object containing optional parameters to pass to the `getGeneLinkouts` function.
 * @returns {Promise} A `Promise` that resolves to the `LinkoutResults` used by the
 * `LisLinkoutElement` (`<lis-linkout-element>`) Web Component.
 */
export function geneLinkoutsFunction(linkoutData, options) {
  return getGeneLinkouts(linkoutData, options)
    .then(({data}) => geneLinkoutsToLinkoutResults(data));
}


/** The GraphQL query used to get linkouts for locations. */
export const getLocationLinkoutsQuery = `
  query LocationLinkoutsQuery($identifier: ID!, $start: Int!, $end: Int!) {
    locationLinkouts(identifier: $identifier, start: $start, end: $end) {
      results {
        href
        text
      }
    }
  }
`;


/**
 * Gets linkouts for locations from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getLocationLinkouts(queryData={}, options={}) {
  const {identifier, start, end} = queryData;
  const variables = {identifier, start: parseInt(start), end: parseInt(end)};
  const {abortSignal} = options;
  return query(getLocationLinkoutsQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `LocationLinkoutsResults` into the `LinkoutResults` used by the `LisLinkoutElement`
 * (`<lis-linkout-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `LinkoutResults` object.
 */
export function locationLinkoutsToLinkoutResults(data) {
  const results = data.locationLinkouts.results;
  return {results};
}


/**
 * The location linkouts function to use for the `linkoutFunction` property of the `LisLinkoutElement`
 * (`<lis-linkout-element>`) Web Component.
 * @param {object} linkoutData - An object containing the data needed to get linkouts.
 * @param {object} options - An object containing optional parameters to pass to the `getLocationLinkouts` function.
 * @returns {Promise} A `Promise` that resolves to the `LinkoutResults` used by the
 * `LisLinkoutElement` (`<lis-linkout-element>`) Web Component.
 */
export function locationLinkoutsFunction(linkoutData, options) {
  return getLocationLinkouts(linkoutData, options)
    .then(({data}) => locationLinkoutsToLinkoutResults(data));
}


/**
 * A linkouts function to use for the `linkoutFunction` property of the `LisLinkoutElement`
 * (`<lis-linkout-element>`) Web Component that supports all linkout types.
 * @param {object} {type, linkoutData} - An object containing the linkout type and the data needed to get linkouts for that type.
 * @param {object} options - An object containing optional parameters to pass to the `getGeneLinkouts` function.
 * @returns {Promise} A `Promise` that resolves to the `LinkoutResults` used by the
 * `LisLinkoutElement` (`<lis-linkout-element>`) Web Component.
 */
export function allLinkoutsFunction({type, linkoutData}, options) {
  switch (type) {
    case 'gene':
      return geneLinkoutsFunction(linkoutData, options);
    case 'location':
      return locationLinkoutsFunction(linkoutData, options);
  }
  return Promise.reject();
}
