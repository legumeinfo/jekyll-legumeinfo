// gene description search query for the LIS GraphQL API
const geneQuery = `
      query GeneQuery($identifier: String, $name: String, $description: String, $genus: String, $species: String, $strain: String, $family: String, $page: Int, $pageSize: Int) {
        genes(genus: $genus, species: $species, strain: $strain, identifier: $identifier, name: $name, description: $description, geneFamilyIdentifier: $family, page: $page, pageSize: $pageSize) {
          results {
            name
            identifier
            description
            organism { genus species }
            strain { identifier }
            geneFamilyAssignments { geneFamily { identifier } }
            locations { chromosome { identifier } supercontig { identifier } start end strand }
          }
          pageInfo {
            pageSize
            hasNextPage
            numResults
            pageCount
          }
        }
      }
      `;

// the search function given to the LIS gene search Web Component
function getGenes(searchData, page, {abortSignal}) {
    const genus = searchData['genus'];
    const species = searchData['species'];
    const strain = searchData['strain'];
    const identifier = searchData['identifier'];
    const description = searchData['description'];
    const family = searchData['family'];
    const variables = {
        genus,
        species,
        strain,
        identifier,
        description,
        family,
        page,
        pageSize: 10
    };
    // returns a Promise that resolves to an array of Gene objects the gene search
    // Web Component knows how to parse: {name: string, description: string}[]
    return graphqlQuery(uri, geneQuery, variables, abortSignal)
        .then(({data}) => {
            // extract the page info
            const {hasNextPage: hasNext, numResults, pageSize, pageCount: numPages}
                  = data.genes.pageInfo;
            // flatten results
            const results =
                  data.genes.results.map(({organism: {genus, species}, strain, ...gene}) => {
                      const identifier = `<a href="#modal" data-gene="${gene.identifier}" uk-toggle>${gene.identifier}</a>`;
                      const geneFamilyAssignments =
                            gene.geneFamilyAssignments
                            .map(({geneFamily: {identifier}}) => identifier);
                      const locations =
                            gene.locations.map(({chromosome, supercontig, start, end, strand}) => {
                                let location = `unknown`;
                                let type = '';
                                if (chromosome?.identifier) {
                                    location = chromosome?.identifier;
                                    type = 'chromosome';
                                } else if (supercontig?.identifier) {
                                    location = supercontig?.identifier;
                                    type = 'supercontig';
                                }
                                const text = `${location}:${start}-${end} (${strand}) (${type})`;
                                return `<a href="#modal"
                              data-location="${location}"
                              data-start="${start}"
                              data-end="${end}"
                              uk-toggle>${text}</a>`;
                            });
                      return {
                          genus,
                          species,
                          strain: strain.identifier,
                          ...gene,
                          identifier,
                          geneFamilyAssignments,
                          locations,
                      };
                  });
            // construct the expected paginated results object
            const paginatedResults = {hasNext, numResults, pageSize, numPages, results};
            return paginatedResults;
        });
}
