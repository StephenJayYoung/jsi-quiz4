var expect = require('chai').expect;
var Country = require('../lib/country');
var path = require('path');

describe('Country', function() {
  it('can access small cities', function() {
    var usa = new Country('USA');
    usa.addCity('Chicago', { population: 2.715 });
    usa.addCity('Portland', { population: 0.603 });
    usa.addCity('New York', { population: 8.337 });
    usa.addCity('Baltimore', { population: 0.621 });
    usa.addCity('Savannah', { population: 0.142 });
    usa.addCity('Salt Lake City', { population: 0.189 });

    var cities = usa.findSmallCities();
    expect(cities).to.eql(['Savannah', 'Salt Lake City']);
  });



  it('can access medium cities', function() {
    var usa = new Country('USA');
    usa.addCity('Chicago', { population: 2.715 });
    usa.addCity('Portland', { population: 0.603 });
    usa.addCity('New York', { population: 8.337 });
    usa.addCity('Baltimore', { population: 0.621 });
    usa.addCity('Savannah', { population: 0.142 });
    usa.addCity('Salt Lake City', { population: 0.189 });

    var cities = usa.findMediumCities();
    expect(cities).to.eql(['Portland', 'Baltimore']);
  });

  it('can access large cities', function() {
    var usa = new Country('USA');
    usa.addCity('Chicago', { population: 2.715 });
    usa.addCity('Portland', { population: 0.603 });
    usa.addCity('New York', { population: 8.337 });
    usa.addCity('Baltimore', { population: 0.621 });
    usa.addCity('Savannah', { population: 0.142 });
    usa.addCity('Salt Lake City', { population: 0.189 });

    var cities = usa.findLargeCities();
    expect(cities).to.eql(['Chicago', 'New York']);
  });


//This is the faiing test
  it('reads cities', function(done) {
    var usa = new Country('USA');
    var file = path.join(__dirname, 'fixtures/cities.csv');
    usa.loadCities(file, function(err) {
        var small = usa.findSmallCities();
        var medium = usa.findMediumCities();
        var large = usa.findLargeCities();
        expect(small).to.eql(['Savannah', 'Salt Lake City']);
        expect(medium).to.eql(['Portland', 'Baltimore']);
        expect(large).to.eql(['Chicago', 'New York']);
        done();
    });
    // console.log(file);
    // console.log(usa);
    // console.log(usa.findSmallCities);
  });
});


