/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Author: Michael E. Weigel
 * 
 * @type angular.module.angular-1_3_6_L1749.moduleInstance
 * 
 * The AngularJS Controller
 */
var app = angular.module('firearmsListApp', []);
app.controller('firearmFactsController', function ($scope, $http) {
    $scope.firearmsList = [];
    $scope.sortType = 'modelName'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFirearms = '';     // set the default search/filter term
    $scope.firearm = {modelName: "", country: "", caliber: "", actionType: "",
        ammunition: "", velocity: 0, rateOfFire: 0, range: 0, startService: 0,
        endService: 0, manufacturer: "", numProduced: "", description: ""};

    var chngFlags = {
        modelName: false,
        country: false,
        caliber: false,
        actionType: false,
        ammunition: false,
        velocity: false,
        rateOfFire: false,
        range: false,
        startService: false,
        endService: false,
        manufacturer: false,
        numProduced: false,
        description: false
    };

    // Refresh the entire firearm list
    var refresh = function () {
        $http.get('/firearmsList').then(function (response) {
            console.log("I got the data I requested");
            $scope.firearmsList = response.data;
            $scope.deselect();
        }, function (response) {
            console.error(response.data);
        });
    };

    // Refresh a single firearm item
    var refreshFirearm = function (id) {
        $http.get('/firearmsList/' + id).then(function (response) {
            console.log("I got the firearm data for: " + response.data.modelName);
            var index = $scope.firearmsList.map(function (x) {
                return x.modelName;
            }).indexOf(response.data.modelName);
            $scope.firearmsList[index] = response.data;
            $scope.deselect();
        }, function (response) {
            console.error(response.data);
        });
    };

    // Get the data for when the page is loaded
    refresh();

    // Montitor firearm field Chngs
    $scope.onChange = function (data) {
        switch (data) {
            case $scope.firearm.modelName:
                chngFlags.modelName = true;
                break;
            case $scope.firearm.country:
                chngFlags.country = true;
                break;
            case $scope.firearm.caliber:
                chngFlags.caliber = true;
                break;
            case $scope.firearm.actionType:
                chngFlags.actionType = true;
                break;
            case $scope.firearm.ammunition:
                chngFlags.ammunition = true;
                break;
            case $scope.firearm.velocity:
                chngFlags.velocity = true;
                break;
            case $scope.firearm.rateOfFire:
                chngFlags.rateOfFire = true;
                break;
            case $scope.firearm.range:
                chngFlags.range = true;
                break;
            case $scope.firearm.startService:
                chngFlags.startService = true;
                break;
            case $scope.firearm.endService:
                chngFlags.endService = true;
                break;
            case $scope.firearm.manufacturer:
                chngFlags.manufacturer = true;
                break;
            case $scope.firearm.numProduced:
                chngFlags.numProduced = true;
                break;
            case $scope.firearm.description:
                chngFlags.description = true;
                break;
        }
    };

    // Add a new firearm type
    $scope.addFirearm = function () {
        var index = $scope.firearmsList.map(function (x) {
            return x._id;
        }).indexOf($scope.firearm._id);

        console.log("index = " + index);

        // Only add firearm if it doesn't already exist
        if (index === -1) {
            var dataField = doFirearmFieldsHaveData();
            // Make sure there are no empty fields
            if (dataField.modelName && dataField.country && dataField.caliber &&
                    dataField.actionType && dataField.ammunition && dataField.velocity &&
                    dataField.rateOfFire && dataField.range && dataField.startService &&
                    dataField.endService && dataField.manufacturer && dataField.numProduced &&
                    dataField.description) {
                if (isYearValid($scope.firearm.startService)) {
                    console.log($scope.firearm);
                    $http.post('/firearmsList', $scope.firearm).then(function (response) {
                        console.log(response.data);
                        refresh();
                    });
                } else {
                    alert("19 Century Format: 18XX");
                }
            } else {
                showEmptyFieldAlert(dataField);
            }
        }
    };


    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/firearmsList/' + id).then(function (repsonse) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/firearmsList/' + id).then(function (response) {
            $scope.firearm = response.data;
        });
    };

    $scope.update = function (id) {
        if (chngFlags.modelName || chngFlags.country || chngFlags.caliber ||
                chngFlags.actionType || chngFlags.ammunition || chngFlags.velocity ||
                chngFlags.rateOfFire || chngFlags.range || chngFlags.startService ||
                chngFlags.endService || chngFlags.manufacturer || chngFlags.numProduced ||
                chngFlags.description) {

            var dataField = doFirearmFieldsHaveData();
            // Make sure there are no empty fields
            if (dataField.modelName && dataField.country && dataField.caliber &&
                    dataField.actionType && dataField.ammunition && dataField.velocity &&
                    dataField.rateOfFire && dataField.range && dataField.startService &&
                    dataField.endService && dataField.manufacturer && dataField.numProduced &&
                    dataField.description) {
                if (isYearValid($scope.firearm.startService)) {
                    console.log($scope.firearm._id);
                    $http.put('/firearmsList/' + id, $scope.firearm).then(function (repsonse) {
                        refreshFirearm(repsonse.data._id);
                        resetChangeFlags();
                    });
                } else {
                    alert("19 Century Format: 18XX");
                }
            } else {
                showEmptyFieldAlert(dataField);
            }
        }
    };

    $scope.deselect = function () {
        if ($scope.firearm !== null) {
            $scope.firearm._id = "";
            $scope.firearm.modelName = "";
            $scope.firearm.country = "";
            $scope.firearm.caliber = "";
            $scope.firearm.actionType = "";
            $scope.firearm.ammunition = "";
            $scope.firearm.velocity = 0;
            $scope.firearm.rateOfFire = 0;
            $scope.firearm.range = 0;
            $scope.firearm.startService = 0;
            $scope.firearm.endService = 0;
            $scope.firearm.manufacturer = "";
            $scope.firearm.numProduced = "";
            $scope.firearm.description = "";
        }
    };

    function doFirearmFieldsHaveData() {
        var dataField = {
            modelName: ($scope.firearm.modelName.length > 0),
            country: ($scope.firearm.country.length > 0),
            caliber: ($scope.firearm.caliber.length > 0),
            actionType: ($scope.firearm.actionType.length > 0),
            ammunition: ($scope.firearm.ammunition.length > 0),
            velocity: ($scope.firearm.velocity > 0),
            rateOfFire: ($scope.firearm.rateOfFire > 0),
            range: ($scope.firearm.range > 0),
            startService: ($scope.firearm.startService > 0),
            endService: ($scope.firearm.endService > 0),
            manufacturer: ($scope.firearm.manufacturer.length > 0),
            numProduced: ($scope.firearm.numProduced.length > 0),
            description: ($scope.firearm.description.length > 0)
        };
        return dataField;
    }


    function resetChangeFlags() {
        chngFlags.modelName = false;
        chngFlags.country = false;
        chngFlags.caliber = false;
        chngFlags.actionType = false;
        chngFlags.ammunition = false;
        chngFlags.velocity = false;
        chngFlags.rateOfFire = false;
        chngFlags.range = false;
        chngFlags.startService = false;
        chngFlags.endService = false;
        chngFlags.manufacturer = false;
        chngFlags.numProduced = false;
        chngFlags.description = false;
    }


    function isYearValid(year) {
        var regex_date = /^[1][8][0-9][0-9]$/;
        return regex_date.test(year);
    }


    function showEmptyFieldAlert(dataField) {
        if (!dataField.modelName) {
            alert("Please enter the model name.");
        } else if (!dataField.country) {
            alert("Please enter the country.");
        } else if (!dataField.caliber) {
            alert("Please enter the caliber.");
        } else if (!dataField.actionType) {
            alert("Please enter the action type.");
        } else if (!dataField.ammunition) {
            alert("Please enter the ammunition.");
        } else if (!dataField.velocity) {
            alert("Please enter the velocity.");
        } else if (!dataField.rateOfFire) {
            alert("Please enter the rate of fire.");
        } else if (!dataField.range) {
            alert("Please enter the range.");
        } else if (!dataField.startService) {
            alert("Please enter the start service date.");
        } else if (!dataField.endService) {
            alert("Please enter the end service date.");
        } else if (!dataField.manufacturer) {
            alert("Please enter the manufacturer.");
        } else if (!dataField.numProduced) {
            alert("Please enter the number manufactured.");
        } else if (!dataField.description) {
            alert("Please enter the description.");
        }
    }
});
