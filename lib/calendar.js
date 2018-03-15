Calendar = new Mongo.Collection('calendar');

if (Meteor.isServer) {
    Meteor.publish('calendar', function calendarPublication() {
      return Calendar.find();
    });
  }

Meteor.methods({
    'Calendar.RemoveAll'() {
        if (Calendar.find().count() !== 0 ){
            return Calendar.remove({});
        } else{
            console.log('Data is allready clean for Calendar');
      }
    },
});