require('./ng-incrementer.less');

function ensure(scope, done) {
  if( scope.$$phase == '$apply' || scope.$$phase == '$digest' || scope.$root.$$phase == '$apply' || scope.$root.$$phase == '$digest' ) {
    done(null, scope);
  } else {
    scope.$apply(function() {
      done(null, scope);
    });
  }
}

module.exports = angular.module('ngIncrementer', [])
.directive('ngIncrementer', function() {
  return {
    require: '?ngModel',
    template: require('./ng-incrementer.html'),
    replace: true,
    scope: {
      ngModel: '='
    },
    restrict: 'AE',
    link: function(scope, element, attrs, ngModel) {
      var update = function() {
        var min = isNaN(+attrs.min) ? 0 : +attrs.min;
        var max = isNaN(+attrs.max) ? 999 : +attrs.max;
        var increment = +attrs.increment || 1;
        var value = !isNaN(+scope.value) ? scope.value : +attrs.value;
        
        if( !value ) value = min;
        if( value < min ) value = min;
        if( value > max ) value = max;
        
        scope.min = min;
        scope.max = max;
        scope.value = value;
        scope.prefix = attrs.prefix;
        scope.suffix = attrs.suffix;
        
        setTimeout(function() {
          ngModel.$setViewValue(scope.value);
        },0);
        
        element[0].querySelector('.ng-incrementer-input').innerHTML = value;
        
        scope.plus = function() {
          scope.value = scope.value + increment;
          update();
        };
        
        scope.minus = function() {
          scope.value = scope.value - increment;
          update();
        };
        
        scope.checkinput = function(e) {
          var value = +e.target.innerHTML;
          if( !isNaN(value) ) {
            scope.value = +value;
          }
          update();
        };
      };
      
      attrs.$observe('min', update);
      attrs.$observe('max', update);
      attrs.$observe('prefix', update);
      attrs.$observe('suffix', update);
      if( attrs.ngModel ) scope.$watch(attrs.ngModel, function() {
        scope.value = ngModel.$modelValue;
        update();
      });
      update();
      //ngModel.$setViewValue(scope.value);
    }
  };
});