---
layout: blog-post
title: GO Enrichment
author: Steven Cannon
date: 2024-07-01
summary: SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.
---

<span class="uk-text-bold">GO enrichment analysis</span> uses statistical tests to determine if a set of provided genes are statistically different than a comparison set (typically, the set of all genes in the organism), for each of the three main gene ontology aspects.

<a href="https://geneontology.org/docs/ontology-documentation/" target="_blank">Gene Ontology (GO)</a> is a classification system that describes three <span class="uk-text-bold">aspects</span> of gene function:

<ul class="uk-list uk-list-disc">
  <li><span class="uk-text-bold">Molecular Function</span>, describing activities such as <a href="https://amigo.geneontology.org/amigo/term/GO:0003824" target="_blank">catalytic activity</a> or finer-scale activities such as <a href="https://amigo.geneontology.org/amigo/term/GO:0004465" target="_blank">lipoprotein lipase activity</a>;</li>
  <li><span class="uk-text-bold">Cellular Component</span>, describing cellular components such as the <a href="https://amigo.geneontology.org/amigo/term/GO:0005856" target="_blank">cytoskeleton</a>, or finer-scale locations such as <a href="https://amigo.geneontology.org/amigo/term/GO:0005813" target="_blank">centrosome</a>;</li>
  <li><span class="uk-text-bold">Biological Process</span>, describing biological programs such as <a href="https://amigo.geneontology.org/amigo/term/GO:0007165" target="_blank">signal transduction</a>, or finer-scale processes such as <a href="https://amigo.geneontology.org/amigo/term/GO:0004674" target="_blank">protein serine/threonine kinase activity</a>.</li>
</ul>

SoyBase offers two methods for calculating GO enrichment.

<h2>1. Use the custom service at the SoyBase tools page</h2>
The <a href="/tools/analysis/go.html target="_blank>tools/analysis/go.html</a> page offers services for annotating your gene list with GO accessions and for calculating GO enrichment, using the method described in <a href="https://dx.doi.org/10.1071/FP12296" target="_blank">Morales et al. (2013)</a>. The gene IDs need to be from the Wm82.a4.v1 assembly and annotation (aka Wm82.gnm4.ann1). Try the provided sample identifiers at the page to see the results.

