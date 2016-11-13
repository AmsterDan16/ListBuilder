app.controller('mainCtrl', ['$scope', function($scope){
    $scope.initialEntry = "";
    $scope.finalList = [];
    var basicListItem = {
        listIndex: 0,
        name: "",
        completed: false
    };

    $scope.Init = function(){
        var firstListItem = angular.copy(basicListItem);
        $scope.finalList.push(firstListItem);
    }
    $scope.FormList = function(){   
        ShowHide();
        var initList = $scope.initialEntry;
        //clear finalList to refresh upon resubmit
        $scope.finalList = [];

        var array = initList.split(",");
        if(array.length > 0){
            //insert into final array
            for(var i = 0, len = array.length;i < len; i++){                    
                $scope.CheckAndInsertItemFromBulkListEntry(array[i], i);
            }
        }
        buttons.style.visibility = 'visible';
    } 
    $scope.AddListItem = function (){
        var newListItem = angular.copy(basicListItem);
        //add to top of list
        $scope.finalList.splice(0,0, newListItem);
    }
    $scope.Reset = function(){
        $scope.initialEntry = [];
        $scope.finalList = [];
        $scope.Init();
    }
    //scan and clean the input, insert into final array and create the table on screen
    $scope.CheckAndInsertItemFromBulkListEntry = function(listItem, index){
        
        //check item before inserting into final array?
        if(listItem == null || listItem == ""){
            return;
        }
        //trim and insert into final array
        listItem = listItem.trim();
        var newItem = angular.copy(basicListItem);
        newItem.name = listItem;
        newItem.listIndex = index;
        $scope.finalList.push(newItem);   
    }
    $scope.Init();
}]);