import { modalLink } from './modal.js';
import { query } from './query.js';
import { downloadFile, nextBin } from './utility.js';


/** The GraphQL query used to get data for the pangene lookup form. */
export const getPangeneLookupFormDataQuery = `
  query FormDataQuery {
    chromosomes {
      results {
        annotationVersion
        assemblyVersion
        strain {
          organism {
            genus
            species
          }
          identifier
        }
      }
    }
  }
`;


/**
 * Gets pangene lookup from data GraphQL.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getPangeneLookupFormData(options={}) {
  const {abortSignal} = options;
  return query(getPangeneLookupFormDataQuery, {}, abortSignal);
}


/**
 * Converts GraphQL `ChromosomeResults` into the `PangeneLookupFormData` used by the
 * `LisPangeneLookupElement` (`<lis-pangene-lookup-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `PangeneLookupFormData` object.
 */
export function chromosomeDataToPangeneFormData(data) {
  // bin the strains by genus then species
  const binnedFormData = {};
  data.chromosomes.results.forEach(({
    annotationVersion,
    assemblyVersion,
    strain: {
      organism: {
        genus,
        species,
      },
      identifier,
    },
  }) => {
    let bin = binnedFormData;
    bin = nextBin(bin, genus, {});
    bin = nextBin(bin, species, {});
    bin = nextBin(bin, identifier, {});
    bin = nextBin(bin, assemblyVersion, []);
    if (annotationVersion != null) {
      bin.push(annotationVersion);
    }
  });
  // collapse the bins into arrays of objects
  const genuses =
  Object.entries(binnedFormData).map(([genus, binnedSpecies]) => {
    const species =
    Object.entries(binnedSpecies).map(([species, binnedStrains]) => {
      const strains =
      Object.entries(binnedStrains).map(([strain, binnedAssemblies]) => {
        const assemblies =
        Object.entries(binnedAssemblies).map(([assembly, annotations]) => {
          return {
            assembly,
            annotations: [...new Set(annotations)]
              .map((annotation) => {annotation}),
          };
        });
        return {strain, assemblies};
      });
      return {species, strains};
    });
    return {genus, species};
  });
  // return the expected form data object
  return {genuses};
}


/**
 * The pangene form data function to use for the `formDataFunction` property of the `LisPangeneLookupElement`
 * (`<lis-pangene-lookup-element>`) Web Component.
 * @param {object} queryData - An object containing the data needed to get chromosomes.
 * @param {object} options - An object containing optional parameters to pass to the `getPangeneLookupFormData` function.
 * @returns {Promise} A `Promise` that resolves to the `PangeneLookupFormData` used by the `LisPangeneLookupElement`
 * (`<lis-pangene-lookup-element>`) Web Components.
 */
export function getPangeneLookupFormDataFunction(queryData={}, options={}) {
  return getPangeneLookupFormData(queryData, options)
    .then(({data}) => chromosomeDataToPangeneFormData(data));
}


/** The GraphQL query used to get pangene sets for the pangene lookup Web Component. */
const getGenePangeneSetsQuery = `
query PangenesetsQuery($identifiers: [ID!]!) {
  getGenes(identifiers: $identifiers) {
    results {
      identifier
      panGeneSets {
        identifier
      }
    }
  }
}
`;



