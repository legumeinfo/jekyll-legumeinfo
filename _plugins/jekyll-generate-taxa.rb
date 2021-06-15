#!/usr/bin/env ruby

require 'fileutils'

Dir["_data/taxa/*"].each do |path|
  taxon_name = File.basename(path)
  
  taxon_dir_out = "taxa/" + taxon_name
  #puts taxon_dir_out
  Dir.mkdir taxon_dir_out unless Dir.exists?(taxon_dir_out)

  taxon_index_file = taxon_dir_out + "/index.html"
  puts taxon_index_file
  File.new(taxon_index_file, 'w') 

  ind_file = File.open(taxon_index_file, 'w') 

  puts taxon_name
  tax_idx_text = <<-HEREDOC
---
layout: default
title: #{taxon_name}
---

<h2><i>#{taxon_name}</i></h2>

<h3>Tools and resources for the genus as a whole</h3>
{% if site.data.taxa.#{taxon_name}.genus_resources %}
{% assign genus_resources = site.data.taxa.#{taxon_name}.genus_resources %}
<dt>
  {% for item in genus_resources %}
    {% for feature in item.taxon_features %}
      <dd><h4><i>{{ feature.name }}</i> ({{ feature.display_name }})</h4></dd>
    {% endfor %}
    {% for resource in item.resources %}
      <dd><a href="{{ resource.URL }}">{{ resource.name }}</a> ({{ resource.description }})</dd>
    {% endfor %}
  {% endfor %}
</dt>
{% endif %}

<h3>Tools and resources for particular species</h3>
{% if site.data.taxa.#{taxon_name}.species_resources %}
{% assign species_resources = site.data.taxa.#{taxon_name}.species_resources %}
<dt>
  {% for item in species_resources %}
    {% for taxon in item.taxa %}
      <dd><strong>{{ taxon.name }}</strong> ({{ taxon.display_name }})</dd>
      {% for resource in taxon.resources %}
        <dd><u>{{ resource.name }}</u></dd>
        {% for accession in resource.accessions %}
          <dd>{{ accession.name }} ({{ accession.description }})</dd>
          {% for version in accession.versions %}
            <dd>&nbsp; &nbsp; 
              Assembly {{ version.name }}: 
            </dd>
            <dd>&nbsp; &nbsp; 
              {% for instance in version.instances %}
                <a href="{{ instance.URL }}">{{ instance.name }}</a>; 
              {% endfor %}
            </dd>
          {% endfor %}
        {% endfor %}
      {% endfor %}
      <br>
    {% endfor %}
  {% endfor %}
</dt>
{% endif %}

HEREDOC
  
  ind_file.write( tax_idx_text )
  ind_file.close
end

