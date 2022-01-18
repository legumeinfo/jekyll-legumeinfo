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

    # https://legumeinfo.org/data/v2/Arachis/GENUS/about_this_collection/description_Arachis.yml
    # ---
    # taxid: 3817
    # genus: Arachis
    # commonName: Peanut
    # description: "The genus Arachis contains approximately 69 species, distributed in South America...
    # species:
    #   - hypogaea
    #   - duranensis
    #   - ipaensis
    #   - cardenasii
    # resources:
    #   -
    #     name: PeanutMine
    #     URL: "https://mines.legumeinfo.org/peanutmine/begin.do"
    #     description: "InterMine interface for accessing genetic and genomic data for several species in Arachis."

    # https://legumeinfo.org/data/v2/Arachis/cardenasii/about_this_collection/description_Arachis_cardenasii.yml
    # ---
    # taxid: 51121
    # genus: Arachis
    # species: cardenasii
    # abbrev: araca
    # commonName: Mani silvestre (wild peanut)
    # description: "Arachis cardenasii Krapov. & W.C. Greg. is a wild peanut relative native to Bolivia....
    # strains:
    #   -
    #     identifier: K10017
    #     accession: PI 262141
    #     name: GKP10017
    #     origin: Robore, Bolivia
    #     description: Perennial plant. Taproot deep,  Mainstem erect, with long procumbent lateral branches....

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
