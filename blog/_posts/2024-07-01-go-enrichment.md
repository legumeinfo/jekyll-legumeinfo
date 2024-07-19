---
layout: blog-post
title: GO Enrichment
author: Steven Cannon
date: 2024-07-01
summary: SoyBase offers two methods for calculating GO enrichment. This post explains these approaches.
---

**GO enrichment analysis** uses statistical tests to determine if a set of provided genes are statistically different than a comparison set (typically, the set of all genes in the organism), for each of the three main gene ontology aspects.

[Gene Ontology (GO)](https://geneontology.org/docs/ontology-documentation/) is a classification system that describes three **aspects** of gene function:
* **Molecular Function**, describing activities such as [catalytic activity](https://amigo.geneontology.org/amigo/term/GO:0003824) or finer-scale activities such as [lipoprotein lipase activity](https://amigo.geneontology.org/amigo/term/GO:0004465);
* **Cellular Component**, describing cellular components such as the [cytoskeleton](https://amigo.geneontology.org/amigo/term/GO:0005856), or finer-scale locations such as [centrosome](https://amigo.geneontology.org/amigo/term/GO:0005813);
* **Biological Process**, describing biological programs such as [signal transduction](https://amigo.geneontology.org/amigo/term/GO:0007165), or finer-scale processes such as [protein serine/threonine kinase activity](https://amigo.geneontology.org/amigo/term/GO:0004674).

SoyBase offers two methods for calculating GO enrichment.

## 1. Use the custom service at the SoyBase tools page
The [tools/analysis/go.html](/tools/analysis/go.html) page offers services for annotating your gene list with GO accessions and for calculating GO enrichment, using the method described in [Morales et al. (2013)](https://dx.doi.org/10.1071/FP12296). The gene IDs need to be from the Wm82.a4.v1 assembly and annotation (aka Wm82.gnm4.ann1). Try the provided sample identifiers at the page to see the results.

## 2. Use the GO enrichment tool at GlycineMine.
At [GlycineMine](https://mines.legumeinfo.org/glycinemine/begin.do), enrichment can be calculated for genes from ANY <i>Glycine</i> accession and annotation in GlycineMine (there are more than 50 annotation sets as of mid-2024).

Here are the steps.

### 1. Enter a gene list under Analyze a List.

Open <a href="https://mines.legumeinfo.org/glycinemine/begin.do" target="_blank">GlycineMine</a>, and paste a list of genes in the central box ("Analyze a List"). The list can consist of un-prefixed gene IDs such as `Glyma.01G022700`, but if that gene exists in multiple assemblies or annotation sets, you will see an intermediate page in which you will be asked to select which genes you want to analyze. Therefore, it is generally best to prefix your identifiers with the following four, dot-separated fields: `Genusspecies.Accession.Assemblyversion.Annotationversion.GeneID` `glyma.Wm82.gnm4.ann1.Glyma.01G022700`

Also note that the identifiers should be **gene IDs** rather than **mRNAs**; these are typically distinguished by a numeric suffix. That is: use gene `Glyma.01G022700` rather than mRNA `Glyma.01G022700.1`

Try one of the gene lists below:
* [List 1](#list1)
* [List 2](#list2)
* [List 3](#list3)


### 2. Name and save the list.
You can use the provided name if you wish (based on date and time), or you can give it a more meaningful name. Then click the green "<b>Save a list of 10 Genes</b>" button. (Note that if you register with GlycineMine you will be able to save your gene list so that you can use the same list over and over again on the same tool or use that list on various GlycineMine tools.)

### 3. Examine the Gene Ontology Enrichment results.
The report page will give descriptive information about each gene; and near the bottom of the page are four reports: "Gene Ontology Enrichment", "Gene Family Enrichment", "Pathway Enrichment", and "Chromosome Distribution".

In the "Gene Ontology Enrichment" box, be sure to check each ontology aspect that you wich to evaluate:
* biological_process
* cellular_component
* molecular_function

It is common for a set of genes to show enrichment for one aspect and not others.

<hr>
<b>List 1:</b><a name="list1"></a>
<p>
glyma.Wm82.gnm4.ann1.Glyma.01G022700, glyma.Wm82.gnm4.ann1.Glyma.01G035000, 
glyma.Wm82.gnm4.ann1.Glyma.01G041400, glyma.Wm82.gnm4.ann1.Glyma.01G041450, 
glyma.Wm82.gnm4.ann1.Glyma.01G042100, glyma.Wm82.gnm4.ann1.Glyma.01G081600, 
glyma.Wm82.gnm4.ann1.Glyma.01G081700, glyma.Wm82.gnm4.ann1.Glyma.01G105000, 
glyma.Wm82.gnm4.ann1.Glyma.01G112500, glyma.Wm82.gnm4.ann1.Glyma.01G113400
</p>

<details><summary>Results for List 1, showing `biological_process`</summary>
<div class="blog-image">
  <img src="/assets/img/blog_images/GO_set1_biological.gif" style="height: 483px; width: 478px;"  />
</div>
</details>

<hr>
<b>List 2:</b><a name="list2"></a>

<p>
glyma.Wm82.gnm4.ann1.Glyma.01G128700, glyma.Wm82.gnm4.ann1.Glyma.01G155300, 
glyma.Wm82.gnm4.ann1.Glyma.03G041600, glyma.Wm82.gnm4.ann1.Glyma.03G146200, 
glyma.Wm82.gnm4.ann1.Glyma.05G158300, glyma.Wm82.gnm4.ann1.Glyma.08G116000, 
glyma.Wm82.gnm4.ann1.Glyma.09G194900, glyma.Wm82.gnm4.ann1.Glyma.09G279900, 
glyma.Wm82.gnm4.ann1.Glyma.11G089400, glyma.Wm82.gnm4.ann1.Glyma.13G162500
</p>

<details><summary>Results for List 2, showing `cellular_component`</summary>
<div class="blog-image">
  <img src="/assets/img/blog_images/GO_set2_cellular.gif" style="height: 483px; width: 478px;"  />
</div>
</details>

<hr>

<b>List 3:</b><a name="list3"></a>

<p>
glyma.Wm82.gnm4.ann1.Glyma.01G032400, glyma.Wm82.gnm4.ann1.Glyma.01G032900, 
glyma.Wm82.gnm4.ann1.Glyma.01G033200, glyma.Wm82.gnm4.ann1.Glyma.01G033300, 
glyma.Wm82.gnm4.ann1.Glyma.01G039000, glyma.Wm82.gnm4.ann1.Glyma.01G046900, 
glyma.Wm82.gnm4.ann1.Glyma.01G060300, glyma.Wm82.gnm4.ann1.Glyma.01G112200, 
glyma.Wm82.gnm4.ann1.Glyma.01G112300, glyma.Wm82.gnm4.ann1.Glyma.01G125300
</p>

<details><summary>Results for List 3, showing `molecular_function`</summary>
<div class="blog-image">
  <img src="/assets/img/blog_images/GO_set3_molecular.gif" style="height: 483px; width: 478px;"  />
</div>
</details>


