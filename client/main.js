import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import { log } from 'util';

Template.Index.onCreated(function () {
  this.subscribe('calendar');
  this.subscribe('courses');
});
