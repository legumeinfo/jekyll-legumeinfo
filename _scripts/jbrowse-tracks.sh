#!/bin/sh
set -o errexit -o nounset

readonly DATASTORE_URL=https://data.legumeinfo.org
readonly GBROWSE_DATA_URL=https://www.soybase.org/gbrowse_data

# convert YAML "key: value" into shell assignments
yaml2sh() { 
   sed -n -e 's/: *"*/='"'"'/' -e 's/ *"* *$/'"'"'/' -e '/=/p' "${@}"
}

mkdir -p assets/js/jbrowse/refNameAliases

for readme in _data/datastore-metadata/Glycine/*/genomes/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    cd assets/js/jbrowse

    assembly_name=${scientific_name_abbrev}.${identifier%.*}
    datastore_dir_url=${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})
    refNameAliases=refNameAliases/${assembly_name}.txt

    # reference name aliases file must exist and be relative to jbrowse
    # directory to be found at load time and served to client
    while [ $((i=${i:-0}+1)) -le 20 ]
    do
      printf '%s.%s%02i\t%s%02i\n' "${assembly_name}" "${chromosome_prefix}" ${i} "${chromosome_prefix}" ${i}
    done > "${refNameAliases}"

    jbrowse add-assembly \
      "${datastore_dir_url}/${scientific_name_abbrev}.${identifier}.genome_main.fna.gz" \
      --name="${identifier%.*}" \
      --type=bgzipFasta \
      --refNameAliases="${refNameAliases}"

    # https://github.com/GMOD/jbrowse-components/discussions/3570
    node -e '
    let j = JSON.parse(fs.readFileSync("config.json"), {encoding: "utf-8"})
    j.assemblies.find((assembly) => assembly.name == process.argv[1]).sequence.adapter.metadataLocation = {"uri": process.argv[2], "locationType": "UriLocation"}
    fs.writeFileSync("config.json", JSON.stringify(j))' \
    "${identifier%.*}" "${datastore_dir_url}/${readme##*/}"
  )
done

for readme in _data/datastore-metadata/Glycine/*/annotations/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    jbrowse add-track \
      ${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})/${scientific_name_abbrev}.${identifier}.gene_models_main.gff3.gz \
      --assemblyNames=${identifier%.ann[0-9].*} \
      --category='Genes' \
      --trackId=${identifier%.*} \
      --description="${synopsis}" \
      --config=$(printf '{"displays":[{"displayId":"%s","renderer":{"maxHeight":3000}}]}' "${identifier%.*}") \
      --out=assets/js/jbrowse
  )
done

for readme in _data/datastore-metadata/Glycine/*/markers/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    jbrowse add-track \
      ${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})/${scientific_name_abbrev}.${identifier}.gff3.gz \
      --assemblyNames=${identifier%.mrk.*} \
      --category='Markers' \
      --name=${identifier##*.} \
      --trackId=${identifier} \
      --description="${synopsis}" \
      --out=assets/js/jbrowse
  )
done

for synteny_md5 in _data/datastore-metadata/Glycine/*/synteny/*/CHECKSUM.*.md5
do
  assembly_name=${synteny_md5##*/CHECKSUM.}
  assembly_name=${assembly_name%.syn.*}

  while read -r checksum file
  do
    [ ${file%.gff3.gz} = ${file} ] && continue # skip if not a GFF3 file
    name=${file##*.x.}
    name=${name%.*.gff3.gz}
    jbrowse add-track \
      ${DATASTORE_URL}/$(dirname ${synteny_md5#_data/datastore-metadata/})/${file#*/} \
      --assemblyNames=${assembly_name} \
      --category='Synteny' \
      --name=${name} \
      --trackId=${name} \
      --description="Synteny with ${name}" \
      --out=assets/js/jbrowse/
  done < ${synteny_md5}
done

for diversity_md5 in _data/datastore-metadata/Glycine/*/diversity/*/CHECKSUM.*.md5
do
  case ${diversity_md5##*/} in CHECKSUM.glyma.*) continue;; esac # skip collections with extra CHECKSUM files
  readme=${diversity_md5%/*}/README.$(basename ${diversity_md5##*/CHECKSUM.} .md5).yml
  description=$(sed -n -e 's/"//' -e 's/^description: *//p' ${readme})
  assembly_name=${diversity_md5##*/CHECKSUM.}
  assembly_name=${assembly_name%.div.*}

  while read -r checksum file
  do
    case ${file} in
    *.vcf.gz)
      trackId=$(basename ${file} .vcf.gz)
      name=${trackId##*.div.}
      jbrowse add-track \
        ${DATASTORE_URL}/$(dirname ${diversity_md5#_data/datastore-metadata/})/${file#*/} \
        --assemblyNames=${assembly_name} \
        --category='Diversity' \
        --name=${name} \
        --trackId=${trackId} \
        --description="${description}" \
        --out=assets/js/jbrowse/ ;;
    esac
  done < ${diversity_md5}
done

# FIXME: too big & slow to generate for testing
# https://github.com/GMOD/jbrowse-components/issues/3019
#npx jbrowse text-index \
#  --perTrack \
#  --tracks='...' \
#  --attributes='Name'
