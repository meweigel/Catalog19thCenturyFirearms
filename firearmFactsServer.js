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

/* global __dirname */

/**
 * 
 * Author: Michael E. Weigel
 * 
 * @type Module express|Module express
 * 
 * The Nodejs Server
 */
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('firearmsList', ['firearmsList']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/images'));

/**
 * Get All firearms
 */
app.get('/firearmsList', function (req, res) {
    console.log("I received a GET request");
    db.firearmsList.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

/**
 * Get a specific firearm with the id.
 */
app.get('/firearmsList/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.firearmsList.findOne({_id: mongojs.ObjectID(id)}, function (err, doc) {
        res.json(doc);
    });
});


/**
 * Add a new firearm entry to the database
 */
app.post('/firearmsList', function (req, res) {
    console.log(req.body);
    db.firearmsList.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

/**
 * Delete a single firearm with the id.
 */
app.delete('/firearmsList/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.firearmsList.remove({_id: mongojs.ObjectID(id)}, function (err, doc) {
        res.json(doc);
    });
});

/**
 * Update a single firearm with the id.
 */
app.put('/firearmsList/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.modelName);
    db.firearmsList.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {modelName: req.body.modelName, modelImage: req.body.modelImage, 
                country: req.body.country, caliber: req.body.caliber, actionType: req.body.actionType,
                ammunition: req.body.ammunition, velocity: req.body.velocity,
                rateOfFire: req.body.rateOfFire, range: req.body.range,
                startService: req.body.startService, endService: req.body.endService,
                manufacturer: req.body.manufacturer, numProduced: req.body.numProduced,
                description: req.body.description}},
        new : true}, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
