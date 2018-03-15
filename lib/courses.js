Courses = new Mongo.Collection('courses');

if (Meteor.isServer) {
  Meteor.publish('courses', function CoursesPublication() {
    return Courses.find({ owner: Meteor.userId() });
  });
}

Meteor.methods({
  'Courses.RemoveAll'() {
    if (Courses.find({ owner: Meteor.userId() }).count() !== 0 ){
      return Courses.remove({ owner: Meteor.userId() });
    } else{
      console.log('Data is allready clean for Courses');
    }
  },
});