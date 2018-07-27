import moment from 'moment';
import Calendar from "../components/calendar";


export function makeCalendar(currentMonth) {

    let posFirst = currentMonth.startOf('month').day();
    let posLast = currentMonth.endOf('month').day();
    let startDate = currentMonth.format("YYYY-MM-01");
    let endDate = currentMonth.format("YYYY-MM-") + currentMonth.daysInMonth();

    let calendar = [];

    while (posFirst > 0) {
        const day = currentMonth.clone().startOf('month').subtract(posFirst,"days");
        calendar.push({
            day: day.date(),
            dayOfTheWeek: day.day(),
            isActualMonth: false
        });
        posFirst--;
    }
    while (startDate <= endDate) {
        const day = moment(startDate);
        calendar.push({
            day: day.date(),
            dayOfTheWeek: day.day(),
            isActualMonth: true
        });
        startDate = day.add(1, "days").format("YYYY-MM-DD");
    }
    let counter = 1;
    while (posLast < 6) {
        const day = currentMonth.clone().endOf('month').add(counter,"days");
        calendar.push({
            day: day.date(),
            dayOfTheWeek: day.day(),
            isActualMonth: false
        });
        counter++;
        posLast++;
    }

    return calendar;

}
