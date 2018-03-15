import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './data.html';
import { log } from 'util';

Modal.allowMultiple = true;

Template.Data.helpers({
  courses() {
    return Courses.find({ owner: Meteor.userId() }).fetch();
  },
});

Template.Data.events({
  'click .logout'(event, instance) {
      Meteor.logout();
  }
})