app.controller('mainCtrl', ['$scope', function($scope){
    $scope.initialEntry = "";
    $scope.finalList = [];
    var basicListItem = {
        listIndex: 0,
        name: "",
        completed: false,
        first:true
    };
    $scope.hasStorage = false;

    /**
    * Initializes by checking localStorage for a stored list. If there is none, a new one is started
    **/
    $scope.Init = function(){
        //check if browser capable of localStorage
        if(typeof(Storage) !== "undefined"){
            $scope.hasStorage = true;
            if(localStorage.getItem("bulkList")){
                var bulk = localStorage.getItem("bulkList");
                $scope.initialEntry = JSON.parse(bulk).join();
                if($scope.initialEntry == ""){
                    $scope.AddListItem();
                }else{
                    $scope.FormList();
                }
            }else{
                $scope.AddListItem(); 
            }
        }else{
            $scope.AddListItem();
        }
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
            if($scope.hasStorage){
                //store bulk list string in localStorage
                localStorage.setItem("bulkList", JSON.stringify(array));//$scope.initialEntry);
            }
            //insert into final array
            for(var i = 0, len = array.length;i < len; i++){                    
                $scope.CheckAndInsertItemFromBulkListEntry(array[i], i);
            }
        }
        buttons.style.visibility = 'visible';
        //unset the focus property to prevent scrolling to the bottom of the page
        for(var i = 0; i < $scope.finalList.length; i++){
            $scope.finalList[i].first = false;   
        }
    } 
    
    /**
    * Adds a single new item to the front of the item array
    **/
    $scope.AddListItem = function (){
        var newListItem = angular.copy(basicListItem);
        //add to top of list
        $scope.finalList.splice(0,0, newListItem);
        if($scope.hasStorage){
            $scope.AddToStorage();
        }
    }
    
    /**
    * Insert newly added items to localstorage
    **/
    $scope.AddToStorage = function(){
        var stored = localStorage.getItem("bulkList");
        var storedArr = JSON.parse(stored);
        storedArr.splice(0,0,"");
        localStorage.setItem("bulkList", JSON.stringify(storedArr));
    }
    
    /**
    * Resets initial and final item arrays and clears the forms
    **/
    $scope.Reset = function(){
        $scope.initialEntry = [];
        $scope.finalList = [];
        if($scope.hasStorage){
            //kill storage session to get a fresh reset
            localStorage.setItem("bulkList", JSON.stringify([]));
        }
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