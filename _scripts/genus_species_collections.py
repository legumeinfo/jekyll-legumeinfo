import yaml
import os

## This script assumes that datastore-metadata has been cloned in the current directory.

# assume we're running in jekyll-legumeinfo/_scripts directory
taxonListFile = "../_data/taxon_list.yml"

# load taxon list
f = open(taxonListFile, 'r')
taxonList = yaml.load(f.read(), Loader=yaml.FullLoader)

print("##########")
for taxon in taxonList:
    # genus description file lists species
    genusDescriptionFile = "datastore-metadata/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
    gdf = open(genusDescriptionFile, 'r')
    genusDescription = yaml.load(gdf.read(), Loader=yaml.FullLoader)
    speciesCollectionsFilename = "../_data/taxa/"+taxon["genus"]+"/species_collections.yml"
    speciesCollectionsFile = open(speciesCollectionsFilename, 'w')
    print('---', file=speciesCollectionsFile)
    print('species:', file=speciesCollectionsFile)
    for species in genusDescription["species"]:
        print("## "+taxon["genus"]+" "+species)
        print('- '+'name: '+species, file=speciesCollectionsFile)
        speciesDir = "datastore-metadata/"+taxon["genus"]+"/"+species
        for collectionType in ["genomes", "annotations", "diversity", "expression", "gwas", "qtl", "markers", "maps"]:
            collectionsDir = speciesDir+"/"+collectionType+"/"
            if os.path.isdir(collectionsDir):
                print('  '+collectionType+':', file=speciesCollectionsFile)
                for collection in sorted(os.listdir(collectionsDir)):
                    readmeFile = collectionsDir+collection+"/"+"README."+collection+".yml"
                    rf = open(readmeFile, 'r')
                    readme = yaml.load(rf.read(), Loader=yaml.FullLoader)
                    synopsis = readme["synopsis"]
                    print('    - collection: '+collection, file=speciesCollectionsFile)
                    print('      synopsis: "'+synopsis+'"', file=speciesCollectionsFile)
