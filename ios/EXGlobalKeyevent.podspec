require 'json'
pkg = JSON.parse(File.read('../package.json'))

Pod::Spec.new do |s|
  s.name         = "EXGlobalKeyevent"
  s.version      = pkg["version"]
  s.summary      = pkg["description"]
  s.homepage     = pkg["homepage"]
  s.license      = pkg["license"]
  s.author       = pkg["author"]
  s.platforms    = { :ios => "12.0", :tvos => "10.0" }
  s.swift_version  = '5.4'
  s.source       = { :git => pkg["repository"], :tag => "main" }
  s.static_framework = true
  
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  s.dependency "ExpoModulesCore"

  if !$ExpoUseSources&.include?(package['name']) && ENV['EXPO_USE_SOURCE'].to_i == 0 && File.exist?("#{s.name}.xcframework") && Gem::Version.new(Pod::VERSION) >= Gem::Version.new('1.10.0')
    s.source_files = "#{s.name}/**/*.h"
    s.vendored_frameworks = "#{s.name}.xcframework"
  else
    s.source_files = "#{s.name}/**/*.{h,m,swift}"
  end
end
