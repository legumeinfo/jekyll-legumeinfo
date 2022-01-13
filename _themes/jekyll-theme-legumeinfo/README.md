# jekyll-theme-legumeinfo

Welcome to the Legumeinfo Jekyll theme!
The theme contains the styles and templates for the [Legume Information System (LIS)](https://legumeinfo.org/) -- an online data portal that houses various omics data of legume species relevant to industrial agriculture.
The theme is hosted separately from the Legumeinfo Jekyll site so that it may used by other biological data portals.


## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "jekyll-theme-legumeinfo"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: jekyll-theme-legumeinfo
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install jekyll-theme-legumeinfo

## Usage

See the [Jekyll website](https://jekyllrb.com/) for an introduction to Jekyll.
A Jekyll site that uses the Legumeinfo theme should have the following directory structure:

```
root/
├── assets/
│   ├── css/
│   ├── icons/
│   │   └── favicon.ico
│   ├── img/
│   └── js/
├── _data/
│   ├── taxa_main.yml
│   ├── taxa_special.yml
│   └── tools.yml
├── _includes
│   ├── global-scripts.html
│   ├── global-stylesheets.html
│   └── navbar-items.html
├── news/
│   └── _posts/
│       └── very-important-news-14-09-2021.md
├── announcements/
│   └── _posts/
│       └── big-annoucnement-14-09-2021.md
├── index.html
├── Gemfile
└── _config.yml
```

### `assets/`

The assets directory holds static assets that may be used in templates.

**`css/`** The Legumeinfo Jekyll theme uses the [UIkit css framework](https://getuikit.com/).
As such, all contents of the framework are available in the templates you define in your site.
You may add additional styling by saving custom styles in Cascading Style Sheet (`.css`) files in the `assets/css/` directory and importing the files in the templates you want to use them in:

```liquid
<link rel="stylesheet" href="{{ "assets/css/custom.css" | relative_url }}" type="text/css" />
```

**`icons/`** The `icons/` directory is intended to hold any icons you may want to use in your site.
However, there are certain icons the Legumeinfo Jekyll theme will specifically look for in this directory.
Specifically, in addition to the `favicon.ico`, the Legumeinfo Jekyll theme will attempt to load the following icons from the `assets/icons/` directory:

  * `apple-touch-icon-57x57.png`
  * `apple-touch-icon-114x114.png`
  * `apple-touch-icon-72x72.png`
  * `apple-touch-icon-144x144.png`
  * `apple-touch-icon-60x60.png`
  * `apple-touch-icon-120x120.png`
  * `apple-touch-icon-76x76.png`
  * `apple-touch-icon-152x152.png`
  * `apple-touch-icon-180x180.png`
  * `favicon-192x192.png`
  * `favicon-160x160.png`
  * `favicon-96x96.png`
  * `favicon-16x16.png`
  * `favicon-32x32.png`

**`img/`** The `img/` directory is intended to hold images that you want to use in your templates.
To do so, simply copy the image files in the `assets/img/` directory (or a subdirectory) and include them in the template where you want to use them:

```liquid
<img src="{{ "assets/img/lupine.jpg" | relative_url }}" />
```

**`js/`** Though Jekyll is a static site generator, dynamic behavior can be added via JavaScript.
The `js/` directory is intended to hold JavaScript (`.js`) files that you may want to include in you templates.
To include custom JavaScript in your site, put your scripts in the `assets/js/` directory and include them in the templates you want to use them in:

```liquid
<script src="{{ "assets/js/my-webcomponent.js" | relative_url }}"></script>
```

### `_data/`

The `_data/` directory is used by Jekyll to load static data that is not accommodated by its blog model.
The Legumeinfo Jekyll theme expects two files to be in this directory: `species.yml` and `tools.yml`.

**`taxa_main.yml` and `taxa_special.yml`** These files contains a list of taxa (genera) that the data portal provides 
omics data for. The taxa_main file contains major crop and models; taxa_special contains everything else.
The list should adhere to the following schema pattern:

```
---
- genus: Arachis
  description: "(peanut: domesticated and wild)"
- genus: Cajanus
  description: "(pigeonpea)"
- genus: Cicer
  description: "(chickpea)"
- genus: Glycine
  description: "(soybean)"
```

Note that the species aren't automatically listed anywhere in the theme.
We recommend overriding the navbar `_includes/navbar-items.html` file to add a link to a species template that lists the species.
See the [Legumeinfo Jekyll site code](https://github.com/legumeinfo/jekyll-example) for examples of [overriding the `_includes/navbar-items.html` file](https://github.com/legumeinfo/jekyll-example/blob/main/_includes/navbar-items.html) and [iterating the species in a template](https://github.com/legumeinfo/jekyll-example/blob/main/species/index.html).

**`tools.yml`** This file contains a list of tools that are provided by the data portal and links to them.
The list should adhere to the following schema:

```
---
- category: Browse and Search
  name: Gene Families
  description: Description
  url: "#"
- category: Browse and Search
  name: Genome Context Viewer
  description: Browser for dynamically discovering and viewing genomic synteny across
    selected species.
  url: "#"
- category: Search sequences and features against sequence databases
  name: BLAST Sequence Search
  description: Description
  url: "#"
```

By default these tools will be listed in a vertical menu on the left side of every page in the site.
The tools within the list will be grouped by category.

### `_include/`

The `_include/` directory is used by Jekyll to place globally-included content onto the site. These files will replace the files of the same name in the theme.

**`navbar-items.html`** contains the navigation bar items seen on every page.

**`global-scripts.html`** and **`global-stylesheets.html`** contain scripts and styles to be included on every page.

### `news/` and `announcements/`

Jekyll is "blog aware," meaning it has built in support for blog-esque content.
The Legumeinfo Jekyll theme uses this support for news and announcements.
To create a news item or an announcement, add an HTML file to the `news/_posts/` or `announcements/_posts/` directory, respectively.
The filename should contain an [ISO formatted date](https://en.wikipedia.org/wiki/ISO_8601#Dates) and a title, such as `news/_posts/2021-2-24-sensational-news.html`.
Additionally, the files must contain a YML preamble with `layout`, `title`, `author`, `date`, and `summary` entries.
For example, `news/_posts/2021-2-24-sensational-news.html` may have the preamble:

```yaml
---
layout:     news-item
title:      Sensational News!
author:     Alan Cleary
date:       2021-02-24
summary:    This news is sensational! Everyone will talk about it... but it changes nothing.
---
```

Note that the `layout` entry has the value `news-item`.
This defines a layout provided by the Legumeinfo Jekyll theme for news items, thus all news items should specify the `news-item` layout.
Similarly, there is a `post` layout for announcements.
All announcements should specify the `post` layout.

Note, the most recent news items and announcements will be listed in cards on the right side of the homepage.
These cards contain links to `news/index.html` and `announcements/index.html`, respectively.
It is left to users of the theme to implement these templates.
See the [Legumeinfo Jekyll site code](https://github.com/legumeinfo/jekyll-example) for example implementations of [`news/index.html`](https://github.com/legumeinfo/jekyll-example/blob/main/news/index.html) and [`announcements/index.html`](https://github.com/legumeinfo/jekyll-example/blob/main/announcements/index.html) pages.

### `index.html`

`index.html` is the homepage for the site.
It should contain a YML preamble with `title` and `layout` entries.
For example:

```yaml
---
title: Home
layout: home
---
```

The `layout` entry should always specify the `home` layout for the homepage, though you can specify the `default` layout if you want the same layout but without the news and announcements cards on the right side of the page.

### `Gemfile`

The `Gemfile` should be auto-generated when you create your Jekyll site.
As described above, you'll need to add the Legumeinfo Jekyll theme GEM as a dependency in your `Gemfile`.

### `_config.yml`

The `_config.yml` should be auto-generated when you create your Jekyll site.
This file contains configuration information used by both Jekyll and the Legumeinfo Jekyll theme.
The Legumeinfo Jekyll theme supports the following entries:

* `title: String (the title used for all pages and shown in the site navbar)`
* `subtitle (optional): String (the subtitle shown in the site navbar)`
* `logo (optional): String (the URL to the site's logo image)`
* `email (optional): String (how users may contact the maintainers of the site)`
* `description: String (the description used in the site meta)`
* `baseurl: String (the subpath of your site, e.g. /blog)`
* `url: String (the base hostname & protocol for your site, e.g. http://example.com)`
* `twitter\_username (optional): String (the site's Twitter handle for social media links)`
* `github\_username (optional): String (the site's GitHub handle for social media links)`
* `newsletter (optional): String (the URL to where users can sign up for your site's newsletter)`

As described above, you'll need to add the Legumeinfo Jekyll theme in your `\_config.yml`.

### Layouts

In general, a page can be added to a Jekyll site simply creating a new HTML file.
The URL of the page will correspond to its directory structure and the name of the HTML file.
However, every page must contain a YML preamble that, at a minimum, defines the layout that should be used via the `layout` entry.
The Legumeinfo Jekyll theme provides the following layouts:

* `announcements`
* `default`
* `home`
* `news-item`
* `news`
* `page`
* `post`

It is recommend that each page uses the `default` layout unless the page corresponds to a previously described page that has a specific layout.

### Configuration via Front Matter

The theme allows configuration of specific pages via [front matter variables](https://jekyllrb.com/docs/front-matter/).
The following variables are currently supported:

* `tools_menu (optional): Boolean (shows the vertical tools menu on any page using the default template)`
* `news_card (optional): Boolean (shows the news card on the home page)`
* `announcements_card (optional): Boolean (shows the announcements card on the home page)`

Note, [front matter default values](https://jekyllrb.com/docs/configuration/front-matter-defaults/) can be set in the `_config.yml` file.
For example, the following would show the vertical tools menu every page that uses the default template:

```yml
defaults:
  -
    scope:
      path: ""
    values:
      tools_menu: true
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/legumeinfo/jekyll-theme-legumeinfo. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop the Legumeinfo Jekyll  theme, run `bundle install`.

The theme is setup just like a normal Jekyll site!
To test the theme, run `bundle exec jekyll serve` and open your browser at [`http://localhost:4000`](http://localhost:4000).
This starts a Jekyll server using the Legumeinfo Jekyll theme.
Add pages, documents, data, etc. like normal to test the theme's contents.
As you make modifications to the theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When the theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to the theme-gem, please edit the regexp in `jekyll-theme-legumeinfo.gemspec` accordingly.

## License

The Legumeinfo Jekyll theme is available as open source under the terms of the [Apache-2.0 License](https://opensource.org/licenses/Apache-2.0).

