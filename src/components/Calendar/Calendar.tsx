import { useEffect, useMemo, useState } from 'react';
import { array, number } from 'zod';
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

    const [date, setDate] = useState<CalendarValuesType>({
        weekDay: getDate.getDay(),
        getDayNumber: getDayNumber,
        monthNumber: getDate.getMonth(),
        dayString: DayStringTransl[getStringDay] || '',
        monthString: MonthData[getStringMonth]?.name || '',
        year: getDate.getFullYear(),
        firstDayOfMonth: null,
    })

    useEffect(() => {
        const firstDayOfMonth = getFirstMonthDay(getDayNumber);
        setDate({ ...date, firstDayOfMonth })
    }, []);

    // this recursion gets first day (monday, friday) of the month
    const getFirstMonthDay = (currentDay: number) => {
        // 18. datums, 6diena - vajag 1. datumu
        // 18-7 = 11 => 11-7 = 4 => 4 < 7 => 4 - 7 => 3diena (strada)
        const tempDay: number = currentDay - 7;

        if (tempDay > 7) {
            getFirstMonthDay(tempDay)
        }

        if (tempDay < 7) return 7 - tempDay;
        if (tempDay === 7) return tempDay;
    };

    const prevMonthArr: number[] = [];

    // This gets an array, with last day date numbers of the month for the first row of calendar
    const getDisplayPrevMonthDays = (firstDay: number, prevMonthDayCount: number, index: number = 1) => {

        if (firstDay === index) return prevMonthArr.reverse();

        prevMonthArr.push(prevMonthDayCount)
        getDisplayPrevMonthDays(firstDay, prevMonthDayCount - 1, index += 1)
    };

    // this creates array of arrays of days
    const createFullMonthView = (firstDay: number, prevMonthDayCount: number, currMonthDayCount: number) => {
        const daysArray: number[][] = [
        ];

        for (let i = 0; i < 5; i++) {
            // first row is different, because we have to add last months last days
            if (i === 0) {
                getDisplayPrevMonthDays(firstDay, prevMonthDayCount)
                daysArray.push([...prevMonthArr])
                for (let j = 0; j < 7 - prevMonthArr.length; j++) {
                    daysArray[0]?.push(j + 1);
                }
            }

            daysArray.push([]);

            const lastArray = daysArray[i];

            const lastNumber = lastArray?.slice(-1)[0];
            // console.log(lastNumber)

            for (let j = 1; j < 8; j++) {
                //checks if last number that is going to be pushed in array, is bigger than
                // months day count, if so - start pushing next months start dates
                if (lastNumber! + j > currMonthDayCount) {
                    for (let index = 1; index < 8 - j + 1; index++) {
                        daysArray[i + 1]?.push(index);
                    }
                    break;
                }
                daysArray[i + 1]?.push(lastNumber! + j);
            }
        }
        return daysArray;
    };


    if (!date.firstDayOfMonth) return null;

    // console.log(createFullMonthView(6, 30, 31))

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.header}>
                    <span>{'<'}</span>
                    <span>{date.monthString}</span>
                    <span>{'>'}</span>
                </div>
                <div className={styles.dayGrid}>
                    {createFullMonthView(6, 30, 31).map((data, index) => (
                        <div className={styles.dayGridColumns} key={`${data}+${index}`}>
                            {data.map((values) => {
                                console.log(values)
                                return (
                                    <div className={styles.gridElement} key={values}>
                                        {values}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Calendar;