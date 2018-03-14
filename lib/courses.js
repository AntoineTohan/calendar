Courses = new Mongo.Collection('courses');

Meteor.methods({
  'Courses.RemoveAll'() {
    if (Courses.find().count() !== 0 ){
      return Courses.remove({});
    } else{
      console.log('Data is allready clean for Courses');
    }
  },
});