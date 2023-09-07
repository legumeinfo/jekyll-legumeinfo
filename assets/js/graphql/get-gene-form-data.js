// uses the LIS GraphQL API to get data used to construct the gene search form
const geneFormDataQuery = `
      query FormDataQuery {
        organisms {
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

function getGeneFormData({abortSignal}) {
    return graphqlQuery(uri, geneFormDataQuery, {}, abortSignal)
        .then(({data}) => {
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
        });
}
