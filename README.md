## 협업 루틴
### 1. 소스코드 수정 (src폴더)


### 2. gulp로 수정 내역 반영 (public, bin폴더)

### 3. 서버 실행 후 수정 내역 확인

### 4. github에 소스 코드 올리기

## unresolve issues
```
	https://github.com/node-inspector/node-inspector/issues/905 https://github.com/node-inspector/node-inspector/issues/905#issuecomment-251864127
```

## [7Pictures](https://7pictures.co.kr) Sever Stack
	Image 없음..
 - nginx
 - CloudFront
 - node.js
 - express
 - mongodb
 - ....
 - front: React.js





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
$ npm install && bower install && gulp
```
