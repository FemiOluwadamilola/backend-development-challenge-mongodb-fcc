var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true }).then(() => console.log('database connected successfully...')).catch(err => console.log(err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name:'Oluwadamilola',
    age:24,
    favouriteFoods:'rice and beans'
  })
 newPerson.save(function(err, data){
   if (err) return console.error(err);

   done(null, data);
 })
};

const arrayOfPeople = [
  {name:'Oluwadamilola', age:34, favouriteFoods:['yam','beans','bread']},
  {name:'Steve', age:20, favouriteFoods:['yam','beans','bread']},
  {name:'Racheal', age:19, favouriteFoods:['yam','beans','bread']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if(err) return console.error(err)
    done(null, data);
  })
};


const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err, result) {
    if(err) return console.error(err)
    done(null, result);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods:food}, function(err,result){
    if(err) return console.error(err)
    done(null, result);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, function(err,result){
    if(err) return console.error(err)
    done(null, result);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err,person){
    if(err) return console.log(err)
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err,result){
      if(err) return console.log(err)
      done(null, result);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, function(err, result){
    if(err) return console.log(err);
    done(null, result);
  },{new:true});
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},function(err,result){
     if(err) return console.log(err);
     done(null, result);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
