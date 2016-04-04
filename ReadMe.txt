Steps for installing Ionic:
1) install npm  from node.js from this website: https://nodejs.org/en/download/
2) install cordova in windows in command prompt if on linux add sudo C/: npm install -g cordova
3) install ionic similiarly same as linux above C/: npm install -g ionic
4) navigate into mobile-app folder once you clone the repo and input command into command prompt: ionic serve -l
5) go to view readme

To run :
you need to npm install the following if you don't have them:
jasmine-core
karma
karma-jasmine
karma-coverage
karma-phantomjs-launcher
angularmocks

Then run bower install
Tests are run by karma start karma.conf.js
Add test in Spec folder under Test