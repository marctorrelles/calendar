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