<h2>2. Use the GO enrichment tool at GlycineMine.</h2>
At [GlycineMine](https://mines.legumeinfo.org/glycinemine/begin.do), enrichment can be calculated for genes from ANY <i>Glycine</i> accession and annotation in GlycineMine (there are more than 50 annotation sets as of mid-2024).

Here are the steps.

<h3>1. Enter a gene list under Analyze a List.</h3>

Open <a href="https://mines.legumeinfo.org/glycinemine/begin.do" target="_blank">GlycineMine</a>, and paste a list of genes in the central box ("Analyze a List"). The list can consist of un-prefixed gene IDs such as <code class="uk-text-primary">Glyma.01G022700</code>, but if that gene exists in multiple assemblies or annotation sets, you will see an intermediate page in which you will be asked to select which genes you want to analyze. Therefore, it is generally best to prefix your identifiers with the following four, dot-separated fields: <code class="uk-text-primary">Genusspecies.Accession.Assemblyversion.Annotationversion.GeneID</code> <code class="uk-text-primary">glyma.Wm82.gnm4.ann1.Glyma.01G022700</code>

Also note that the identifiers should be <span class="uk-text-bold">gene IDs</span> rather than <span class="uk-text-bold">mRNAs</span> these are typically distinguished by a numeric suffix. That is: use gene <code class="uk-text-primary">Glyma.01G022700</code> rather than mRNA <code class="uk-text-primary">Glyma.01G022700.1</code>

Try one of the gene lists below:
<ul class="uk-list uk-list-disc">
  <li><a href="#list1">List 1</a></li>
  <li><a href="#list2">List 2</a></li>
  <li><a href="#list3">List 3</a></li>
</ul>

<h3>2. Name and save the list.</h3>
You can use the provided name if you wish (based on date and time), or you can give it a more meaningful name. Then click the green "<b>Save a list of 10 Genes</b>" button. (Note that if you register with GlycineMine you will be able to save your gene list so that you can use the same list over and over again on the same tool or use that list on various GlycineMine tools.)

<h3>3. Examine the Gene Ontology Enrichment results.</h3>
The report page will give descriptive information about each gene; and near the bottom of the page are four reports: "Gene Ontology Enrichment", "Gene Family Enrichment", "Pathway Enrichment", and "Chromosome Distribution".

In the "Gene Ontology Enrichment" box, be sure to check each ontology aspect that you wich to evaluate:
<ul class="uk-list uk-list-disc">
  <li>biological_process</li>
  <li>cellular_component</li>
  <li>molecular_function</li>
</ul>

It is common for a set of genes to show enrichment for one aspect and not others.

<hr>
<div>
  <p class="uk-text-bold">List 1:</p><a name="list1"></a>
  <p>
  glyma.Wm82.gnm4.ann1.Glyma.01G022700, glyma.Wm82.gnm4.ann1.Glyma.01G035000, 
  glyma.Wm82.gnm4.ann1.Glyma.01G041400, glyma.Wm82.gnm4.ann1.Glyma.01G041450, 
  glyma.Wm82.gnm4.ann1.Glyma.01G042100, glyma.Wm82.gnm4.ann1.Glyma.01G081600, 
  glyma.Wm82.gnm4.ann1.Glyma.01G081700, glyma.Wm82.gnm4.ann1.Glyma.01G105000, 
  glyma.Wm82.gnm4.ann1.Glyma.01G112500, glyma.Wm82.gnm4.ann1.Glyma.01G113400
  </p>

  <button class="uk-button uk-button-primary uk-button-small" type="button" uk-toggle="target: #list-1; animation: uk-animation-fade; cls: uk-hidden" onclick="rotateTriangle(this)" value="triangle-icon-list-1">Results for List 1, showing `biological_process`<span id="triangle-icon-list-1" uk-icon="icon:triangle-right" class="toggle-top-margin"></span></button>
  <div id="list-1" class="uk-margin-small uk-hidden">
    <img class="uk-width-2-3" id="toggle-usage" src="/assets/img/blog_images/GO_set1_biological.gif"  alt="result list 1"/>
  </div>
</div>
<hr>

<div>
  <p class="uk-text-bold">List 2:</p><a name="list2"></a>

  <p>
  glyma.Wm82.gnm4.ann1.Glyma.01G128700, glyma.Wm82.gnm4.ann1.Glyma.01G155300, 
  glyma.Wm82.gnm4.ann1.Glyma.03G041600, glyma.Wm82.gnm4.ann1.Glyma.03G146200, 
  glyma.Wm82.gnm4.ann1.Glyma.05G158300, glyma.Wm82.gnm4.ann1.Glyma.08G116000, 
  glyma.Wm82.gnm4.ann1.Glyma.09G194900, glyma.Wm82.gnm4.ann1.Glyma.09G279900, 
  glyma.Wm82.gnm4.ann1.Glyma.11G089400, glyma.Wm82.gnm4.ann1.Glyma.13G162500
  </p>

  <button class="uk-button uk-button-primary uk-button-small" type="button" uk-toggle="target: #list-2; animation: uk-animation-fade; cls: uk-hidden" onclick="rotateTriangle(this)" value="triangle-icon-list-2">Results for List 1, showing `cellular_component`<span id="triangle-icon-list-2" uk-icon="icon:triangle-right" class="toggle-top-margin"></span></button>
  <div id="list-2" class="uk-margin-small uk-hidden">
    <img class="uk-width-2-3" src="/assets/img/blog_images/GO_set2_cellular.gif" alt="reulst list 2"/>
  </div>
</div>
<hr>

<div>
<b>List 3:</b><a name="list3"></a>

<p>
glyma.Wm82.gnm4.ann1.Glyma.01G032400, glyma.Wm82.gnm4.ann1.Glyma.01G032900, 
glyma.Wm82.gnm4.ann1.Glyma.01G033200, glyma.Wm82.gnm4.ann1.Glyma.01G033300, 
glyma.Wm82.gnm4.ann1.Glyma.01G039000, glyma.Wm82.gnm4.ann1.Glyma.01G046900, 
glyma.Wm82.gnm4.ann1.Glyma.01G060300, glyma.Wm82.gnm4.ann1.Glyma.01G112200, 
glyma.Wm82.gnm4.ann1.Glyma.01G112300, glyma.Wm82.gnm4.ann1.Glyma.01G125300
</p>

  <button class="uk-button uk-button-primary uk-button-small" type="button" uk-toggle="target: #list-3; animation: uk-animation-fade; cls: uk-hidden" onclick="rotateTriangle(this)" value="triangle-icon-list-3">Results for List 1, showing `molecular_function`<span id="triangle-icon-list-3" uk-icon="icon:triangle-right" class="toggle-top-margin"></span></button>
  <div id="list-3" class="uk-margin-small uk-hidden">

  <img class="uk-width-2-3" src="/assets/img/blog_images/GO_set3_molecular.gif" alt="result list 3"/>
  </div>
</div>



<script >
// This is built for Toggle buttons icon
// Used to rotate the triangle icon inside the button.
function rotateTriangle(e){
    let id = e.value
    const icon = document.getElementById(id);
    if (icon.style.transform === 'rotate(90deg)') {
      icon.style.transform = 'rotate(0deg)'
    } else {
      icon.style.transform = 'rotate(90deg)'
    }
  }
 
</script>