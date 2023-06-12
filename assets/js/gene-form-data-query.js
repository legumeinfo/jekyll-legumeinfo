// uses the LIS GraphQL API to get data used to construct the gene search form
const geneFormDataQuery = `
      query FormDataQuery {
        organisms {
          genus
          species
          strains {
            identifier
          }
        }
      }
      `;
