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
This site uses code copied from the [Legume Information System Jekyll theme](https://github.com/legumeinfo/jekyll-theme-legumeinfo).

## Tools
LIS "tools" are webapps hosted separately from the Jekyll site, e.g. https://zzbrowse.legumeinfo.org. In order for the user to have a way to
remain or return to the main LIS site, tools will be launched in a new tab if they do not provide the following in their header (with SequenceServer
shown as a concrete example):
```
      <!-- LIS site nav -->
      <div style="float:left;">
        <a href="https://legumeinfo.org/"><img src="https://legumeinfo.org/assets/img/lis-logo-small.png" alt="LIS - Legume Information System"/></a>
      </div>
      <div style="float:left;margin-left:5px;padding-top:5px;font-family:ProximaNova,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;">
        <div style="font-size:20px">LIS - Legume Information System</div>
        <div style="font-size:12px">Information about legume traits for crop improvement</div>
      </div>
      <!-- /LIS site nav -->
      <div style="float:left;margin-left:20px;">
        <!-- your tool nav -->
        <a class="navbar-brand" href="https://sequenceserver.com" target="_blank">
          <img class="logo" src="SequenceServer_logo.png" alt="sequenceserver_logo">
          <small>
            <%= SequenceServer::VERSION %>
          </small>
        </a>
        <!-- /your tool nav -->
      </div>
```
