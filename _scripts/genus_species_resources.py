import yaml
import os

## This script assumes that datastore-metadata has been cloned in the current directory.

# assume we're running in jekyll-legumeinfo/_scripts directory
taxonListFile = "../_data/taxon_list.yml"

# load taxon list
f = open(taxonListFile, 'r')
taxonList = yaml.load(f.read(), Loader=yaml.FullLoader)

## genus loop
for taxon in taxonList:
    print("##########")
    print("## "+taxon["description"])
    print("## "+taxon["genus"])
    print("## "+taxon["category"])

    genusResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/genus_resources.yml"
    speciesResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/species_resources.yml"

    genusResourcesFile = open(genusResourcesFilename, 'w')
    speciesResourcesFile = open(speciesResourcesFilename, 'w')

    genusDescriptionFile = "datastore-metadata/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
    gdf = open(genusDescriptionFile, 'r')
    genusDescription = yaml.load(gdf.read(), Loader=yaml.FullLoader)
    print("---", file=genusResourcesFile)
    yaml.dump(genusDescription, genusResourcesFile)
    ## species loop
    print("---", file=speciesResourcesFile)
    print("species:", file=speciesResourcesFile)
    speciesDescriptions = []
    for species in genusDescription["species"]:
        speciesDescriptionFile = "datastore-metadata/"+taxon["genus"]+"/"+species+"/about_this_collection/description_"+taxon["genus"]+"_"+species+".yml"
        sdf = open(speciesDescriptionFile, 'r')
        speciesDescription = yaml.load(sdf.read(), Loader=yaml.FullLoader)
        speciesDescriptions.append(speciesDescription)
    ## dump out species_resources.yml
    yaml.dump(speciesDescriptions, speciesResourcesFile)
