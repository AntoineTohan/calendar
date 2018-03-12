import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import './scrap';

Meteor.startup(() => {
  SyncedCron.add({
    name: 'Get Calendar from ecampus',
    schedule: function(parser) {
      return parser.text('every 5 minutes');
    },
    job: function() {
      Meteor.call('Data.getAllData');
    }
  });

SyncedCron.start();
});