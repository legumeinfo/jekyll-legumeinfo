// directly query an LIS linkout service:
// https://github.com/legumeinfo/microservices/tree/main/linkouts

// production gene linkout URI should be only one that is ever used
const geneLinkoutUri = 'https://linkouts.services.legumeinfo.org/gene_linkouts';

// production genomie region linkout URI should be only one that is ever used
const genomicRegionLinkoutUri = 'https://linkouts.services.legumeinfo.org/genomic_region_linkouts';

// A function that gets linkouts for a list of gene identifiers
function geneLinkouts(genes, abortSignal=undefined) {
  return fetch(geneLinkoutUri, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({genes}),
      signal: abortSignal,
  }).then((response) => response.json());
}

// A function that gets linkouts for a list of genomic regions of the form seqid:start-end
function genomicRegionLinkouts(genomicRegions, abortSignal=undefined) {
  return fetch(genomicRegionLinkoutUri, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({genomicRegions}),
      signal: abortSignal,
  }).then((response) => response.json());
}
