.POSIX:

# USAGE
#
# 1. (macOS) Install XCode Developer Tools (if not already installed):
#
#     xcode-select --install
#
# 2.  Install dependencies (first time only, or until "make distclean" is invoked)
#
#     make install
#
# 3.  Start jekyll, listening on localhost:4001 (and livereload on default port 35729)
#     ... or as specified below in the jekyll serve invocation.
#
#     make
#
# 4. If generated site needs to be removed to pick up modifications made to
#    _config.yml, plugin, _data, "etc."(?): 
#
#     make clean
 
# don't override GEM_HOME for GitHub Codespace
OS = $(shell uname)
ifeq ($(OS), Darwin)
ENV = PATH=$${PWD}/vendor/gems/bin:$${PATH} GEM_HOME=$${PWD}/vendor/gems
endif
JBROWSE_VERSION = 2.3.3
NPM_GLOBAL= # set to "-g" to install nodejs packages globally

serve:
	$(ENV) bundle exec jekyll serve --incremental --livereload --livereload_port 35728 --port 4001

# additional macOS environment variable needed at install time due to broken
# xcode ruby framework
CPATH = /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/Headers/

install:
	# Hack make ffi to work on M1 MacBook: https://github.com/ffi/ffi/issues/864
	$(ENV) bundle config build.ffi --enable-libffi-alloc
	$(ENV) CPATH=$(CPATH) bundle install

check:
	$(ENV) bundle exec jekyll build
	$(ENV) bundle exec htmlproofer --allow-missing-href=true --ignore-missing-alt=true --ignore-files '/\/uikit\/tests\//' --ignore-status-codes 503 --cache '{"timeframe": {"external": "30d"}}' --log-level debug ./_site 

jbrowse-install:
	rm -rf ./assets/js/jbrowse
	npm install ${NPM_GLOBAL} @jbrowse/cli@${JBROWSE_VERSION}
	npx jbrowse create ./assets/js/jbrowse --tag=v${JBROWSE_VERSION}

jbrowse:
	rm -f assets/js/jbrowse/config.json
	_scripts/jbrowse-tracks.sh

clean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/ tmp/

distclean: clean
	rm -rf Gemfile.lock $${PWD}/vendor # or maybe just "git clean -xfd"
