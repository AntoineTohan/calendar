Calendar = new Mongo.Collection('calendar');

Meteor.methods({
    'Calendar.RemoveAll'() {
      if (Calendar.find().count() !== 0 ){
        return Calendar.remove({});
      } else{
        console.log('Data is allready clean for Calendar');
      }
    },
  });