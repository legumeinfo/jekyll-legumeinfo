import { query } from './query.js';
import { modalLink } from './modal.js';


/** The GraphQL query used to get genes. */
export const getGenesQuery = `
  query GenesQuery($identifier: String, $name: String, $description: String, $genus: String, $species: String, $strain: String, $family: String, $page: Int, $pageSize: Int) {
    genes(genus: $genus, species: $species, strain: $strain, identifier: $identifier, name: $name, description: $description, geneFamilyIdentifier: $family, page: $page, pageSize: $pageSize) {
      results {
        name
        identifier
        description
        organism { genus species }
        strain { identifier }
        geneFamilyAssignments { geneFamily { identifier } }
        panGeneSets { identifier }
        locations { chromosome { identifier } supercontig { identifier } start end strand }
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
 * Gets genes from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} pageData - An object containing pagination data for the GraphQL query, if any.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getGenes(queryData={}, pageData={}, options={}) {
  const {genus, species, strain, identifier, description, family} = queryData;
  const {page, pageSize} = pageData;
  const variables = {
    genus,
    species,
    strain,
    identifier,
    description,
    family,
    page,
    pageSize,
  };
  const {abortSignal} = options;
  return query(getGenesQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `GenesResults` into the `PaginatedSearchResults<GeneSearchResult[]>` used by the
 * `LisGeneSearchElement` (`<lis-gene-search-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `PaginatedSearchResults<GeneSearchResult[]>` object.
 */
export function genesDataToSearchResults(data) {
  // extract the page info
  const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
    = data.genes.pageInfo;
  // flatten results
  const results =
    data.genes.results.map(({organism: {genus, species}, strain, ...gene}) => {
      const geneFamilyAssignments =
        gene.geneFamilyAssignments
          .map(({geneFamily: {identifier}}) => identifier);
      const panGeneSets =
        gene.panGeneSets
          .map(({identifier}) => identifier);
      const locations =
        gene.locations.map(({chromosome, supercontig, start, end, strand}) => {
          const interval = `${start}-${end} (${strand})`;
          if (chromosome?.identifier) {
            return `${chromosome?.identifier}:${interval} (chromosome)`;
          } else if (supercontig?.identifier) {
            return `${supercontig?.identifier}:${interval} (supercontig)`;
          }
          return `unknown:${interval}`;
        });
      return {
        genus,
        species,
        strain: strain.identifier,
        ...gene,
        geneFamilyAssignments,
        panGeneSets,
        locations,
      };
    });
  // return the expected paginated results object
  return {hasNext, numResults, pageSize, numPages, results};
}


/**
 * The gene search function to use for the `searchFunction` property of the `LisGeneSearchElement`
 * (`<lis-gene-search-element>`) Web Component.
 * @param {object} queryData - An object containing data from the submitted search form.
 * @param {number} page - The page of results to load.
 * @param {object} options - An object containing optional parameters to pass to the `getGenes` function.
 * @returns {Promise} A `Promise` that resolves to the `PaginatedSearchResults<GeneSearchResult[]>` used by the
 * `LisGeneSearchElement` (`<lis-gene-search-element>`) Web Component.
 */
export function geneSearchFunction(queryData, page, options={}) {
  return getGenes(queryData, {page, pageSize: 10}, options)
    .then(({data}) => genesDataToSearchResults(data));
}


/**
 * Creates the `geneSearchFunction` with the given callbacks applied to the returned `Promise`.
 * @param {...Function} callbacks - The callback function to apply to the returned `Promise`.
 * @returns {Promise} The `Promise` returned by the `geneSearchFunction` with the callbacks applied.
 */
export function geneSearchFunctionFactory(...callbacks) {
  return (queryData, page, options={}) => {
    let promise = geneSearchFunction(queryData, page, options);
    callbacks.forEach((callback) => {
      promise = promise.then(callback);
    });
    return promise;
  };
}


/**
 * Creates a callback function that can be used with the `geneSearchFunctionFactory` function
 * to convert `identifiers` in the `PaginatedSearchResults<GeneSearchResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function geneIdentifierModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({identifier, ...geneInfo}) => {
      const data = {identifier, type: 'gene'};
      return {
        ...geneInfo,
        identifier: modalLink(modalId, identifier, data),
      }
    });
    return {...pageInfo, results};
  }
}


/**
 * Creates a callback function that can be used with the `geneSearchFunctionFactory` function
 * to convert `locations` in the `PaginatedSearchResults<GeneSearchResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function locationModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({locations: oldLocations, ...geneInfo}) => {
      const locations = oldLocations.map((location) => {
        // extract the data from the location string made by genesDataToSearchResults
        const re = /(?<identifier>.+):(?<start>\d+)\-(?<end>\d+)/;
        const data = location.match(re).groups;
        data.type = 'location';
        return modalLink(modalId, location, data);
      });
      return {...geneInfo, locations};
    });
    return {...pageInfo, results};
  }
}

/**
 * Creates a callback function that can be used with the `geneSearchFunctionFactory` function
 * to convert `geneFamilyAssignments` in the `PaginatedSearchResults<GeneSearchResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function geneFamilyAssignmentsModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({geneFamilyAssignments: oldGeneFamilyAssignments, ...geneInfo}) => {
      const geneFamilyAssignments = oldGeneFamilyAssignments.map((identifier) => {
        const data = {identifier, type: 'geneFamily'};
        return modalLink(modalId, identifier, data);
      });
      return {
        ...geneInfo,
        geneFamilyAssignments,
      }
    });
    return {...pageInfo, results};
  }
}

/**
 * Creates a callback function that can be used with the `geneSearchFunctionFactory` function
 * to convert `panGeneSets` in the `PaginatedSearchResults<GeneSearchResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function panGeneSetsModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({panGeneSets: oldPanGeneSets, ...geneInfo}) => {
      const panGeneSets = oldPanGeneSets.map((identifier) => {
        const data = {identifier, type: 'panGeneSet'};
        return modalLink(modalId, identifier, data);
      });
      return {
        ...geneInfo,
        panGeneSets,
      }
    });
    return {...pageInfo, results};
  }
}

/**
 * Creates all callback functions that can be used with the `geneSearchFunctionFactory` function
 * to add modal links to the `PaginatedSearchResults<GeneSearchResult[]>`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function[]} The created callback functions.
 */
export function geneAllModalLinksFactory(modalId) {
  return [
    geneIdentifierModalLinkFactory(modalId),
    locationModalLinkFactory(modalId),
    geneFamilyAssignmentsModalLinkFactory(modalId),
    panGeneSetsModalLinkFactory(modalId),
  ];
}

/**
 * Deprecated alias for geneAllModalLinksFactory, for backward compatibility until
 * we have enough significant breaking changes to warrant a major revision update
 */
export const allModalLinksFactory = geneAllModalLinksFactory;
