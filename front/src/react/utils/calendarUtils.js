import moment from 'moment';

export function makeCalendar(currentMonth, events) {

    let posFirst = roundWeekDay(currentMonth.startOf('month').day() -1);
    let posLast = roundWeekDay(currentMonth.endOf('month').day() -1);
    let startDate = currentMonth.format('YYYY-MM-01');
    let endDate = currentMonth.format('YYYY-MM-') + currentMonth.daysInMonth();

    let calendar = [];

    // Create days
    // NOTE: First day of week (pos 0) is Sunday, but as we want the week to start on monday we must compare it to 1
    while (posFirst > 0) {
        const day = currentMonth.clone().startOf('month').subtract(posFirst,'days');
        const isToday = day.clone().format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        calendar.push(createCalendarObject(day, false, isToday, calendar));
        posFirst--;
    }
    while (startDate <= endDate) {
        const day = moment(startDate);
        const isToday = day.clone().format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        calendar.push(createCalendarObject(day, true, isToday, calendar));
        startDate = day.add(1, 'days').format('YYYY-MM-DD');
    }
    // NOTE: We must compare it to 7, same reason than before
    let counter = 1;
    while (posLast < 6) {
        const day = currentMonth.clone().endOf('month').add(counter,'days');
        const isToday = day.clone().format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        calendar.push(createCalendarObject(day, false, isToday, calendar));
        counter++;
        posLast++;
    }

    // Put events
    events.forEach( event => {
        const startDate = moment(event.start).format("DD/MM/YYYY");
        calendar.forEach( (day, index) => {
            if (day.date === startDate) {
                calendar[index].events.push(event);
            }
        });
    });

    return calendar;

}

function roundWeekDay(weekDay) {
    return weekDay < 0 ? 6 : weekDay;
}

function createCalendarObject(day, isActualMonth, isToday, calendar) {
    const isFirst = ((day.date() === 1) || !calendar.length);
    return {
        day: day,
        dayOfTheMonth: day.date(),
        dayOfTheWeek: day.day(),
        date: day.format("DD/MM/YYYY"),
        isFirst: isFirst,
        isActualMonth: isActualMonth,
        isToday: isToday,
        events: []
    }
}

export function handleDateTime(field, event, dateTime) {
    if (field === "startDate")
        return handleDate(event.start, dateTime);
    else if (field === "endDate")
        return handleDate(event.end, dateTime);
    else if (field === "startTime")
        return handleTime(event.start, dateTime);
    else if (field === "endTime")
        return handleTime(event.end, dateTime);
}

function handleDate(oldDateTime, dateTime) {
    const datetime = oldDateTime ? oldDateTime : moment().hour(0).minutes(0);

    const momentDate = moment(dateTime + ' ' + moment(datetime).format('HH:mm'));
    return momentDate.isValid() ? momentDate.toISOString() : false;
}

function handleTime(oldDateTime, dateTime) {
    const momentDate = moment(moment(oldDateTime).format('YYYY-MM-DD') + ' ' + dateTime);
    return momentDate.isValid() ? momentDate.toISOString() : false;
}
