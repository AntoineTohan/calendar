Calendar = new Mongo.Collection('calendar');

if (Meteor.isServer) {
    Meteor.publish('calendar', function calendarPublication() {
      return Calendar.find({ owner: Meteor.userId() });
    });
  }

Meteor.methods({
    'Calendar.RemoveAll'() {
        if (Calendar.find({ owner: Meteor.userId() }).count() !== 0 ){
            return Calendar.remove({ owner: Meteor.userId() });
        } else{
            console.log('Data is allready clean for Calendar');
      }
    },
});