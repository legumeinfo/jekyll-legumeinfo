# soybase.org
This repository holds the [Jekyll](https://jekyllrb.com/) site hosted at www.soybase.org.

## Deployment
Commits to the `main` branch will trigger a GitHub Action workflow that build the static site & deploy to the dev.soybase.org branch.
This branch is hosted via GitHub Pages at https://dev.soybase.org.

When a tag is pushed, a GitHub Action workflow will build the static site & deploy to the [soybase/soybase.org](https://github.com/soybase/soybase.org) repository.
This branch is hosted via GitHub Pages at https://www.dev.soybase.org.

## Development
### Local (macOS)
The site is styled using a custom [UIkit](https://getuikit.com/) theme, which requires UIkit's SCSS files.
As such, UIkit is a submodule of this repository and must be cloned with the repository:
```console
git clone --recurse-submodules https://github.com/soybase/jekyll-soybase.git
```

The following methods will run the site on your computer at http://localhost:4001.
Changes made will be immediately reflected in the browser due to [LiveReload](http://livereload.com/).

```sh
    make install # one-time installation of dependencies into vendor/
    make         # Starts jekyll server listening on localhost:4001
```

### GitHub Codespaces
When creating a [GitHub Codespace](https://github.com/features/codespaces) on a branch, a [Dev Container](https://containers.dev/) has been defined to automatically install the software environment defined in the Gemfile, start `jekyll serve --incremental` in a terminal to enable interactive development, and open Simple Browser to display the site.

Due to an incompatibility between `jekyll serve --livereload` and GitHub Codespaces port forwarding, a browser reload is necessary to reflect any changes made to site code.

If the `jekyll serve` process terminates, or needs to be restarted (e.g., due to updating _config.yml), stop the `jekyll serve` process in the terminal (if it is still executing) and execute the following manually in a terminal:

```sh
    bundle exec jekyll serve --incremental
```

## Theme
This site uses a modified version of the [Legume Information System Jekyll theme](https://github.com/legumeinfo/jekyll-theme-legumeinfo).

## News Posts
News posts are plain text markdown with a YAML header, created by adding a file under `news/_posts/` with a name of the format `yyyy-mm-dd-unique-identifier.md`.
For example:
```
---
layout: news-item
title: Tepary bean genomes added to LIS
author: Sam Hokin
date: 2021-10-01 17:00
summary: Phaseolus acutifolius (tepary bean) added to LIS
---
[Phaseolus acutifolius (tepary bean)](/taxa/phaseolus) is a drought- and heat-tolerant crop
native to the American Southwest and Mexico; it joins the growing set of annotated genomes at LIS,
with a cultivated and wild accession described in [Moghaddam et al. 2021](https://doi.org/10.1038/s41467-021-22858-x).
The cultivated accession has been added as the primary representative of the species.
```
You can place blank lines in the content to generate paragraphs. Images are not supported in news items.

## Announcements
Announcements are just like news posts, created by adding a file under `announcements/_posts` with a name of the format `yyyy-mm-dd-unique-identifier.md`.
For example:
```
---
layout: announcement-item
title: BIC & NAPIA Biennial meeting 2-4 November, 2021 (virtual)
author: Sam Hokin
date: 2021-11-02
summary: BIC & NAPIA Biennial meeting will be held virtually, 2-4 November, 2021
---
2 - 4 November 2021:
[BIC & NAPIA Biennial meeting](https://www.bic-napia.org/), Virtual Meeting
```
You can place blank lines in the content to generate paragraphs. Images are not supported in announcements.

## Blog Posts
Blog posts are created by adding a file named `blog/_posts/yyyy-mm-dd-unique-identifier.md`.

A blog post has a YAML header which provides key information. For example, a post with the filename `2018-09-10-macrosynteny-gcv.md` has the following header:
```
---
layout: blog-item
title: Bringing Macrosynteny to the GCV Multi-view
author: Andrew Farmer
date: 2018-09-10
summary: The multi-alignment view of the Genome Context Viewer has been updated to support visualization of multi-way macrosynteny between the chromosomes from which microsyntenic segments were taken.
---
```
The resulting blog URL generated for this post is then `/blog/2018/09/10/macrosynteny-gcv.html`. The main `/blog` page provides a list of blog posts, most recent first.

The blog content is plain text entered below the header. Blank lines will generate paragraph tags in the generated HTML as you'd wish. However, a bit more work is required to place
images in your post:

 - place the image file under `assets/img/blog_images/`
 - use the normal HTML img tag in your content
 - wrap the image inside a `blog-image` div (so we have consistent placement, margins, and border)
 - wrap optional attribution in a `attribution` div below the image
 
Here's an example of a short post with an image which includes attribution:
```
The Genomic Context Viewer (GCV) is a web application that provides interactive and synchronized comparative genomics visualizations.

<div class="blog-image">
  <img src="/assets/img/blog_images/instructions-gcv.gif" alt="Screen capture of the GCV user interface"/>
  <div class="attribution">&copy; 2018 NCGR</div>
</div>

Comparisons are performed by determining conservation of gene order and orientation across related species or individuals using homology based on gene family assignments....
```
