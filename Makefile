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
 
ENV = PATH=$${PWD}/vendor/gems/bin:$${PATH} GEM_HOME=$${PWD}/vendor/gems 

serve:
	$(ENV) bundle exec jekyll serve --incremental --livereload --livereload_port 35728 --port 4001

# additional macOS environment variable needed at install time due to broken
# xcode ruby framework
CPATH = /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/Headers/

install:
	# Hack make ffi to work on M1 MacBook: https://github.com/ffi/ffi/issues/864
	$(ENV) bundle config build.ffi --enable-libffi-alloc
	$(ENV) CPATH=$(CPATH) bundle install

clean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

distclean: clean
	rm -rf $${PWD}/vendor # or maybe just "git clean -xfd"
