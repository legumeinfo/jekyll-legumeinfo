import yaml
import requests

DATASTORE_URL = "https://data.legumeinfo.org"

# assume jekyll-legumeinfo is next door
taxonListFile = "../_data/taxon_list.yml"

# load taxon list
f = open(taxonListFile, 'r')
taxonList = yaml.load(f.read(), Loader=yaml.FullLoader)

for taxon in taxonList:
    print("##########")
    print("## "+taxon["description"])
    print("## "+taxon["genus"])
    print("## "+taxon["category"])

    genusResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/genus_resources.yml"
    speciesResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/species_resources.yml"

    genusResourcesFile = open(genusResourcesFilename, 'w')
    speciesResourcesFile = open(speciesResourcesFilename, 'w')

    genusDescriptionUrl = DATASTORE_URL+"/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
    genusDescriptionResponse = requests.get(genusDescriptionUrl)
    if genusDescriptionResponse.status_code==200:
        genusDescription = yaml.load(genusDescriptionResponse.text, Loader=yaml.FullLoader)
        print("---", file=genusResourcesFile)
        yaml.dump(genusDescription, genusResourcesFile)
        ## species loop
        print("---", file=speciesResourcesFile)
        print("species:", file=speciesResourcesFile)
        speciesDescriptions = []
        for species in genusDescription["species"]:
            speciesDescriptionUrl = DATASTORE_URL+"/"+taxon["genus"]+"/"+species+"/about_this_collection/description_"+taxon["genus"]+"_"+species+".yml"
            speciesDescriptionResponse = requests.get(speciesDescriptionUrl)
            if speciesDescriptionResponse.status_code==200:
                speciesDescription = yaml.load(speciesDescriptionResponse.text, Loader=yaml.FullLoader)
                speciesDescriptions.append(speciesDescription)
        ## dump out species_resources.yml
        yaml.dump(speciesDescriptions, speciesResourcesFile)
