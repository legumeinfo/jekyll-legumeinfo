#!/bin/sh
##
## Run these dnf installs to get all the code you need to compile and serve the LIS Jekyll site.
##
## After these are installed you can run (as a regular user):
## $ gem install bundler jekyll
## $ bundle install [I use sudo auth to install to system RubyGems]
## $ sudo gem pristine ffi --version 1.15.3 [don't know why ffi needs this]
## $ sudo gem pristine http_parser.rb --version 0.6.0 [don't know why http_parser.rb needs this]
## $ bundle exec jekyll serve

sudo dnf install epel-release
sudo dnf install gcc
sudo dnf install gcc-c++
sudo dnf install make
sudo dnf install redhat-rpm-config
sudo dnf install openssl-devel
sudo dnf install crypto-devel
sudo dnf install ruby-devel
sudo dnf install rubygems