/** The GraphQL query used to pan genes for the pangene lookup Web Component. */
export const getPangenePairsQuery = `
  query PangenesQuery($identifiers: [ID!]!, $genus: String, $species: String, $strain: String, $assembly: String, $annotation: String, $page: Int, $pageSize: Int) {
    panGenePairs(identifiers: $identifiers, genus: $genus, species: $species, strain: $strain, assembly: $assembly, annotation: $annotation, page: $page, pageSize: $pageSize) {
      results {
        query {
          identifier
        }
        panGeneSet {
          identifier
        }
        result {
          identifier
        }
      }
      resultsInfo {
        identifierCounts {
          identifier
          count
        }
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


/** A helper that actuale makes the GraphQL requests that get pangenes. */
function makePangenesRequests(identifiers, variables, {abortSignal}, limit = 100) {
  // run the queries
  const pangenesetQuery = query(getGenePangeneSetsQuery, {identifiers}, abortSignal);
  const pangeneQuery = query(getPangenePairsQuery, variables, abortSignal);
  return Promise.all([pangenesetQuery, pangeneQuery]);
}


/**
 * Gets pangenes from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getPangenes(queryData={}, options={}) {
  const {genus, species, strain, assembly, annotation, genes: identifiers, page, pageSize} = queryData;
  const variables = {
    identifiers,
    genus,
    species,
    strain,
    assembly,
    annotation,
    page,
    pageSize,
  };
  const {abortSignal} = options;
  // makes the GraphQL requests and process the results
  return makePangenesRequests(identifiers, variables, {abortSignal});
}


/**
 * Converts GraphQL `PangenesResults` into the `PaginatedSearchResults<PangeneLookupResult[]>` used by the
 * `LisPaneneLookupElement` (`<lis-pangene-lookup-element>`) Web Component.
 * @param {object} geneData - An object containing the data portional of the gene GraphQL query HTTP response.
 * @param {object} pairData - An object containing the data portional of the gene pair GraphQL query HTTP response.
 * @returns {object} A `PaginatedSearchResults<PangeneLookupResult[]>` object.
 */
export function pangenesDataToLookupResults(identifiers, geneData, pairData) {
  const {getGenes: {results: setResults}} = geneData;
  const {panGenePairs: {results: geneResults, resultsInfo, pageInfo}} = pairData;
  // convert the result genes into the expected format
  const results = geneResults.map(({
      query: {identifier: input},
      panGeneSet: set,
      result,
  }) => {
      let panGeneSet = "";
      let target = "";
      if (set != null) {
        panGeneSet = set.identifier;
        if (result != null) {
          target = result.identifier;
        }
      }
      return {input, panGeneSet, target};
  });
  // check that a gene was found for each query identifier
  const queryGenes = setResults.map(({identifier}) => identifier);
  const identifiersMatched =
    resultsInfo.identifierCounts
      .filter(({count}) => count > 0)
      .map(({identifier}) => identifier);
  const errors = identifiers.reduce((accumulator, identifier) => {
      const i = queryGenes.indexOf(identifier);
      if (i === -1) {
          accumulator.push(`"${identifier}" is not a valid gene identifier`);
      } else if (setResults[i].panGeneSets.length === 0) {
          accumulator.push(`"${identifier}" does not belong to a pangene set`);
      } else if (identifiersMatched.indexOf(identifier) === -1) {
          accumulator.push(`No matching targets found in a pangene set for "${identifier}"`);
      }
      return accumulator;
  }, []);
  // extract the page info
  const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
    = pageInfo;
  // construct the expected search results object
  return {
    results,
    errors,
    hasNext,
    numResults,
    pageSize,
    numPages,
    results,
  };
}


/**
 * The pangene lookup function to use for the `lookupFunction` property of the `LisPangeneLookupElement`
 * (`<lis-pangene-lookup-element>`) Web Component.
 * @param {object} queryData - An object containing data from the submitted lookup form.
 * @param {object} options - An object containing optional parameters to pass to the `getPangenes` function.
 * @returns {Promise} A `Promise` that resolves to the `PaginatedSearchResults<PangeneLookupResult[]>` used by the
 * `LisPangeneLookupElement` (`<lis-pangene-lookup-element>`) Web Component.
 */
export function pangeneLookupFunction(queryData, options={}) {
  const {genes} = queryData;
  return getPangenes({...queryData, pageSize: 10}, options)
    .then(([{data: geneData}, {data: pairData}]) => pangenesDataToLookupResults(genes, geneData, pairData));
}


/**
 * Creates the `pangeneLookupFunction` with the given callbacks applied to the returned `Promise`.
 * @param {...Function} callbacks - The callback function to apply to the returned `Promise`.
 * @returns {Promise} The `Promise` returned by the `geneSearchFunction` with the callbacks applied.
 */
export function pangeneLookupFunctionFactory(...callbacks) {
  return (queryData, options={}) => {
    let promise = pangeneLookupFunction(queryData, options);
    callbacks.forEach((callback) => {
      promise = promise.then(callback);
    });
    return promise;
  };
}


/**
 * Creates a callback function that can be used with the `pangeneLookupFunctionFactory` function
 * to convert `inputs` in the `PaginatedSearchResults<PangeneLookupResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function inputGeneModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({input, ...pairInfo}) => {
      const data = {identifier: input, type: 'gene'};
      return {
        ...pairInfo,
        input: modalLink(modalId, input, data),
      }
    });
    return {...pageInfo, results};
  }
}


