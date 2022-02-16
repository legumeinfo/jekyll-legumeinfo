# legumeinfo.org
This repository holds the [Jekyll](https://jekyllrb.com/) site hosted at legumeinfo.org.

## Running the Site
The following methods will run the site on your computer at http://localhost:4000.
Changes made will be immediately reflected in the browser due to [LiveReload](http://livereload.com/).

### Ruby
You can run the site with Ruby as follows:

    gem install bundler jekyll
    bundle install
    bundle exec jekyll serve

### Docker
You can run the site with Docker as follows:

    docker-compose up -d

## Theme
This site uses a modified version of the [Legume Information System Jekyll theme](https://github.com/legumeinfo/jekyll-theme-legumeinfo).

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
