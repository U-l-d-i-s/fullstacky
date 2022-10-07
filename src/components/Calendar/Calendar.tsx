import { useEffect, useState } from 'react';
import { number } from 'zod';
import styles from './Calendar.module.css';

type ObjectMonthType = {
    [keys: string]: {
        name: string,
        dayCount: number,
    }
}

const MonthData: ObjectMonthType = {
    Jan: {
        name: 'January',
        dayCount: 30,
    },
    Feb: {
        name: 'February',
        dayCount: 28
    },
    Mar: {
        name: 'March',
        dayCount: 31,
    },
    Apr: {
        name: 'April',
        dayCount: 30,
    },
    May: {
        name: 'May',
        dayCount: 31,
    },
    Jun: {
        name: 'June',
        dayCount: 30,
    },
    Jul: {
        name: 'July',
        dayCount: 31,
    },
    Aug: {
        name: 'August',
        dayCount: 31,
    },
    Sep: {
        name: 'September',
        dayCount: 30,
    },
    Oct: {
        name: 'October',
        dayCount: 31,
    },
    Nov: {
        name: 'November',
        dayCount: 30,
    },
    Dec: {
        name: 'December',
        dayCount: 31,
    },
}
const DayStringTransl: Record<string, string> = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
}

type CalendarValuesType = {
    weekDay: number,
    getDayNumber: number,
    monthNumber: number
    dayString: string,
    monthString: string,
    year: number,
    firstDayOfMonth?: number | null,
};

type CalendarType = {
    isOpen: boolean,
};

const Calendar = ({ isOpen }: CalendarType) => {
    const getDate = new Date();

    const getStringMonth: string = getDate.toString().slice(4, 7);
    const getStringDay: string = getDate.toString().slice(0, 3);

    // Number() also gets rid of starting zeros
    const getDayNumber: number = Number(getDate.toString().slice(8, 10));

    // const prevMontDayCount = MonthStringTransl

    const [date, setDate] = useState<CalendarValuesType>({
        weekDay: getDate.getDay(),
        getDayNumber: getDayNumber,
        monthNumber: getDate.getMonth(),
        dayString: DayStringTransl[getStringDay] || 'day...',
        monthString: MonthData[getStringMonth]?.name || '',
        year: getDate.getFullYear(),
        firstDayOfMonth: null,
    })

    useEffect(() => {
        const firstDayOfMonth = getFirstMonthDay(getDayNumber);
        setDate({ ...date, firstDayOfMonth })
    },[]);

    const getFirstMonthDay = (currentDay: number) => {

        // 18. datums, 6diena - vajag 1. datumu
        // 18-7 = 11 => 11-7 = 4 => 4 < 7 => 4 - 7 => 3diena (strada)

        // 16. datums, 6diena - vajag 1. datumu
        // 16-7 = 9 => 9-7 = 2 => 2 < 7 => 2 - 7  (1diena) (nestrada)

        // 9.datums 7diena
        // 7-2 5diena
        const tempDay = currentDay - 7;

        if (tempDay > 7) {
            getFirstMonthDay(tempDay)
        }

        if (tempDay < 7) return 7 - tempDay;
        if (tempDay === 7) return tempDay;
    };

    const onClickHandler = () => {

    };

    if (date.firstDayOfMonth) {
        console.log(date);
    }

    return (
        <div>
            <table>
                <tr>
                    <td>{'<'}</td>
                    <td><p>{date.monthString}</p></td>
                    <td>{'>'}</td>
                </tr>
            </table>
        </div>
    );
};

export default Calendar;