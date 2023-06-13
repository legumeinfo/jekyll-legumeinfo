// gene description search query for the LIS GraphQL API
const geneQuery = `
      query GeneQuery($identifier: String, $name: String, $description: String, $genus: String, $species: String, $strain: String, $family: String, $start: Int, $size: Int) {
        genes(genus: $genus, species: $species, strain: $strain, identifier: $identifier, name: $name, description: $description, geneFamilyIdentifier: $family, start: $start, size: $size) {
          name
          identifier
          description
          organism { genus species }
          strain { identifier }
          geneFamilyAssignments { geneFamily { identifier } }
          locations { chromosome { identifier } supercontig { identifier } start end strand }
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
    const pageSize = 10;
    const start = (page-1)*pageSize;
    // pageSize+1 because we want to see if there's a "next" page
    const variables = {
        genus,
        species,
        strain,
        identifier,
        description,
        family,
        start,
        size: pageSize+1
    };
    // returns a Promise that resolves to an array of Gene objects the gene search
    // Web Component knows how to parse: {name: string, description: string}[]
    return graphqlQuery(uri, geneQuery, variables, abortSignal)
        .then(({data}) => {
            // compute if there's a next page
            const hasNext = pageSize+1 === data.genes.length;
            // remove the lookahead result
            if (hasNext) data.genes.pop();
            // flatten results
            const results =
		  data.genes.map(({organism: {genus, species}, strain, ...gene}) => {
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
            const paginatedResults = {hasNext, results};
            return paginatedResults;
        });
}
