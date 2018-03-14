# calendar
All the tips if on Client Console
For Parse the Calendar and generate all the Courses : parseCalendar(Calendar.find().fetch()[0].calendar)
For remove all the collection Calendar :  Meteor.call('Calendar.RemoveAll');
For remove all the collection Courses : Meteor.call('Courses.RemoveAll');