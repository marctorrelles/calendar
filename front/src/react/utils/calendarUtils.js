import moment from 'moment';

export function makeCalendar(currentMonth, events) {

    let posFirst = currentMonth.startOf('month').day();
    let posLast = currentMonth.endOf('month').day();
    let startDate = currentMonth.format('YYYY-MM-01');
    let endDate = currentMonth.format('YYYY-MM-') + currentMonth.daysInMonth();

    let calendar = [];

    // Create days
    while (posFirst > 0) {
        const day = currentMonth.clone().startOf('month').subtract(posFirst,'days');
        calendar.push(createCalendarObject(day, false, calendar));
        posFirst--;
    }
    while (startDate <= endDate) {
        const day = moment(startDate);
        calendar.push(createCalendarObject(day, true, calendar));
        startDate = day.add(1, 'days').format('YYYY-MM-DD');
    }
    let counter = 1;
    while (posLast < 6) {
        const day = currentMonth.clone().endOf('month').add(counter,'days');
        calendar.push(createCalendarObject(day, false, calendar));
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

function createCalendarObject(day, isActualMonth, calendar) {
    const isFirst = ((day.date() === 1) || !calendar.length);
    return {
        day: day,
        dayOfTheMonth: day.date(),
        dayOfTheWeek: day.day(),
        date: day.format("DD/MM/YYYY"),
        isFirst: isFirst,
        isActualMonth: isActualMonth,
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
