import yaml
import requests

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
    
    # https://legumeinfo.org/data/v2/Arachis/GENUS/about_this_collection/description_Arachis_sp.yml
    # organism.taxid: 3817
    # organism.genus: Arachis
    # organism.commonName:    Arachis
    # organism.description:   The genus Arachis contains approximately 69 species, distributed in South America east of the Andes,...

    # https://legumeinfo.org/data/v2/Arachis/cardenasii/about_this_collection/description_Arachis_cardenasii.yml
    # ---
    # organism.taxid:	51121
    # organism.genus:	Arachis
    # organism.species:	cardenasii
    # organism.abbrev:	araca
    # organism.commonName:	Mani silvestre (wild peanut)
    # organism.description:	Arachis cardenasii Krapov. & W.C. Greg. is a wild peanut relative native to Bolivia...

    genusResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/genus_resources.yml"
    speciesResourcesFilename = "../_data/taxa/"+taxon["genus"]+"/species_resources.yml"

    genusResourcesFile = open(genusResourcesFilename, 'w')
    speciesResourcesFile = open(speciesResourcesFilename, 'w')

    genusDescriptionUrl = "https://legumeinfo.org/data/v2/"+taxon["genus"]+"/GENUS/about_this_collection/description_"+taxon["genus"]+".yml"
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
            speciesDescriptionUrl = "https://legumeinfo.org/data/v2/"+taxon["genus"]+"/"+species+"/about_this_collection/description_"+taxon["genus"]+"_"+species+".yml"
            speciesDescriptionResponse = requests.get(speciesDescriptionUrl)
            if speciesDescriptionResponse.status_code==200:
                speciesDescription = yaml.load(speciesDescriptionResponse.text, Loader=yaml.FullLoader)
                speciesDescriptions.append(speciesDescription)
        ## dump out species_resources.yml
        yaml.dump(speciesDescriptions, speciesResourcesFile)
