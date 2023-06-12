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
