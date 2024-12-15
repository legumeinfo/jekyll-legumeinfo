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
# 3.  Install dependencies (first time only, or until "make distclean" is invoked)
#
#     make install
#
# 4.  Start jekyll, listening on localhost:4000 (and livereload on default port 35729)
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

  # select SDK from /Library/Developer/CommandLineTools/SDKs
  XCRUN = DEVELOPER_DIR=/Library/Developer/CommandLineTools xcrun --sdk macosx15.0
endif

ENV = PATH=$${PWD}/vendor/gems/bin:$${PATH} GEM_HOME=$${PWD}/vendor/gems 

serve:
	bundle exec jekyll serve --incremental --livereload --livereload_port 35728 --port 4001

install:
	rm -f Gemfile.lock
	if ! bundle check; then $(XCRUN) bundle install; fi
#	$(ENV) xcrun bundle install

clean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

#distclean: clean
#	rm -rf $${PWD}/vendor # or maybe just "git clean -xfd"
