import {Template} from "meteor/templating";
import tz from "moment";
import _ from 'lodash';

Template.ecalendar.onRendered( function() {
    let events;
	$('#events-calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: function(start, end, timezone, callback) {
			events = [];
			let event = Courses.find().fetch().map((obj)=>{return obj.result});
			event.forEach(function(evt) {
                let title = /(.+)(?=SALLE)/g.exec(evt.summaryValue);
                if (title === null || title === undefined){ 
                    title = /(.+)(?=ANNEXE)/g.exec(evt.summaryValue);
                }
                if (title === null || title === undefined){
                    title = evt.summaryValue;
                }
				events.push({
					title: title[0],
					teacher: evt.descriptionValue,
					start: evt.statValue,
                    end: evt.endValue,
                    location: evt.locationValue,
				});
			});
            callback(events);
        },
        eventRender: function(event, element) {
            element.find('.fc-title').append("<br/><br/>" +  event.teacher.toUpperCase() + "<br/><b>" + event.location + "</b>"); 
        },
        
        timeFormat: 'H(:mm)',
		selectable: true,
		allDayDefault: false,
        defaultView: 'agendaWeek',
        minTime: "07:00:00",
        maxTime: "18:00:00",
        eventStartEditable: false,
        editable: true,
        eventDurationEditable: false,
	})
});

Template.ecalendar.events({
    'click .fc-time-grid-event'(event, instance) {
    }
  });