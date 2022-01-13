import yaml
import requests
from html.parser import HTMLParser

class CollectionsParser(HTMLParser):
    collections = []
    # Start tag: a
    #      attr: ('href', '/data/v2/Arachis/hypogaea/annotations/Fuhuasheng.gnm1.XX5Y/')
    #      attr: ('href', '/data/v2/Arachis/hypogaea/diversity/Fuhuasheng.gnm1.XX5Y/')
    #      attr: ('href', '/data/v2/Arachis/hypogaea/expression/Fuhuasheng.gnm1.XX5Y/')
    #      attr: ('href', '/data/v2/Arachis/hypogaea/genetic/Fuhuasheng.gnm1.XX5Y/')
    #      attr: ('href', '/data/v2/Arachis/hypogaea/genomes/Fuhuasheng.gnm1.XX5Y/')
    #      attr: ('href', '/data/v2/Arachis/hypogaea/markers/Fuhuasheng.gnm1.XX5Y/')
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
    # https://legumeinfo.org/data/v2/Arachis/GENUS/about_this_collection/description_Arachis.yml
    # ---
    # species:
    #   - hypogaea
    #   - duranensis
    #   - ipaensis
    #   - cardenasii
    genusDescriptionUrl = "https://legumeinfo.org/data/v2/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
    genusDescriptionResponse = requests.get(genusDescriptionUrl)
    if genusDescriptionResponse.status_code==200:
        genusDescription = yaml.load(genusDescriptionResponse.text, Loader=yaml.FullLoader)
        ## species loop
        # ---
        # species:
        # - name: hypogaea
        #   annotations:
        #     - collection: Tifrunner.gnm1.ann1.CCJH
        #       synopsis: "Synopsis for Tifrunner.gnm1.ann1.CCJH"
        #     - collection: Tifrunner.gnm2.ann1.4K0L
        #       synopsis: "Synopsis for Tifrunner.gnm2.ann1.4K0L"
        #   genomes:
        #   expression:
        #   genetic:
        #   markers:
        #   synteny:
        #   diversity:
        speciesCollectionsFilename = "../_data/taxa/"+taxon["genus"]+"/species_collections.yml"
        speciesCollectionsFile = open(speciesCollectionsFilename, 'w')
        print('---', file=speciesCollectionsFile)
        print('species:', file=speciesCollectionsFile)
        for species in genusDescription["species"]:
            print("### "+taxon["genus"]+" "+species)
            print('- '+'name: '+species, file=speciesCollectionsFile)
            speciesUrl = "https://legumeinfo.org/data/v2/"+taxon["genus"]+"/"+species
            for collectionType in ["annotations", "diversity", "expression", "genetic", "genomes", "markers"]:
                print('  '+collectionType+':', file=speciesCollectionsFile)
                collectionsUrl = speciesUrl+"/"+collectionType+"/"
                collectionsResponse = requests.get(collectionsUrl)
                if collectionsResponse.status_code==200:
                    parser.collections = []
                    parser.feed(collectionsResponse.text)
                    ## parser.collections = [
                    # '/data/v2/Arachis/hypogaea/genomes/Fuhuasheng.gnm1.XX5Y/',
                    # '/data/v2/Arachis/hypogaea/genomes/Shitouqi.gnm1.L4VP/',
                    # '/data/v2/Arachis/hypogaea/genomes/Tifrunner.gnm1.KYV3/',
                    # '/data/v2/Arachis/hypogaea/genomes/Tifrunner.gnm2.J5K5/'
                    # ]
                    for collectionDir in parser.collections:
                        parts = collectionDir.split('/')
                        name = parts[6]
                        # README.Huayu28_x_P76.gen.Hu_Zhang_2018.yml
                        readmeUrl = "https://legumeinfo.org"+collectionDir+"README."+name+".yml"
                        readmeResponse = requests.get(readmeUrl)
                        if readmeResponse.status_code==200:
                            readme = yaml.load(readmeResponse.text, Loader=yaml.FullLoader)
                            synopsis = readme["synopsis"]
                            print('    - collection: '+name, file=speciesCollectionsFile)
                            print('      synopsis: "'+synopsis+'"', file=speciesCollectionsFile)




