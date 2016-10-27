## Todos

### exhibitions
 1. ALL, 진행중인 전시, 끝난 전시 버튼 ==> 진행중인 전시, 날짜별 필터링(select-option) :: DB 구조 모두 결정 된 후에 하는게 좋을듯!

### exhibition detail

### magazines
 1. 카테고리 버튼들 ==> 한 줄에, 좌우로 스크롤할 수 있게 :: 티몬 어플 참조
---

## 협업 루틴

### 1. 소스코드 수정

### 2. 서버 실행 후 작업 내역 확인
- 상단 Run 버튼 클릭
- 터미널의 커맨드 탭에 gulp라고 나와있으면 성공
	- 다른 명령어가 있다면, gulp로 수정하고 엔터
- https://seven-renewal-styling-a4000d.c9users.io/ 에서 확인 가능

### 3. git에 코드 수정 내역 반영
```bash 
$ git add --all
$ git commit -m "수정한 소스 코드 설명"
$ git push origin master
```
__커밋 단위는 개별 파일 또는 기능별로 나누어서 해야합니다!__

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
