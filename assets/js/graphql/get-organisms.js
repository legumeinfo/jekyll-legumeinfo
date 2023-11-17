import { query } from './query.js';


/** The GraphQL query used to get organisms. */
export const getOrganismsQuery = `
  query OganismsQuery($taxonId: Int, $abbreviation: String, $name: String, $genus: String, $species: String, $page: Int, $pageSize: Int) {
  organisms(taxonId: $taxonId, abbreviation: $abbreviation, name: $name, genus: $genus, species: $species, page: $page, pageSize: $pageSize) {
      results {
        genus
        species
        strains {
          identifier
        }
      }
    }
  }
  `;


/**
 * Gets organisms from GraphQL.
 * @param {object} queryData - An object containing zero or more variables for the GraphQL query.
 * @param {object} pageData - An object containing pagination data for the GraphQL query, if any.
 * @param {object} options - An object containing optional parameters for the HTTP request,
 * namely, an optional `AbortSignal` instance that can be used to cancel the request mid-flight.
 * @returns {Promise} A `Promise` that resolves to the result of the GraphQL query.
 */
export function getOrganisms(queryData={}, pageData={}, options={}) {
  const {taxonId, abbreviation, name, genus, species} = queryData;
  const {page, pageSize} = pageData;
  const variables = {
    taxonId,
    abbreviation,
    name,
    genus,
    species,
    page,
    pageSize,
  };
  const {abortSignal} = options;
  return query(getOrganismsQuery, variables, abortSignal);
}


/**
 * Converts GraphQL `OrganismsResults` into the `*SearchFormData` used by the
 * `LisGeneSearchElement` (`<lis-gene-search-element>`) Web Component.
 * @param {object} data - An object containing the data portional of the GraphQL query HTTP response.
 * @returns {object} A `*SearchFormData` object.
 */
export function organismsDataToFormData(data) {
  // bin the strains by genus then species
  const binnedFormData = {};
  data.organisms.results.forEach(({genus, species, strains}) => {
    if (!(genus in binnedFormData)) {
      binnedFormData[genus] = {}
    }
    if (!(species in binnedFormData[genus])) {
      binnedFormData[genus][species] = [];
    }
    binnedFormData[genus][species].push(...strains);
  });
  // collapse the bins into arrays of objects
  const genuses =
    Object.entries(binnedFormData).map(([genus, binnedSpecies]) => {
      const species =
        Object.entries(binnedSpecies).map(([species, strainObjects]) => {
          const strains = strainObjects.map(({identifier}) => {
            return {strain: identifier};
          });
          return {species, strains};
        });
      return {genus, species};
    });
  // return the expected form data object
  return {genuses};
}


/**
 * The organisms form data function to use for the `formDataFunction` property of the `LisGeneSearchElement`
 * (`<lis-gene-search-element>`) Web Component.
 * @param {object} queryData - An object containing the data needed to get organisms.
 * @param {object} pageData - An object containing pagination data for the GraphQL query, if any.
 * @param {object} options - An object containing optional parameters to pass to the `getOrganisms` function.
 * @returns {Promise} A `Promise` that resolves to the `*SearchFormData` used by the `LisGeneSearchElement`
 * (`<lis-gene-search-element>`) Web Component.
 */
export function getOrganismsFormDataFunction(queryData={}, pageData={}, options={}) {
  return getOrganisms(queryData, pageData, options)
    .then(({data}) => organismsDataToFormData(data));
}
