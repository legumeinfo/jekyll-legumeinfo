OS = $(shell uname)
ifeq ($(OS), Darwin)
  # additional macOS environment variable needed at install time due to broken
  # xcode ruby framework
  export CPATH = /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/Headers/
  # install Ruby dependencies in $PWD/vendor
  export GEM_HOME=${PWD}/vendor/gems
  export PATH := ${PWD}/vendor/gems/bin:${PATH}

  JEKYLL_SERVE_ARGS = --livereload
  HTMLPROOFER_ARGS = --allow-missing-href=true --ignore-missing-alt=true
  PYTHON_VENV_ACTIVATE = . ./vendor/python-venv/bin/activate
else # assume dev container
  # html-proofer 5.x
  HTMLPROOFER_ARGS = --allow-missing-href --ignore-missing-alt
  NPM_INSTALL_OPTIONS = -g
  PYTHON_VENV_ACTIVATE = true # no-op
endif

JBROWSE_VERSION = 2.15.4
PA11YCI_VERSION = 3.1.X

serve: mostlyclean setup
	bundle exec jekyll serve --profile --trace --incremental $(JEKYLL_SERVE_ARGS)

check: mostlyclean setup yamllint htmlproofer pa11y

yamllint:
	if ! ( $(PYTHON_VENV_ACTIVATE) ); then python3 -mvenv ./vendor/python-venv; fi
	$(PYTHON_VENV_ACTIVATE) && pip3 install --no-cache-dir -r requirements.txt
	$(PYTHON_VENV_ACTIVATE) && yamllint .

htmlproofer:
	bundle exec jekyll build --profile --trace
	bundle exec htmlproofer $(HTMLPROOFER_ARGS) --ignore-status-codes 301,429,503 --ignore-files '/\/uikit\/tests\//' --ignore-url '/germplasm-map.legumeinfo.org/,/pgrc-rpc.agr.gc.ca\/gringlobal\/search/'  --cache '{"timeframe": {"external": "30d"}}' --log-level debug ./_site

pa11y: setup
	if ! { command -v pa11y-ci || npm ls pa11y-ci ; } >/dev/null 2>&1; then npm install $(NPM_INSTALL_OPTIONS) pa11y-ci@${PA11YCI_VERSION}; fi
	bundle exec jekyll serve --quiet --detach >/dev/null 2>&1
	npx pa11y-ci --sitemap http://localhost:4000/sitemap.xml --sitemap-exclude '/cmap-*'; pkill jekyll
	

# JBrowse CLI will already be installed globally if using a dev container
jbrowse: setup
	if ! { command -v jbrowse || npm ls @jbrowse/cli ; } >/dev/null 2>&1; then npm install $(NPM_INSTALL_OPTIONS) @jbrowse/cli@${JBROWSE_VERSION}; fi
	if ! [ -d ./assets/js/jbrowse ]; then npx jbrowse create assets/js/jbrowse --tag=v${JBROWSE_VERSION}; fi
	cp assets/js/jbrowse-config.json assets/js/jbrowse/config.json
	npm exec -c '_scripts/jbrowse-tracks.sh'

setup:
	git submodule status | grep -q '^-' && git submodule update --init --recursive || true
	if ! bundle check; then bundle install; fi

mostlyclean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

clean: mostlyclean
	rm -rf ./assets/js/jbrowse Gemfile.lock $${PWD}/vendor package.json package-lock.json node_modules tmp/