/**
 * Creates a callback function that can be used with the `pangeneLookupFunctionFactory` function
 * to convert `panGeneSets` in the `PaginatedSearchResults<PangeneLookupResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function panGeneSetModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({panGeneSet, ...pairInfo}) => {
      const data = {identifier: panGeneSet, type: 'panGeneSet'};
      return {
        ...pairInfo,
        panGeneSet: modalLink(modalId, panGeneSet, data),
      }
    });
    return {...pageInfo, results};
  }
}


/**
 * Creates a callback function that can be used with the `pangeneLookupFunctionFactory` function
 * to convert `targets` in the `PaginatedSearchResults<PangeneLookupResult[]>` into links that
 * open a modal with the given `modalId`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function} The created callback function.
 */
export function targetGeneModalLinkFactory(modalId) {
  return ({results: oldResults, ...pageInfo}) => {
    const results = oldResults.map(({target, ...pairInfo}) => {
      const data = {identifier: target, type: 'gene'};
      return {
        ...pairInfo,
        target: modalLink(modalId, target, data),
      }
    });
    return {...pageInfo, results};
  }
}


/**
 * Creates all callback functions that can be used with the `pangeneLookupFunctionFactory` function
 * to add modal links to the `PaginatedSearchResults<PangeneLookupResult[]>`.
 * @param {string} modalId - The HTML `id` of the target modal element.
 * @returns {Function[]} The created callback functions.
 */
export function pangeneAllModalLinksFactory(modalId) {
  return [
    inputGeneModalLinkFactory(modalId),
    panGeneSetModalLinkFactory(modalId),
    targetGeneModalLinkFactory(modalId),
  ];
}


/**
 * The pangene download function to use for the `downloadFunction` property of the `LisPangeneLookupElement`
 * (`<lis-pangene-lookup-element>`) Web Component.
 * @param {object} queryData - An object containing data from the submitted lookup form.
 * @param {object} options - An object containing optional parameters to pass to the `getPangenes` function.
 * @returns {Promise} A `Promise` that resolves to the `SearchResults<PangeneLookupResult[]>` used by the
 * `LisPangeneLookupElement` (`<lis-pangene-lookup-element>`) Web Component.
 */
export function pangeneDownloadFunction(queryData, options={}) {
  const {genes} = queryData;
  const {page, pageSize, ...downloadData} = queryData;

  const request = getPangenes(downloadData, options)
    .then(([{data: geneData}, {data: pairData}]) => pangenesDataToLookupResults(genes, geneData, pairData));

  // convert the results into a file and download it
  request.then(({results}) => {
    const filename = 'pangenes.tsv';
    const tsvContent =
      "input\tpanGeneSet\ttarget\n" +
      results.map(({input, panGeneSet, target}) => `${input}\t${panGeneSet}\t${target}`)
        .join('\n');
    downloadFile(filename, tsvContent);
  });

  // send the results to the component so it can react
  return request;
}
