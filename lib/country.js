'use strict';

var City = require('./city');
var fs = require('fs');

/**
 * A class for countries.
 *
 * @constructor
 * @param {String} name The country name.
 */
var Country = function(name) {
  this._name = name;
  this._cities = [];
};

/**
 * Add a new city.
 *
 * @param {String} name The name of the city.
 * @param {Object} details The details of the city.
 * @return {City} Returns the created city.
 * @see {@link City}
 */
Country.prototype.addCity = function(name, details) {
  var city = new City(name, details);
  this._cities.push(city);
  return city;
};

/**
 * Find small cities, those with populations less than 200,000.
 *
 * @return {Array.<String>} An array of small city names.
 */
Country.prototype.findSmallCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population < 0.2;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find medium cities, those with populations between 200,000 and 1 million.
 *
 * @return {Array.<String>} An array of medium city names.
 */
Country.prototype.findMediumCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 0.2 && population < 1;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find large cities, those with populations greater than 1 million.
 *
 * @return {Array.<String>} An array of large city names.
 */
Country.prototype.findLargeCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 1;
  }).map(function(city) {
    return city.getName();
  });
};


/**
 * This will load all of the cities from the file asychronously. It will load them from the csv file.
 *
 * @method
 * @param  {String} cityFile- The full path to the cities.csv directory.
 * @param  {function} cb - The callback.
 */

Country.prototype.loadCities = function(CityFile, cb) {

  fs.readFile(CityFile, { encoding: "utf8" }, function(err, fileContents) {
    var allTheCities = fileContents.trim().split('\n'); //trim removes whitespace, split - splits string into array
    console.log(allTheCities);
    allTheCities.forEach(function(citiesInLine) {
      // console.log(citiesInLine);
      var components = citiesInLine.split(',');
      // console.log(components);
      // console.log(cityName);
      var cityName = components[0];
      var cityPopulation = components[1];
      this.addCity(cityName, { population: cityPopulation });
    }.bind(this));
    //.bind creates a new function that binds the this arguments to  the following function
    setTimeout(cb, 0);

  }.bind(this));
};


// next we need to create the callback, as this is what is causing the test to fail at the moment


//     fs.readdir(directory, function(err, files){
//     if (err) { cb(err); return; }
//     var fileNames = _.filter(files, function(file){
//       return file !== 'cities.csv';
//     });

// //these functions below return cities based on population size. 
// //will need to push this into an array 
//   return this._cities.filter(function(city) {
//     var population = city.getPopulation();
//     return population;
//   }).map(function(city) {
//     return city.getName();
//   });
// });
// };

//will require a cb while reading each function


  // TODO: implement this method
  // general steps:
  //   1. determine the inputs to the function & define the parameters
  //   1. `console.log` to really understand what you're working with
  //   1. read the contents of the file that was given to you
  //   1. `console.log` the contents to really make sure you have what you
  //      think after reading the file.
  //   1. iterate each line of the file.
  //   1. `console.log` the line to make sure you have what you think.
  //   1. do something to extract `cityName` and `cityPopulation` from the
  //      line.
  //   1. `console.log` each of these variables to really ensure you have what
  //      you think.
  //   1. call `addCity` with the required information for each city in the
  //      file. examples of calling `addCity` are in the tests.
  //   1. indicate completion of the asynchronous operation when all cities
  //      have been added.


module.exports = Country;
