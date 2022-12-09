#!/bin/sh

set -o errexit

readonly URL_PREFIX=https://data.legumeinfo.org/Glycine

cd assets/js/jbrowse

########################################
# Wm82_ISU01.gnm2
########################################

npx jbrowse add-assembly \
  ${URL_PREFIX}/max/genomes/Wm82_ISU01.gnm2.JFPQ/glyma.Wm82_ISU01.gnm2.JFPQ.genome_main.fna.gz \
  --name='Wm82_ISU01.gnm2' \
  --displayName='Williams 82 ISU01 Assembly 2' \
  --type=bgzipFasta

npx jbrowse add-track \
  ${URL_PREFIX}/max/annotations/Wm82_ISU01.gnm2.ann1.FGFB/glyma.Wm82_ISU01.gnm2.ann1.FGFB.gene_models_main.gff3.gz \
  --assemblyNames='Wm82_ISU01.gnm2' \
  --category='Genes' \
  --trackId='Wm82_ISU01.gnm2.ann1' \
  --name='Gene models - Glyma.Wm82_ISU01.gnm2.ann1' \
  --description='Annotation was retrieved from the DOE JGI.'

# FIXME: too big & slow to generate for testing
# https://github.com/GMOD/jbrowse-components/issues/3019
#npx jbrowse text-index \
#  --perTrack \
#  --tracks='Wm82_ISU01.gnm2.ann1' \
#  --attributes='Name'
