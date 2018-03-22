import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './data.html';
import { log } from 'util';

Modal.allowMultiple = true;

Template.Index.onCreated(function () {
  Meteor.call('Data.ScrapingFalse');
});
 
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
  IsScrapping(){
    return  Meteor.users.find().fetch()[0].profile.Scraping;
  }
});

Template.Data.events({
  'click .logout'(event, instance) {
      Meteor.logout();
  },
  'click .removeCredentials'(event, instance) {
    Meteor.call('user.CrendentialRemove');
  },
  'click .refreshCalendar'(event, instance) {
    Meteor.call('Data.ScrapingTrue');
    login = Meteor.users.find().fetch()[0].profile.login;
    password = Meteor.users.find().fetch()[0].profile.password;
    Meteor.call('Data.getAllData');
  },
  'click .credentials'(event, instance) {
    Modal.show('Credentials');
  },
  'click .removeCourses'(event, instance) {
    Meteor.call('Calendar.RemoveAll');
    Meteor.call('Courses.RemoveAll');
  }
});

Template.Data.onRendered(function () {
  // Meteor.call('Data.getAllData');
});
