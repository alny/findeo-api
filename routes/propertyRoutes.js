const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Property = mongoose.model('property');
const async = require('async');

module.exports = app => {

  app.post('/post/property',  async (req, res, next) => {
      console.log(req.body)

      const { title, type, status, floor, size, rooms, montlyRent, aconto, deposit, prePaidRental, totalPrice, rentalPeriod,
              moveDate, address, city, zipcode, description, furnished, shareable, animals, propertyBy } = req.body

      const property = new Property({
        title, type, status, floor, size, rooms, montlyRent, aconto, deposit, prePaidRental, totalPrice,
        rentalPeriod, moveDate, address, city, zipcode, description, furnished, shareable, animals,
        propertyBy
      })
      async.waterfall([
        function(callback){
          Property.create(property, function(err, property){
            if(err) return next(err)
            callback(err, property)
          })
        },
        function(property, callback){
          User.findOne({_id: propertyBy }, function(err, foundUser){
            foundUser.properties.push(property._id);
            foundUser.save(function(err){
              if(err) return next(err);
            })
            res.json({
              confirmation: 'success'
            })
          })

        }
      ])
    })

    app.get('/properties', async (req, res, next) => {

      var page = req.query.page;
      var city = req.query.city;
      var type = req.query.type;
      var status = req.query.status;
      var zipcode = req.query.zipcode;

      var pagesize = 4
      delete req.query.page;

      if(city == undefined) {
        var setCity = {}
      }
      else {
        var setCity = { city: city }
      }

      if(zipcode == undefined){
        var setZipcode = {}
      } else {
        var setZipcode = { zipcode:zipcode }
      }

      if(type == undefined) {
        var setType = {}
      }
      else {
        var setType = { type: type }
      }

      if(status == undefined) {
        var setStatus = {}
      }
      else {
        var setStatus = { status: status }
      }

      var params = req.query;

      Property.find(params)
      .where(setCity)
      .where(setZipcode)
      .where(setType)
      .where(setStatus)
      .sort({'timestamp' : -1})
      .skip(pagesize*(page-1))
      .limit(pagesize)
      .exec(function(err, result) {
        if (err) return next(err);
        res.json({
          confirmation: 'success',
          result: result
        })
      });


    })


};
