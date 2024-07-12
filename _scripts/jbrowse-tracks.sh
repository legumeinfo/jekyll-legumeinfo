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
    datastore_dir_url=${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})
    jbrowse add-track \
      ${datastore_dir_url}/${scientific_name_abbrev}.${identifier}.gene_models_main.gff3.gz \
      --assemblyNames=${identifier%.ann[0-9].*} \
      --category='Genes' \
      --trackId=${identifier%.*} \
      --description="${synopsis}<br /><br /><b>more info:</b> ${datastore_dir_url}/" \
      --config=$(printf '{"displays":[{"displayId":"%s","renderer":{"maxHeight":3000}}]}' "${identifier%.*}") \
      --out=assets/js/jbrowse
  )
done

for readme in _data/datastore-metadata/Glycine/*/markers/*/README.*.yml
do
  (
    eval $(yaml2sh ${readme})
    datastore_dir_url=${DATASTORE_URL}/$(dirname ${readme#_data/datastore-metadata/})
    jbrowse add-track \
      ${datastore_dir_url}/${scientific_name_abbrev}.${identifier}.gff3.gz \
      --assemblyNames=${identifier%.mrk.*} \
      --category='Markers' \
      --name=${identifier##*.} \
      --trackId=${identifier} \
      --description="${synopsis}<br /><br /><b>more info:</b> ${datastore_dir_url}/" \
      --out=assets/js/jbrowse
  )
done

for synteny_md5 in _data/datastore-metadata/Glycine/*/synteny/*/CHECKSUM.*.md5
do
  assembly_name=${synteny_md5##*/CHECKSUM.}
  assembly_name=${assembly_name%.syn.*}
  datastore_dir_url=${DATASTORE_URL}/$(dirname ${synteny_md5#_data/datastore-metadata/})

  while read -r checksum file
  do
    [ ${file%.gff3.gz} = ${file} ] && continue # skip if not a GFF3 file
    name=${file##*.x.}
    name=${name%.*.gff3.gz}
    jbrowse add-track \
      ${datastore_dir_url}/${file#*/} \
      --assemblyNames=${assembly_name} \
      --category='Synteny' \
      --name=${name} \
      --trackId=${name} \
      --description="Synteny with ${name}<br /><br /><b>more info:</b> ${datastore_dir_url}/" \
      --out=assets/js/jbrowse/
  done < ${synteny_md5}
done

for diversity_manifest in _data/datastore-metadata/Glycine/*/diversity/*/MANIFEST.*.yml
do
  assembly_name=${diversity_manifest##*/MANIFEST.}
  assembly_name=${assembly_name%.div.*}
  datastore_dir_url=${DATASTORE_URL}/$(dirname ${diversity_manifest#_data/datastore-metadata/})

  awk -v OFS='\t' '
  /^- / && jbrowse { print name, description; name=description=jbrowse="" }
  /^ *- *jbrowse/ { jbrowse=1 }
  sub(/^[^:]* name: */, "") { name=$0 }
  sub(/^[^:]* description: */, "") { description=$0 }
  END { if (jbrowse) print name, description }' "${diversity_manifest}" |
    while read -r file description
    do
      trackId=$(basename ${file} .vcf.gz)
      name=${trackId##*.div.}
      jbrowse add-track \
        ${datastore_dir_url}/${file#*/} \
        --assemblyNames=${assembly_name} \
        --category='Diversity' \
        --name=${name} \
        --trackId=${trackId} \
        --description="${description}<br /><br /><b>more info:</b> ${datastore_dir_url}/" \
        --out=assets/js/jbrowse/
    done
done

for transcription_manifest in _data/datastore-metadata/Glycine/*/transcription/*/MANIFEST.*.yml
do
  assembly_name=${transcription_manifest##*/MANIFEST.}
  assembly_name=${assembly_name%.trnsc.*}
  datastore_dir_url=${DATASTORE_URL}/$(dirname ${transcription_manifest#_data/datastore-metadata/})
  
  awk -v OFS='\t' '
  /^- / && jbrowse { print name, description; name=description=jbrowse="" }
  /^ *- *jbrowse/ { jbrowse=1 }
  sub(/^[^:]* name: */, "") { name=$0 }
  sub(/^[^:]* description: */, "") { description=$0 }
  END { if (jbrowse) print name, description }' "${transcription_manifest}" |
    while read -r file description
    do
      trackId=$(basename ${file} .gff3.gz)
      name=${trackId##*.trnsc.}
      jbrowse add-track \
        ${datastore_dir_url}/${file#*/} \
        --assemblyNames=${assembly_name} \
        --category='Transcription' \
        --name=${name} \
        --trackId=${trackId} \
        --description="${description}<br /><br /><b>more info:</b> ${datastore_dir_url}/" \
        --out=assets/js/jbrowse/
    done
done






# FIXME: too big & slow to generate for testing
# https://github.com/GMOD/jbrowse-components/issues/3019
#npx jbrowse text-index \
#  --perTrack \
#  --tracks='...' \
#  --attributes='Name'
