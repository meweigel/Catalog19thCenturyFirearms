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

var app = angular.module('firearmsListApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.controller('firearmFactsController', function ($scope, $http, $uibModal) {
    $scope.firearmsList = [];
    $scope.sortType = 'modelName'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFirearms = '';  // set the default search/filter term
    $scope.popUpWindow = undefined;

    $scope.firearm = {modelName: undefined, modelImage: undefined, country: undefined, caliber: undefined, actionType: undefined,
        ammunition: undefined, velocity: undefined, rateOfFire: undefined, range: undefined, startService: undefined,
        endService: undefined, manufacturer: undefined, numProduced: undefined, description: undefined};

    var chngFlags = {
        modelName: false,
        modelImage: false,
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
            case $scope.firearm.modelImage:
                chngFlags.modelImage = true;
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
            var dataFlag = doFieldsHaveData();
            // Make sure there are no empty fields
            if (dataFlag.modelName && dataFlag.modelImage && dataFlag.country && dataFlag.caliber &&
                    dataFlag.actionType && dataFlag.ammunition && dataFlag.velocity &&
                    dataFlag.rateOfFire && dataFlag.range && dataFlag.startService &&
                    dataFlag.endService && dataFlag.manufacturer && dataFlag.numProduced &&
                    dataFlag.description) {
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
                showEmptyFieldAlert(dataFlag);
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
        if (chngFlags.modelName || chngFlags.modelImage || chngFlags.country || chngFlags.caliber ||
                chngFlags.actionType || chngFlags.ammunition || chngFlags.velocity ||
                chngFlags.rateOfFire || chngFlags.range || chngFlags.startService ||
                chngFlags.endService || chngFlags.manufacturer || chngFlags.numProduced ||
                chngFlags.description) {

            var dataFlag = doFieldsHaveData();
            // Make sure there are no empty fields
            if (dataFlag.modelName && dataFlag.modelImage && dataFlag.country && dataFlag.caliber &&
                    dataFlag.actionType && dataFlag.ammunition && dataFlag.velocity &&
                    dataFlag.rateOfFire && dataFlag.range && dataFlag.startService &&
                    dataFlag.endService && dataFlag.manufacturer && dataFlag.numProduced &&
                    dataFlag.description) {
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
                showEmptyFieldAlert(dataFlag);
            }
        }
    };

    $scope.deselect = function () {
        if ($scope.firearm !== null) {
            $scope.firearm._id = undefined;
            $scope.firearm.modelName = undefined;
            $scope.firearm.modelImage = undefined;
            $scope.firearm.country = undefined;
            $scope.firearm.caliber = undefined;
            $scope.firearm.actionType = undefined;
            $scope.firearm.ammunition = undefined;
            $scope.firearm.velocity = undefined;
            $scope.firearm.rateOfFire = undefined;
            $scope.firearm.range = undefined;
            $scope.firearm.startService = undefined;
            $scope.firearm.endService = undefined;
            $scope.firearm.manufacturer = undefined;
            $scope.firearm.numProduced = undefined;
            $scope.firearm.description = undefined;
        }
    };


    $scope.popUp = function (url, title) {
        var img = new Image();
        img.src = url;
        var w = img.width;
        var h = img.height;

        if ($scope.popUpWindow !== undefined && !$scope.popUpWindow.closed) {
            $scope.popUpWindow.close();
            $scope.popUpWindow = undefined;
        }

        if (w == 0) {
            w = 1200;
        }

        if (h == 0) {
            h = 296;
        }

        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        $scope.popUpWindow = window.open(url, title, 'alwaysRaised=yes, z-lock=no, toolbar=no, ' +
                'location=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
                w + ', height=' + h + ', top=' + top + ', left=' + left);

    }


    function doFieldsHaveData() {
        var dataFlag = {
            modelName: ($scope.firearm.modelName !== undefined),
            modelImage: ($scope.firearm.modelImage !== undefined),
            country: ($scope.firearm.country !== undefined),
            caliber: ($scope.firearm.caliber !== undefined),
            actionType: ($scope.firearm.actionType !== undefined),
            ammunition: ($scope.firearm.ammunition !== undefined),
            velocity: ($scope.firearm.velocity !== undefined),
            rateOfFire: ($scope.firearm.rateOfFire !== undefined),
            range: ($scope.firearm.range !== undefined),
            startService: ($scope.firearm.startService !== undefined),
            endService: ($scope.firearm.endService !== undefined),
            manufacturer: ($scope.firearm.manufacturer !== undefined),
            numProduced: ($scope.firearm.numProduced !== undefined),
            description: ($scope.firearm.description !== undefined)
        };
        return dataFlag;
    }


    function resetChangeFlags() {
        chngFlags.modelName = false;
        chngFlags.modelImage = false;
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


    function showEmptyFieldAlert(dataFlag) {
        if (!dataFlag.modelName) {
            alert("Please enter the model name.");
        } else if (!dataFlag.modelImage) {
            alert("Please enter the model image.");
        } else if (!dataFlag.country) {
            alert("Please enter the country.");
        } else if (!dataFlag.caliber) {
            alert("Please enter the caliber.");
        } else if (!dataFlag.actionType) {
            alert("Please enter the action type.");
        } else if (!dataFlag.ammunition) {
            alert("Please enter the ammunition.");
        } else if (!dataFlag.velocity) {
            alert("Please enter the velocity.");
        } else if (!dataFlag.rateOfFire) {
            alert("Please enter the rate of fire.");
        } else if (!dataFlag.range) {
            alert("Please enter the range.");
        } else if (!dataFlag.startService) {
            alert("Please enter the start service date.");
        } else if (!dataFlag.endService) {
            alert("Please enter the end service date.");
        } else if (!dataFlag.manufacturer) {
            alert("Please enter the manufacturer.");
        } else if (!dataFlag.numProduced) {
            alert("Please enter the number manufactured.");
        } else if (!dataFlag.description) {
            alert("Please enter the description.");
        }
    }

    var $ctrl = this;
    $ctrl.animationsEnabled = true;

    $ctrl.open = function (firearm) {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'xl',
            resolve: {
                param: function () {
                    return {'data': firearm};
                }
            }
        });
    };

    $ctrl.toggleAnimation = function () {
        $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
    };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
angular.module('firearmsListApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, param) {
    var $ctrl = this;
    $scope.data = param.data;
    $scope.imgStyle = getImageStyle(param.data.modelImage);


    function getImageStyle(imageNode) {
        var img = new Image();
        img.src = imageNode;
        var width = img.width + "px";

        var imgStyle = {
            "width": "1200px"
        }

        return imgStyle;
    }

    $ctrl.close = function () {
        $uibModalInstance.dismiss();
    };
});