import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './data.html';
import { log } from 'util';

Template.Data.helpers({
  courses() {
    return Courses.find();
  }
});