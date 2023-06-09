OS = $(shell uname)
ifeq ($(OS), Darwin)
  # additional macOS environment variable needed at install time due to broken
  # xcode ruby framework
  export CPATH = /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/Headers/
  # install Ruby dependencies in $PWD/vendor
  export GEM_HOME=${PWD}/vendor/gems
  export PATH := ${PWD}/vendor/gems/bin:${PATH}

  JEKYLL_SERVE_ARGS = --livereload
  HTMLPROOFER_ARGS = --allow-missing-href=true --ignore-missing-alt=true --cache '{"timeframe": {"external": "30d"}}'
else # assume dev container
  # html-proofer 5.x
  HTMLPROOFER_ARGS = --allow-missing-href --ignore-missing-alt --cache '{"timeframe": {"external": "30d"}}'
endif

JBROWSE_VERSION = 2.6.1

serve: mostlyclean setup
	bundle exec jekyll serve --incremental $(JEKYLL_SERVE_ARGS)

check: mostlyclean setup
	bundle exec jekyll build
	bundle exec htmlproofer $(HTMLPROOFER_ARGS) --ignore-status-codes 503 --ignore-files '/\/uikit\/tests\//' --log-level debug ./_site

# JBrowse CLI will already be installed globally if using a dev container
jbrowse: setup
	rm -f assets/js/jbrowse/config.json
	npm exec -c '_scripts/jbrowse-tracks.sh'

setup:
	git submodule update --init
	if ! bundle check; then bundle install; fi
	if ! npm ls jbrowse; then npm install @jbrowse/cli@${JBROWSE_VERSION}; fi
	if ! [ -d ./assets/js/jbrowse ]; then npx jbrowse create assets/js/jbrowse --tag=v${JBROWSE_VERSION}; fi

mostlyclean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/ tmp/

clean: mostlyclean
	rm -rf ./assets/js/jbrowse Gemfile.lock $${PWD}/vendor package.json package-lock.json node_modules
