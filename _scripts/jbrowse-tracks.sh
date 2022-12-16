#!/bin/sh
set -o errexit -o nounset

readonly DATASTORE_URL=https://data.legumeinfo.org

# convert YAML "key: value" into shell assignments
yaml2sh() { 
   sed -n -e 's/: *"*/='"'"'/' -e 's/ *"* *$/'"'"'/' -e '/=/p' "${@}"
}

for readme in _data/datastore-metadata/Glycine/*/genomes/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    npx jbrowse add-assembly \
      ${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})/${scientific_name_abbrev}.${identifier}.genome_main.fna.gz \
      --name=${identifier%.*} \
      --type=bgzipFasta \
      --out=assets/js/jbrowse
  )
done

for readme in _data/datastore-metadata/Glycine/*/annotations/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    npx jbrowse add-track \
      ${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})/${scientific_name_abbrev}.${identifier}.gene_models_main.gff3.gz \
      --assemblyNames=${identifier%.ann[0-9].*} \
      --category='Genes' \
      --trackId=${identifier%.*} \
      --description="${synopsis}" \
      --out=assets/js/jbrowse
  )
done

# FIXME: too big & slow to generate for testing
# https://github.com/GMOD/jbrowse-components/issues/3019
#npx jbrowse text-index \
#  --perTrack \
#  --tracks='...' \
#  --attributes='Name'