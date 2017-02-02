app.directive('focus', function($timeout){
    return function(scope, element, attrs){
      scope.$watch(attrs.focus,
            function(newValue){
                $timeout(function(){
                   newValue && element[0].focus(); 
                });
            }, true);
    };
});