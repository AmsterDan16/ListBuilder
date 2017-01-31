app.controller('mainCtrl', ['$scope', function($scope){
    $scope.initialEntry = "";
    $scope.finalList = [];
    var basicListItem = {
        listIndex: 0,
        name: "",
        completed: false
    };

    /**
    * Initializes the list array and pushes an empty item
    **/
    $scope.Init = function(){
        var firstListItem = angular.copy(basicListItem);
        $scope.finalList.push(firstListItem);
    }
    
    /**
    * Generates item list after paragraph bulk item entry
    **/
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
    
    /**
    * Adds a single new item to the front of the item array
    **/
    $scope.AddListItem = function (){
        var newListItem = angular.copy(basicListItem);
        //add to top of list
        $scope.finalList.splice(0,0, newListItem);
    }
    
    /**
    * Resets initial and final item arrays and clears the forms
    **/
    $scope.Reset = function(){
        $scope.initialEntry = [];
        $scope.finalList = [];
        $scope.Init();
    }
    
    /**
    * Scans and cleans input, then inserts into final array 
    * @param {String} listItem
    * @param {Number} index
    **/
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
    
    //called first thing
    $scope.Init();
}]);