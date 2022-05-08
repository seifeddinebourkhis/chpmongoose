const express = require ('express')
const router = express.Router()
const Person = require('../models/user')

//Create and Save a Record of a Model:
router.post("/mongoose-model", (req, res) => {
    var p = new Person({name:req.body.name,
    age:req.body.age, favoriteFoods:req.body.favoriteFoods});
    p.save()
   .then((result)=> res.send(result)) 
      .catch((err)=>console.error(err));
  
  });

  //Create Many Records with model.create()
  router.post("/create-many-people", (req, res) => {
    const y= req.body
     Person.create(y)
   .then((result)=> res.send(result)) 
      .catch((err)=>console.error(err));
  
  });

   //Use model.find() to Search Your Database
   router.post('/Find-by-name', function (req, res) {
    var Name = req.body.name;
    
  
    Person.find({name: Name},  function(err, Person) {
      if(err) return next(err);
      if(Person) return res.send(Person);
    })
  });

   // Use model.findOne() to Return a Single Matching Document from Your Database
   router.post('/Find-one-by-food', function (req, res) {
    var FavouriteFood = req.body.favoriteFoods;
    
  
    Person.findOne({favoriteFoods: FavouriteFood},  function(err, Person) {
      if(err) return next(err);
      if(Person) return res.send(Person);
    })
  });
    
  
  router.get('/Find-by-id', function (req, res) {
    var fetchedID = req.body._id;
    
  
    Person.findOne({_id: fetchedID},  function(err, Person) {
      if(err) return next(err);
      if(Person) return res.send(Person);
    })
  });
  
   //Perform Classic Updates by Running Find, Edit, then Save
   router.put('/Find-Edit', function (req, res){
    const personId = req.body._id;
     const foodToAdd = "hamburger";
     
     Person.findById({_id: personId})
     
     .then((result) => {
         console.log(res)
     result.favoriteFoods.push(foodToAdd)
     console.log('your favouriteFoods is updated successfully')
          result.save()
          res.send(result)
      
          })
          .catch((err) => console.log(err))
    
    });
  
      //Perform New Updates on a Document Using model.findOneAndUpdate()
      router.put('/Find-One-Update', function (req, res){
  
    
        var personName = req.body.name;
        var ageToSet = 20;
         Person.findOneAndUpdate(
           {"name": personName},
            {$set: {"age":ageToSet}},
            {new : true},
        
            function(err, Person) {
            if(err) return next(err);
            if(Person) return res.send(Person);
          }
        )});

         //Delete One Document Using model.findByIdAndRemove
    router.delete('/Find-By-Id-Remove', function (req, res){
        var personId = req.body._id;
         Person.findByIdAndRemove({_id: personId},  function(err, Person) {
            if(err) return next(err);
            if(Person) return res.send(Person);
          })
        });
  
        //MongoDB and Mongoose - Delete Many Documents with model.remove()
    router.delete('/Find-Remove', function (req, res){
        var person_Name = 'Mary'
        Person.remove({name: person_Name},  function(err, Person) {
            if(err) return next(err);
            if(Person) return res.send(Person);
          })
        
        });

        //Chain Search Query Helpers to Narrow Search Results
    router.post('/FindSort',function (req, res){
        const chainSearch = "burritos";
           Person.find({ favoriteFoods: chainSearch })
          .sort({ name: 1 })
          .limit(2)
          .select({age:0})
          .exec((err, Person) =>
            err
              ? next(err)
              : res.send(Person)
          )
        
        })
  
  
  
  
  module.exports = router 