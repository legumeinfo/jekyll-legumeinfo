# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-legumeinfo"
  spec.version       = "0.0.0"
  spec.authors       = ["Alan Cleary"]
  spec.email         = ["acleary@ncgr.org"]

  spec.summary       = "The Jekyll theme for the Legume Information System science portal."
  spec.homepage      = "https://legumeinfo.org"
  spec.license       = "Apache-2.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
  spec.add_runtime_dependency "webrick", "~> 1.7"
  spec.add_runtime_dependency "jekyll-datapage-generator", "~> 1.4.0"
end
