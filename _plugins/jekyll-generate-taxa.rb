#!/usr/bin/env ruby

# This script reads a template index file, which uses Jekyll/Liquid to build pages for each genus. 
# The script replaces the string "TAXON_NAME" with a particular taxon, and writes the index file
# to the genus directory in taxon/GENUS/ .

html_template = "_plugins/template_genus_index.html"

Dir["_data/taxa/*"].each do |path|
  taxon_name = File.basename(path)
  puts taxon_name
  
  taxon_dir_out = "taxa/" + taxon_name
  Dir.mkdir taxon_dir_out unless Dir.exists?(taxon_dir_out)
  
  taxon_index_file = taxon_dir_out + "/index.html"
  File.new(taxon_index_file, 'w') 
  idx_FH = File.open(taxon_index_file, 'w') 
  
  tax_idx_text = File.read(html_template)
  specific_idx_text = tax_idx_text.gsub(/TAXON_NAME/, "#{taxon_name}")
  idx_FH.write( specific_idx_text )
  idx_FH.close
end

