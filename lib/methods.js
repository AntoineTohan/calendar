import moment from 'moment';
import tz from 'moment-timezone';

parseCalendar = (calendarString) => {
    const calendarArray = calendarString.split('\n');
    // console.log('cal', calendarArray)
    // const Courses = [];
    let result = {
        statValue: null,
        endValue: null,
        summaryValue: null,
        descriptionValue: null,
    }
    calendarArray.forEach((calendarLine) => {
        const start = /DTSTART.+:(.+)/g.exec(calendarLine);
        let statValue;
        if (!!start && start.length === 2 && !!start[1]) {
            result.statValue = tz(start[1]).tz('Europe/Paris').format('DD/MM/YYYY H:mm');
            // console.log(result.statValue);
        }
        const end = /DTEND.+:(.+)/g.exec(calendarLine);
        let endValue;
        if (!!end && end.length === 2 && !!end[1]) {
            result.endValue = tz(end[1]).tz('Europe/Paris').format('DD/MM/YYYY H:mm');
            // console.log(result.endValue);
        }
        const summary = /SUMMARY:(.+)/g.exec(calendarLine);
        let summaryValue;
        if (!!summary && summary.length === 2 && !!summary[1]) {
            result.summaryValue = summary[1];
            // console.log(result.summaryValue);
        }
        const description = /DESCRIPTION:(.+)/g.exec(calendarLine);
        let descriptionValue;
        if (!!description && description.length === 2 && !!description[1]) {
            result.descriptionValue = description[1];
            // console.log(result.descriptionValue);
        }
        
        if (!!result.statValue && !!result.endValue && !!result.summaryValue && !!result.descriptionValue) {
            // console.log(result)
            Courses.insert(result);
            result = {
                statValue: null,
                endValue: null,
                summaryValue: null,
                descriptionValue: null,
            }
        }
    });
    // console.log('res', Courses);
}
