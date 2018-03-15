import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import './scrap';

SyncedCron.add({
  name: 'Get Calendar from ecampus',
  schedule: function (parser) {
    return parser.text('every 2 hours');
  },
  job: function () {
    Meteor.call('Data.getAllData');
  }
});

Meteor.startup(() => {
  SyncedCron.start();
});
