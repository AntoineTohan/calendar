import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './data.html';
import { log } from 'util';

Modal.allowMultiple = true;

Template.Data.helpers({
  courses() {
    return Courses.find({ owner: Meteor.userId() }).fetch();
  },
  hasCredential() {
    const profil = Meteor.users.find().fetch()[0].profile;
    if (profil.login && profil.password) {
      if (profil.login != null && profil.password != null) {
        return true;
      } else {
        return false;
      }
    } else return false;
  },
  });

Template.Data.events({
  'click .logout'(event, instance) {
      Meteor.logout();
  },
  'click .removeCredentials'(event, instance) {
    Meteor.call('user.CrendentialRemove');
  },
  'click .refreshCalendar'(event, instance) {
    login = Meteor.users.find().fetch()[0].profile.login;
    password = Meteor.users.find().fetch()[0].profile.password;
    Meteor.call('Data.getAllData');
  },
  'click .credentials'(event, instance) {
    Modal.show('Credentials');
}
});

Template.Data.onRendered(function () {
  // Meteor.call('Data.getAllData');
});
