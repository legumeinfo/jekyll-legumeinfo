.POSIX:

# USAGE
#
# 1. (macOS) Install XCode Developer Tools (if not already installed):
#
#     xcode-select --install
#
# 2. Create symbolic link to fix broken xcode ruby framework (first time only):
#    Choose the appropriate target for your OS version: darwin19, darwin20, or darwin21:
#
#   # macOS Catalina (macOS 10.15):
#     sudo ln -s universal-darwin20 /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0/universal-darwin19 
#
#   # macOS Big Sur (macOS 11): universal-darwin20 is probably OK (untested)
#
#   # macOS Monterey (macOS 12):
#     sudo ln -s universal-darwin20 /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0/universal-darwin21
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
#    _config.yml, plugin, _data, "etc."(?): 
#
#     make clean
#
# REFERENCES
#     macOS setup adapted from https://stackoverflow.com/a/65481787
#     (correcting typo in universal-darwin19 path)

 
ENV = PATH=$${PWD}/vendor/gems/bin:$${PATH} GEM_HOME=$${PWD}/vendor/gems 

serve:
	$(ENV) jekyll serve --incremental --livereload --livereload_port 35728 --port 4001

# additional macOS environment variable needed at install time due to broken
# xcode ruby framework
CPATH = /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/Headers/

install:
	$(ENV) gem install --conservative bundler
	$(ENV) CPATH=$(CPATH) bundle install

clean:
	rm -rf .jekyll-cache/ .jekyll-metadata _site/

#distclean: clean
#	rm -rf $${PWD}/vendor # or maybe just "git clean -xfd"
