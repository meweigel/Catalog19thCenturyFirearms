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
var app = angular.module('gunListApp', []);
app.controller('gunFactsController', function ($scope, $http) {
    $scope.gunList = [];
    $scope.gun = {modelName: "", country: "", caliber: "", actionType: "",
        propellant: "", velocity: 0, rateOfFire: 0, range: 0, startService: "",
        endService: "", manufacturer: "", numProduced: "", description: ""};

    var chngFlags = {
        modelName: false,
        country: false,
        caliber: false,
        actionType: false,
        propellant: false,
        velocity: false,
        rateOfFire: false,
        range: false,
        startService: false,
        endService: false,
        manufacturer: false,
        numProduced: false,
        description: false
    };

    // Refresh the entire gun list
    var refresh = function () {
        $http.get('/gunList').then(function (response) {
            console.log("I got the data I requested");
            $scope.gunList = response.data;
            $scope.deselect();
        }, function (response) {
            console.error(response.data);
        });
    };

    // Refresh a single gun item
    var refreshGun = function (id) {
        $http.get('/gunList/' + id).then(function (response) {
            console.log("I got the gun data for: " + response.data.modelName);
            var index = $scope.gunList.map(function (x) {
                return x.modelName;
            }).indexOf(response.data.modelName);
            $scope.gunList[index] = response.data;
            $scope.deselect();
        }, function (response) {
            console.error(response.data);
        });
    };

    // Get the data for when the page is loaded
    refresh();

    // Montitor gun field Chngs
    $scope.onChange = function (data) {
        switch (data) {
            case $scope.gun.modelName:
                chngFlags.modelName = true;
                break;
            case $scope.gun.country:
                chngFlags.country = true;
                break;
            case $scope.gun.caliber:
                chngFlags.caliber = true;
                break;
            case $scope.gun.actionType:
                chngFlags.actionType = true;
                break;
            case $scope.gun.propellant:
                chngFlags.propellant = true;
                break;
            case $scope.gun.velocity:
                chngFlags.velocity = true;
                break;
            case $scope.gun.rateOfFire:
                chngFlags.rateOfFire = true;
                break;
            case $scope.gun.range:
                chngFlags.range = true;
                break;
            case $scope.gun.startService:
                chngFlags.startService = true;
                break;
            case $scope.gun.endService:
                chngFlags.endService = true;
                break;
            case $scope.gun.manufacturer:
                chngFlags.manufacturer = true;
                break;
            case $scope.gun.numProduced:
                chngFlags.numProduced = true;
                break;
            case $scope.gun.description:
                chngFlags.description = true;
                break;
        }
    };

    // Add a new gun type
    $scope.addGun = function () {
        var index = $scope.gunList.map(function (x) {
            return x._id;
        }).indexOf($scope.gun._id);

        console.log("index = " + index);

        // Only add gun if it doesn't already exist
        if (index === -1) {
            var dataField = doGunFieldsHaveData();
            // Make sure there are no empty fields
            if (dataField.modelName && dataField.country && dataField.caliber &&
                    dataField.actionType && dataField.propellant && dataField.velocity &&
                    dataField.rateOfFire && dataField.range && dataField.startService &&
                    dataField.endService && dataField.manufacturer && dataField.numProduced &&
                    dataField.description) {
                if (isYearValid($scope.gun.startService)) {
                    console.log($scope.gun);
                    $http.post('/gunList', $scope.gun).then(function (response) {
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
        $http.delete('/gunList/' + id).then(function (repsonse) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/gunList/' + id).then(function (response) {
            $scope.gun = response.data;
        });
    };

    $scope.update = function (id) {
        if (chngFlags.modelName || chngFlags.country || chngFlags.caliber ||
                chngFlags.actionType || chngFlags.propellant || chngFlags.velocity ||
                chngFlags.rateOfFire || chngFlags.range || chngFlags.startService ||
                chngFlags.endService || chngFlags.manufacturer || chngFlags.numProduced ||
                chngFlags.description) {

            if (isYearValid($scope.gun.startService)) {
                console.log($scope.gun._id);
                $http.put('/gunList/' + id, $scope.gun).then(function (repsonse) {
                    refreshGun(repsonse.data._id);
                    resetChangeFlags();
                });
            } else {
                alert("19 Century Year Format: 18XX");
            }
        }
    };

    $scope.deselect = function () {
        if ($scope.gun !== null) {
            $scope.gun._id = "";
            $scope.gun.modelName = "";
            $scope.gun.country = "";
            $scope.gun.caliber = "";
            $scope.gun.actionType = "";
            $scope.gun.propellant = "";
            $scope.gun.velocity = 0;
            $scope.gun.rateOfFire = 0;
            $scope.gun.range = 0;
            $scope.gun.startService = "";
            $scope.gun.endService = "";
            $scope.gun.manufacturer = "";
            $scope.gun.numProduced = "";
            $scope.gun.description = "";
        }
    };

    function doGunFieldsHaveData() {
        var dataField = {
            modelName: ($scope.gun.modelName.length > 0),
            country: ($scope.gun.country.length > 0),
            caliber: ($scope.gun.caliber.length > 0),
            actionType: ($scope.gun.actionType.length > 0),
            propellant: ($scope.gun.propellant.length > 0),
            velocity: ($scope.gun.velocity > 0),
            rateOfFire: ($scope.gun.rateOfFire > 0),
            range: ($scope.gun.range > 0),
            startService: ($scope.gun.startService.length > 0),
            endService: ($scope.gun.endService.length > 0),
            manufacturer: ($scope.gun.manufacturer.length > 0),
            numProduced: ($scope.gun.numProduced.length > 0),
            description: ($scope.gun.description.length > 0)
        };
        return dataField;
    }


    function resetChangeFlags() {
        chngFlags.modelName = false;
        chngFlags.country = false;
        chngFlags.caliber = false;
        chngFlags.actionType = false;
        chngFlags.propellant = false;
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
        } else if (!dataField.propellant) {
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
