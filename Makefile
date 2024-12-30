.POSIX:

# USAGE
#
# 1. (macOS) Install XCode Developer Tools (if not already installed):
#
#     xcode-select --install
#
# 2. Create symbolic link to fix broken xcode ruby framework (first time only):
#    Choose the appropriate target for your OS version: darwin22, darwin23, darwin24, etc.:
#
#   # macOS Sonoma (macOS 14):
#      universal-darwin23 is missing in this MacOSX15.0.sdk, but universal-darwin24 is present, so link universal-darwin23 to universal-darwin24
#      See https://stackoverflow.com/a/65481787 for discussion
#
#    sudo ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX15.0.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0/universal-darwin24 \
#               /Library/Developer/CommandLineTools/SDKs/MacOSX15.0.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0/universal-darwin23
#
# 3.  Install dependencies (first time only, or until "make distclean" is invoked)
#
#     make install
#
# 4.  Start jekyll, listening on localhost:4000 (and livereload on default port 35729)
#
#     make
#
# 5. If generated site needs to be removed to pick up modifications made to
#    _config.yml, plugin, _data, "etc."(?), run one of the following (see actions below)
#
#     make mostlyclean
#  or
#     make clean
#

OS = $(shell uname)
ifeq ($(OS), Darwin)
  # install Ruby dependencies in $PWD/vendor
  export GEM_HOME=${PWD}/vendor/gems
  export PATH := ${PWD}/vendor/gems/bin:${PATH}

  # select SDK from /Library/Developer/CommandLineTools/SDKs
  XCRUN = DEVELOPER_DIR=/Library/Developer/CommandLineTools xcrun --sdk macosx15.0
  JEKYLL_SERVE_ARGS = --livereload
  HTMLPROOFER_ARGS = --allow-missing-href=true --ignore-missing-alt=true
  PYTHON_VENV_ACTIVATE = . ./vendor/python-venv/bin/activate
else # assume dev container
  # html-proofer 5.x
  HTMLPROOFER_ARGS = --allow-missing-href --ignore-missing-alt
  NPM_INSTALL_OPTIONS = -g
  PYTHON_VENV_ACTIVATE = true # no-op
endif

JBROWSE_VERSION = 2.18.0
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
	bundle exec htmlproofer $(HTMLPROOFER_ARGS) --ignore-status-codes 301,406,429,503 --ignore-files '/\/uikit\/tests\//' --ignore-url '/germplasm-map.legumeinfo.org/,/pgrc-rpc.agr.gc.ca\/gringlobal\/search/'  --cache '{"timeframe": {"external": "30d"}}' --log-level debug ./_site

pa11y: setup
	if ! { command -v pa11y-ci || npm ls pa11y-ci ; } >/dev/null 2>&1; then npm install $(NPM_INSTALL_OPTIONS) pa11y-ci@${PA11YCI_VERSION}; fi
	bundle exec jekyll serve --quiet --detach >/dev/null 2>&1
	npx pa11y-ci --sitemap http://localhost:4000/sitemap.xml --sitemap-exclude '/cmap-*'; pkill jekyll
	

# JBrowse CLI will already be installed globally if using a dev container
# Ensure JBrowse index.html is parsed by jekyll & inline GA script
jbrowse: setup
	if ! { command -v jbrowse || npm ls @jbrowse/cli ; } >/dev/null 2>&1; then npm install $(NPM_INSTALL_OPTIONS) @jbrowse/cli@${JBROWSE_VERSION}; fi
	if ! [ -d ./assets/js/jbrowse ]; then \
      npx jbrowse create assets/js/jbrowse --tag=v${JBROWSE_VERSION}; \
      sed -i.bak -e 's/^/---\n---\n/' -e 's/>/>\n/g' assets/js/jbrowse/index.html; \
      sed -i.bak -e '/<\/script>/r ./_themes/jekyll-theme-legumeinfo/_includes/analytics.html' assets/js/jbrowse/index.html; \
    fi
	cp assets/js/jbrowse-config.json assets/js/jbrowse/config.json
	npm exec -c '_scripts/jbrowse-tracks.sh'

setup:
	git submodule status | grep -q '^-' && git submodule update --init --recursive || true
	if ! bundle check; then $(XCRUN) bundle install; fi

mostlyclean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

clean: mostlyclean
	rm -rf ./assets/js/jbrowse Gemfile.lock $${PWD}/vendor package.json package-lock.json node_modules tmp/
