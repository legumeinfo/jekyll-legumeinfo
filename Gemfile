source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.3.2"
gem "jekyll-theme-legumeinfo", path: "./_themes/jekyll-theme-legumeinfo"
gem "logger", "~> 1.7.0"
gem "csv", "~> 3.3.4"
gem "base64", "~> 0.2.0"
gem "bigdecimal", "~> 3.1.8"
# XCode 16 has bundler 1.17.2, so omit version
gem "bundler"

# If you have any plugins, put them here!
group :jekyll_plugins do
  ## generates pages based on files under _data
  gem "jekyll-datapage-generator", "~> 1.4.0"
  # FIXME: jekyll-sitemap doesn't work with liquid.strict_variables: true
  # https://github.com/jekyll/jekyll-sitemap/issues/272
  gem "jekyll-sitemap", "~> 1.4.0"
  gem "jekyll-redirect-from", "~> 0.16.0"
  gem "jekyll-feed", "~> 0.17.0"
end

group :test do
  if RUBY_PLATFORM =~ /.*darwin/
    # html-proofer 5.x requires ruby >= 3.1
    gem "html-proofer", "= 4.4.3"
  else
    gem "html-proofer", "~> 5.0"
  end

  if RUBY_PLATFORM =~ /arm64.*darwin/
    # install nokogiri from source for macos system/Xcode ruby (2.6.10p210) on arm64,
    # as otherwise nokogiri-1.13.10-x86_64-darwin.gem is installed
    gem "nokogiri", :git => "https://github.com/sparklemotion/nokogiri.git", :tag => "v1.13.10"
    gem "mini_portile2", "= 2.8.6"
    gem "ffi", "= 1.16.3"
    # pin jekyll dependency jekyll-sass-converter, as 3.0.0 won't work on macos
    # aarch64 ultimately due to dependency on google-protobuf, which isn't available
    # for aarch64 due to this issue:
    # https://github.com/protocolbuffers/protobuf/issues/9397
    gem "jekyll-sass-converter", "= 2.2.0"
  end
end
