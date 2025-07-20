.POSIX:

# USAGE
#
# 1. (macOS) Install XCode Developer Tools (if not already installed):
#
#     xcode-select --install
#
# 2. Install a current ruby - for example, using Homebrew (if not already installed).
#      This should be in the ruby 3 lineage rather than the native MacOS /usr/bin/ruby which is 2.6.10
#
# 3.  Install dependencies (first time only, or until "make distclean" is invoked)
#
#     make install
#
# 4.  Start jekyll, listening on localhost:4001 (and livereload on default port 35728)
#
#     make
#
# 5. If generated site needs to be removed to pick up modifications made to
#    _config.yml, plugin, _data, "etc."(?): 
#
#     make clean
#

OS = $(shell uname)
ifeq ($(OS), Darwin)
	# install Ruby dependencies in $PWD/vendor
	export GEM_HOME=${PWD}/vendor/gems
	export PATH := ${PWD}/vendor/gems/bin:${PATH}
endif

ENV = PATH=$${PWD}/vendor/gems/bin:$${PATH} GEM_HOME=$${PWD}/vendor/gems 

serve:
	bundle exec jekyll serve --incremental --livereload --livereload_port 35728 --port 4001

install:
	rm -f Gemfile.lock
	test -f .bundle/config || mkdir -p .bundle; echo "---" > .bundle/config; echo 'BUNDLE_PATH: "vendor/gems"' >> .bundle/
	if ! bundle check; then bundle config --local path 'vendor/gems'; bundle install; fi

clean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

