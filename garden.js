//Include ui.bootstrap bindings for crop type-ahead widget
angular.module('growstuff', ['ui.bootstrap']);

// Setup some data to use to populate typeahead and select fields 
var year = new Date().getFullYear(); //current year.
var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
var days = 31;



function GardenCtrl($scope, $http) {
    /* GardenCtrl is a controller/model for dynamically editing gardens. */

    $scope.years = [];
    //Array of 5 years either side of now.
    for(var i= year-5; i < year +5; i++) {
        $scope.years.push({label : i, value : i});
    }

    //Array of months of the year to month number.
    $scope.months = [];
    for(var i=0; i < months.length; i++) {
        $scope.months.push({label : months[i], value : i+1});
    }

    //Array of days of the month.
    $scope.days = [];
    for(var i=1; i < days+1; i++) {
        $scope.days.push({label : i, value : i});
    }

    //Array of crops (from the server)
    $scope.crops = CROPS_SOURCE;

    //Garden info (from the server)
    $scope.garden = GARDEN_SOURCE;

    /*********************************************/
    /* Actual controller logic beyond this point */
    /*********************************************/

    $scope.selected = $scope.garden.crops[0]; //select first crop to start;


    $scope.addCrop = function () {
        //push a new empty crop onto the list and select it in the UI
        $scope.garden.crops.push({});
        $scope.selectCrop($scope.garden.crops[$scope.garden.crops.length-1]);
    };

    $scope.selectCrop = function(crop) {
        $scope.selected = crop;
    };

    $scope.deleteCrop = function(crop) {
        /* delete a crop, if it was the selected crop, select crop 0.
         * if we've deleted the last crop, add an empty crop and select it.
         */
        if(crop == $scope.selected) {
            $scope.selectCrop($scope.garden.crops[0]);
        }
        delete $scope.garden.crops[$scope.garden.crops.indexOf(crop)];
        if($scope.garden.crops.length == 0) $scope.addCrop();

    };

    $scope.arrayOfLength = function(length) {
        return new Array(length);
    };

    $scope.formatDate = function(crop) {
        //Format partial dates for display as user types them
        if(crop.year && crop.month && crop.day) {
            return crop.year.label+' - '+crop.month.label+' '+crop.day.label;
        } else {
            return "";
        }
    };
}

