import { useEffect, useMemo, useState } from 'react';
import { object } from 'yup/lib/locale';
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
const DaysArray: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

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
    monthStringShort: string,
    year: number,
    firstDayOfMonth?: number | null,
    prevMonth: string,
    prevMonthShort: string,
    prevMonthDayCount: number | null,
    nextMonth: string,
    nextMonthShort: string,
    nextMonthdayCount: number | null,
    currentMonthDayCount: number | null,
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

    //get prevMonth index, short and long name, day count
    const getMonthIndex = (StringMonth: string): number => {
        // const currentMonthIndex: number = Object.keys(MonthData).indexOf(getStringMonthDay().getStringMonth);
        const currentMonthIndex: number = Object.keys(MonthData).indexOf(StringMonth);

        console.log(currentMonthIndex)

        return currentMonthIndex;
    };

    const prevMonthIndex = (getMonthIndex(getStringMonth) - 1 <= -1) ? 11 : getMonthIndex(getStringMonth) - 1;
    const nextMonthIndex = (getMonthIndex(getStringMonth) + 1 >= 12) ? 0 : getMonthIndex(getStringMonth) + 1;

    const prevMonthShort = Object.keys(MonthData)[prevMonthIndex];
    const nextMonthShort = Object.keys(MonthData)[nextMonthIndex];

    const getNextPrevMonthIndex: (StringMonth: string) => {
        prevMonthIdx: string,
        nextMonthIdx: string,
    } = (
        StringMonth: string
    ) => {
            const currMonthIndex = getMonthIndex(StringMonth);

            const indexNext = (currMonthIndex + 1 === 12) ? 0 : currMonthIndex + 1;
            const indexPrev = (currMonthIndex - 1 <= -1) ? 11 : currMonthIndex - 1;

            const nextMonthIndex: string = Object.keys(MonthData)[indexNext]!;
            const prevMonthIndex: string = Object.keys(MonthData)[indexPrev]!;

            return {
                prevMonthIdx: prevMonthIndex,
                nextMonthIdx: nextMonthIndex,
            }
        };

    const prevMonthNameAndDays = (MonthName: string) => {
        const prevMonthNameAndDays = MonthData[MonthName];
        return {
            dayCount: prevMonthNameAndDays?.dayCount,
            name: prevMonthNameAndDays?.name,
        }
    };

    const nextMonthNameAndDays = (MonthName: string) => {
        const nextMonthNameAndDays = MonthData[MonthName];
        return {
            dayCount: nextMonthNameAndDays?.dayCount,
            name: nextMonthNameAndDays?.name,
        }
    };

    // this recursion gets first day (monday, friday) of the month
    const getFirstMonthDay = (currentDay: number) => {
        // 18. datums, 6diena - vajag 1. datumu
        // 18-7 = 11 => 11-7 = 4 => 4 < 7 => 4 - 7 => 3diena (strada)
        const tempDay: number = currentDay - 7;

        if (tempDay > 7) {
            getFirstMonthDay(tempDay)
        }

        if (tempDay < 7) return 7 - tempDay + 1;
        if (tempDay === 7) return tempDay;
    };

    // set state for everything
    //get month number is falsy
    const [date, setDate] = useState<CalendarValuesType>({
        weekDay: getDate.getDay(),
        getDayNumber: getDayNumber,
        monthNumber: getDate.getMonth(),
        dayString: DayStringTransl[getStringDay] || '',
        monthString: MonthData[getStringMonth]?.name || '',
        monthStringShort: getStringMonth,
        year: getDate.getFullYear(),
        firstDayOfMonth: getFirstMonthDay(getDayNumber),
        currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,
        prevMonth: prevMonthNameAndDays(prevMonthShort!).name || '',
        prevMonthShort: prevMonthShort || '',
        prevMonthDayCount: prevMonthNameAndDays(prevMonthShort!).dayCount || null,
        nextMonth: nextMonthNameAndDays(nextMonthShort!).name || '',
        nextMonthShort: nextMonthShort || '',
        nextMonthdayCount: nextMonthNameAndDays(nextMonthShort!).dayCount || null,
    });

    // This gets an array, with last day date numbers of the month for the first row of calendar
    const prevMonthArr: number[] = [];

    const getDisplayPrevMonthDays = (
        firstDay: number,
        prevMonthDayCount: number,
        index: number = 1,
        tempArr: number[] = [],
    ) => {
        // return array
        if (firstDay === index) {
            tempArr.reverse();
            prevMonthArr.push(...tempArr);
            return;
        };

        tempArr.push(prevMonthDayCount)
        getDisplayPrevMonthDays(firstDay, prevMonthDayCount - 1, index += 1, tempArr);
    };

    // this creates array of arrays of days
    const createFullMonthView = (firstDay: number, prevMonthDayCount: number, currMonthDayCount: number) => {
        const daysArray: number[][] = [];

        for (let i = 0; i < 5; i++) {
            // first row is different, because we have to add last months last days
            if (i === 0) {
                getDisplayPrevMonthDays(firstDay, prevMonthDayCount)
                if (prevMonthArr) {
                    daysArray.push([...prevMonthArr])
                    for (let j = 0; j < 7 - prevMonthArr.length; j++) {
                        daysArray[0]?.push(j + 1);
                    }
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

    useEffect(() => {
        console.log(date);
        console.log(date.firstDayOfMonth, date.prevMonthDayCount!, date.currentMonthDayCount!);
    }, [date])
    const handleMonthChange = (direction: number) => {
        console.log('here');

        if (direction === -1) {
            setDate({
                ...date,
                // needs to be inspected
                getDayNumber: getDayNumber,
                // done
                monthNumber: getDate.getMonth() - 1,
                //done
                dayString: DayStringTransl[date.prevMonthShort] || '',
                //done
                monthString: MonthData[date.prevMonthShort]?.name || '',

                monthStringShort: date.prevMonthShort,
                //done
                currentMonthDayCount: date.prevMonthDayCount || null,
                // currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,
                //done
                firstDayOfMonth: (date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3)) <= 0 ? 7 + date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3) : date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3),

                //done
                prevMonth: MonthData[getNextPrevMonthIndex(date.prevMonthShort!).prevMonthIdx]?.name!,
                //done
                prevMonthShort: Object.keys(MonthData)[(getMonthIndex(date.prevMonthShort)-1 <= -1) ? 11 : getMonthIndex(date.prevMonthShort) - 1]!,
                //done
                prevMonthDayCount: MonthData[getNextPrevMonthIndex(date.prevMonthShort!).prevMonthIdx]?.dayCount || null,
                //done
                nextMonth: date.monthString || '',
                //done
                nextMonthShort: date.monthStringShort || '',
                //done
                nextMonthdayCount: date.currentMonthDayCount || null,
            })
        }
        // setDate({
        //     ...date,
        //     getDayNumber: getDayNumber,
        //     monthNumber: getDate.getMonth(),
        //     dayString: DayStringTransl[getStringDay] || '',
        //     monthString: MonthData[getStringMonth]?.name || '',
        //     firstDayOfMonth: getFirstMonthDay(getDayNumber),
        //     currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,
        //     prevMonth: prevMonthNameAndDays?.name || '',
        //     prevMonthShort: prevMonthShort || '',
        //     prevMonthDayCount: prevMonthNameAndDays?.dayCount || null,
        //     nextMonth: nextMonthNameAndDays?.name || '',
        //     nextMonthShort: nextMonthShort || '',
        //     nextMonthdayCount: nextMonthNameAndDays?.dayCount || null,
        // })
    }

    if (!date.firstDayOfMonth) return null;

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.header}>
                    <button type="button" onClick={() => handleMonthChange(-1)}><span>{'<'}</span></button>
                    <span>{date.monthString}</span>
                    <button type="button" onClick={() => handleMonthChange(1)}><span>{'>'}</span></button>
                </div>
                {createFullMonthView(date.firstDayOfMonth, date.prevMonthDayCount!, date.currentMonthDayCount!).map((data, rowIndex) => (
                    <div className={styles.dayGrid}>
                        <div className={styles.dayGridColumns} key={`${data}+${rowIndex}`}>
                            {rowIndex === 0 && (
                                Object.keys(DayStringTransl).map((day) => (
                                    <span className={styles.dayName}>{day}</span>
                                ))
                            )}

                            {data.map((value) => {
                                if (rowIndex === 0 && value > 8) {
                                    return (
                                        <div className={styles.gridElementNonPrimary} key={value}>
                                            {value}
                                        </div>
                                    );
                                }
                                if ((rowIndex === 4 || rowIndex === 5) && value < 20) {
                                    return (
                                        <div className={styles.gridElementNonPrimary} key={value}>
                                            {value}
                                        </div>
                                    );
                                }
                                return (
                                    <div className={styles.gridElement} key={value}>
                                        {value}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );

};

export default Calendar;