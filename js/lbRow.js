app.directive('lbRow', function(){
    return {
        restrict:'E',
        scope: {
            item: '=lbItem',
            items: '=lbItems'
        },
        replace:true,
        templateUrl:'listbuilder/js/lbRow.html',
        link: function(scope, element, attrs){
            scope.RemoveItem = function(item){
                var itemIndex = scope.items.indexOf(item);
                scope.items.splice(itemIndex, 1);
            }
            scope.CheckOffItem = function(item){
                var currentIndex = scope.items.indexOf(item);
                //store checked off item, then remove it and place it at the end
                var checkedItem = scope.items[currentIndex];
                
                //if item currently checked, uncheck and move to top of checked off items
                if(checkedItem.completed){
                    scope.UncheckItem(checkedItem);
                }else{
                    scope.items.splice(currentIndex,1);
                    scope.items.push(checkedItem);
                }
                //flip completed property
                checkedItem.completed = !checkedItem.completed;
            }
            scope.UncheckItem = function(item){
                //default the top checked index to the last element in case there is only one checked item
                var topCheckedIndex = scope.items.length - 1;
                var currentItem;

                //find top completed item, and place newly unchecked item above that
                for(var i = 0; i < scope.items.length - 1; i++){
                    currentItem = scope.items[i];
                    if(currentItem.completed){
                        topCheckedIndex = scope.items.indexOf(currentItem);
                        break;
                    }
                }
                
                //remove item being unchecked
                scope.items.splice(scope.items.indexOf(item), 1);
                //place in correct spot and change checked property
                scope.items.splice(topCheckedIndex,0,item);
                
            }
        }
    }; 
});