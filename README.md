# Jekyll Example
This repository is an example of how a static website can built with [Jekyll](https://jekyllrb.com/).

To clone this repo:

    git clone --recurse-submodules https://github.com/legumeinfo/jekyll-legumeinfo.git


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
This Jekyll site uses the [Legume Information System Jekyll theme](https://github.com/legumeinfo/jekyll-theme-legumeinfo).
Unfortunately, this means this site (and any others that use the theme) can not be hosted on GitHub Pages because the theme is not on GitHub's whitelist.
C'est la vie.
