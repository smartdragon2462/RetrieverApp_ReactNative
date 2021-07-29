fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android build
```
fastlane android build
```
Build the Android application.
### android deploy_staging
```
fastlane android deploy_staging
```
Deploy a new test version to the Google Play

----

## iOS
### ios test
```
fastlane ios test
```
Run tests
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios build
```
fastlane ios build
```
Build app
### ios deploy_staging
```
fastlane ios deploy_staging
```
Deploy to Test Flight
### ios deploy_production
```
fastlane ios deploy_production
```
Deploy to Apple App Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
