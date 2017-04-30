# ng-incrementer

## Install
```sh
$ npm i ng-incrementer --save
```

## Usage
```javascript
require('ng-incrementer')

angular.module('app', ['ngIncrementer'])...
```

```html
<ng-incrementer min="0" max="{{max}}" ng-model="modelname" prefix="Somthing" suffix="ea" ng-change="onchange()"></ng-incrementer>
```