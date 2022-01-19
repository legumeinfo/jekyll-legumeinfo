import yaml
import requests
from html.parser import HTMLParser

DATASTORE_URL = "https://data.legumeinfo.org"

class CollectionsParser(HTMLParser):
    collections = []
    def handle_starttag(self, tag, attrs):
        for attr in attrs:
            if ((attr[0]=='href' and "/annotations/" in attr[1])
                or (attr[0]=='href' and "/diversity/" in attr[1])
                or (attr[0]=='href' and "/expression/" in attr[1])
                or (attr[0]=='href' and "/genetic/" in attr[1])
                or (attr[0]=='href' and "/genomes/" in attr[1])
                or (attr[0]=='href' and "/markers/" in attr[1])):
                self.collections.append(attr[1])

# instantiate our HTML parser
parser = CollectionsParser()

# assume jekyll-legumeinfo is next door
taxonListFile = "../_data/taxon_list.yml"

# load taxon list
f = open(taxonListFile, 'r')
taxonList = yaml.load(f.read(), Loader=yaml.FullLoader)

for taxon in taxonList:
    genusDescriptionUrl = DATASTORE_URL+"/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
    genusDescriptionResponse = requests.get(genusDescriptionUrl)
    if genusDescriptionResponse.status_code==200:
        genusDescription = yaml.load(genusDescriptionResponse.text, Loader=yaml.FullLoader)
        speciesCollectionsFilename = "../_data/taxa/"+taxon["genus"]+"/species_collections.yml"
        speciesCollectionsFile = open(speciesCollectionsFilename, 'w')
        print('---', file=speciesCollectionsFile)
        print('species:', file=speciesCollectionsFile)
        for species in genusDescription["species"]:
            print("### "+taxon["genus"]+" "+species)
            print('- '+'name: '+species, file=speciesCollectionsFile)
            speciesUrl = DATASTORE_URL+"/"+taxon["genus"]+"/"+species
            for collectionType in ["annotations", "diversity", "expression", "genetic", "genomes", "markers"]:
                print('  '+collectionType+':', file=speciesCollectionsFile)
                collectionsUrl = speciesUrl+"/"+collectionType+"/"
                collectionsResponse = requests.get(collectionsUrl)
                if collectionsResponse.status_code==200:
                    parser.collections = []
                    parser.feed(collectionsResponse.text)
                    for collectionDir in parser.collections:
                        # /Arachis/hypogaea/annotations/Tifrunner.gnm1.ann1.CCJH/
                        parts = collectionDir.split('/')
                        name = parts[4]
                        # README.Tifrunner.gnm1.ann1.CCJH.yml
                        readmeUrl = DATASTORE_URL+collectionDir+"README."+name+".yml"
                        readmeResponse = requests.get(readmeUrl)
                        if readmeResponse.status_code==200:
                            readme = yaml.load(readmeResponse.text, Loader=yaml.FullLoader)
                            synopsis = readme["synopsis"]
                            print('    - collection: '+name, file=speciesCollectionsFile)
                            print('      synopsis: "'+synopsis+'"', file=speciesCollectionsFile)




