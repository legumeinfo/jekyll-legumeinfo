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

# Specify JSON until @jbrowse/cli has native support for MultiQuantitativeTrack
# https://github.com/GMOD/jbrowse-components/issues/3430
jbrowse add-track-json \
  --out=assets/js/jbrowse \
  /dev/stdin <<'END'
{
  "type": "MultiQuantitativeTrack",
  "trackId": "soybean_gene_expression_atlas_severin_et_al",
  "name": "MultiWig",
  "category": ["Gene Expression"],
  "assemblyNames": ["Wm82.gnm2"],
  "adapter": {
    "type": "MultiWiggleAdapter",
    "bigWigs": [
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/10A_nodule.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/1A_flower.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/2A_cm_pod.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/3A_-2_seed.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/4A_-2_shell.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/5A_-1_seed.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/6A_-1_shell.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/7A_0_seed.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/8A_young_leaf.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/9A_root.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/soy_seed_A1.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/soy_seed_A2.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/soy_seed_A3.bw",
      "https://www.soybase.org/gbrowse_data/gmax2.0/gene_expression/soybean_gene_expression_atlas_severin_et_al/bw/soy_seed_A4.bw"
    ]
  },
  "description": "Transcript density of Glycine max tissues mapped onto the Glyma.Wm82.a2 assembly."
}
END

# FIXME: too big & slow to generate for testing
# https://github.com/GMOD/jbrowse-components/issues/3019
#npx jbrowse text-index \
#  --perTrack \
#  --tracks='...' \
#  --attributes='Name'
