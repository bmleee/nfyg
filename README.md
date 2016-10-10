```
express-with-react-boilerplate
+- express-app/	# express app.js, gulped
	+- express-app.js	# webpack output
	+- app.js	# babel output (but I use webpack. you may switch webpack-express to babel-express in gulpfile.babel.js)
+- public/	# js/css/html/images for clients, gulped
	+- assets/
		+- js/
			+- main.js	# javascript for browser
		+- images/
		+- css/
		+- fonts/
	+- bower_components/
	+- index.html
	+- react-app.js	# load and mount react app
+- src	# source code and assets before gulped
	+- react/	# react app source code
	+- express/	# node.js with express.js source code
		+- app.js	# express app entry
	+- js/
	+- images/
	+- css/
	+- sass/
	+- fonts/
	+- index.html
+- webpack.browser.config.js	# configure webpack for JS on browser
+- webpack.express.config.js	# configure webpack for express app
+- webpack.react.config.js	# configure webpack for react app
+- bootstrap.config.json	# configure bootstrap
+- bootstrap.config.json.org	# original file
```
## usage
```
	npm install && bower install && npm start
```

## express with react bolierplate
 - webpacked express app is served in express-app/
 - react isomorphic is not applied

## gulp, babel plugins
 check package.json


## Todos
 1. apply react-redux
 2. proxy : express, react routing
 3. bin directory : express-app.js proxy-server.js
