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
  PYTHON_VENV_ACTIVATE = . ./vendor/python-venv/bin/activate
else # assume dev container
  # html-proofer 5.x
  HTMLPROOFER_ARGS = --allow-missing-href --ignore-missing-alt --cache '{"timeframe": {"external": "30d"}}'
  NPM_INSTALL_OPTIONS = -g
  PYTHON_VENV_ACTIVATE = true # no-op
endif

JBROWSE_VERSION = 2.6.3

serve: mostlyclean setup
	bundle exec jekyll serve --profile --trace --incremental $(JEKYLL_SERVE_ARGS)

check: mostlyclean setup yamllint htmlproofer

yamllint:
	$(PYTHON_VENV_ACTIVATE) && yamllint .

htmlproofer:
	bundle exec jekyll build --profile --trace
	bundle exec htmlproofer $(HTMLPROOFER_ARGS) --ignore-status-codes 503 --ignore-files '/\/uikit\/tests\//' --log-level debug ./_site

# JBrowse CLI will already be installed globally if using a dev container
jbrowse: setup
	rm -f assets/js/jbrowse/config.json
	npm exec -c '_scripts/jbrowse-tracks.sh'

setup:
	git submodule update --init --recursive
	if ! bundle check; then bundle install; fi
	if ! { command -v jbrowse || npm ls @jbrowse/cli ; } >/dev/null 2>&1; then npm install $(NPM_INSTALL_OPTIONS) @jbrowse/cli@${JBROWSE_VERSION}; fi
	if ! npm exec -c 'command -v jq' >/dev/null 2>&1; then curl -Lo ./node_modules/.bin/jq https://github.com/jqlang/jq/releases/download/jq-1.6/jq-osx-amd64 && chmod +x ./node_modules/.bin/jq; fi
	if ! [ -d ./assets/js/jbrowse ]; then npx jbrowse create assets/js/jbrowse --tag=v${JBROWSE_VERSION}; fi
	if ! ( $(PYTHON_VENV_ACTIVATE) ); then python3 -mvenv ./vendor/python-venv; fi
	$(PYTHON_VENV_ACTIVATE) && pip3 install --no-cache-dir -r requirements.txt

mostlyclean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/ tmp/

clean: mostlyclean
	rm -rf ./assets/js/jbrowse Gemfile.lock $${PWD}/vendor package.json package-lock.json node_modules
