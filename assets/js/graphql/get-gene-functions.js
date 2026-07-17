import { query } from './query.js';

// uses the LIS GraphQL API to get data used to construct the search form
export const formDataQuery = `
  query FormDataQuery {
    organisms {
      results {
        genus
        species
      }
    }
  }
`;

export function getGeneFunctionFormDataFunction({abortSignal}) {
  return query(formDataQuery, {}, abortSignal)
    .then(({data}) => {
      // bin the strains by genus then species
      const binnedFormData = {};
      data.organisms.results.forEach(({genus, species}) => {
        if (!(genus in binnedFormData)) {
          binnedFormData[genus] = [];
        }
        binnedFormData[genus].push(species);
      });
      // collapse the bins into arrays of objects
      const genuses =
        Object.entries(binnedFormData).map(([genus, binnedSpecies]) => {
          const species = binnedSpecies.map((species) => {
            return {species};
          });
          return {genus, species};
        });
      // return the expected form data object
      return {genuses};
    });
}

const geneFunctionQuery = `
  query GeneFunctions($symbol: String, $trait: String, $gene: String, $genus: String, $species: String, $author: String, $publicationId: String, $page: Int, $pageSize: Int) {
    geneFunctions(symbol: $symbol, trait: $trait, gene: $gene, genus: $genus, species: $species, publicationId: $publicationId, author: $author, page: $page, pageSize: $pageSize) {
      pageInfo {
        currentPage
        pageSize
        numResults
        pageCount
        hasPreviousPage
        hasNextPage
      }
      results {
        genes {
          name
          identifier
        }
        symbol
        identifier
        synonyms
        symbolLong
        pubName
        synopsis
        traits {
          name
        }
        publications {
          title
          citation
          doi
        }
      }
    }
  }
`;

// search function
export function getGeneFunctions(searchData,{abortSignal}) {
  const variables = {
    symbol: null,
    trait: searchData['traits'],
    gene: searchData['geneIdentifier'],
    genus: searchData['genus'],
    species: searchData['species'],
    publicationId: searchData['pubId'],
    author: searchData['author'],
    page: searchData['page'],
    pageSize: 10
  };
  // shim the results for the Web Component
  return query(geneFunctionQuery, variables, abortSignal)
    .then(({data}) => {
      // extract the page info
      const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
        = data.geneFunctions.pageInfo;
      // flatten results
      const results = 
        data.geneFunctions.results.map(({symbol, symbolLong, identifier, pubName, genes, synopsis, traits, synonyms, publications}) => {
          return {
            geneSymbols: [{value: symbol, identifier}, ...synonyms.filter(i => ![symbol, symbolLong].includes(i)).map(s => ({value: s, linkable: false}))],
            geneSymbolDescription: symbolLong,
            geneModelPubName: pubName,
            geneModelFullName: genes[0]?.identifier || '',
            synopsis,
            traits: traits.map(t => t.name).join(', '),
            citations: publications,
          };
        });
        
        
        // construct the expected paginated results object
        const paginatedResults = {hasNext, numResults, pageSize, numPages, results};
        return paginatedResults;
    });          
}
