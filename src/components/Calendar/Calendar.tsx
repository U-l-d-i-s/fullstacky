import { useEffect, useState } from 'react';
import styles from './Calendar.module.css';

// TODO: create constant list of [Jan, Feb...] for [keys: MonthConstantList]
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

// @TODO: add index to days for method - to get first month days index.
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
    dateNumber: number,
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
    nextMonthDayCount: number | null,
    currentMonthDayCount: number | null,
};

type CalendarType = {
    isOpen: boolean,
};

// @TODO: Make calendar views dates selectable, use react-Form-Hook or smth
const Calendar = ({ isOpen }: CalendarType) => {
    const getDate = new Date();
    const getCurrentWeekDay = getDate.getDay();
    // gets First values for todays date
    // Oct
    const getStringMonth: string = getDate.toString().slice(4, 7);
    // Tue
    const getStringDay: string = getDate.toString().slice(0, 3);

    // Number() also gets rid of leading zeros
    const getDayNumber: number = Number(getDate.toString().slice(8, 10));

    //get months index
    const getMonthIndex = (StringMonth: string): number => {
        // const currentMonthIndex: number = Object.keys(MonthData).indexOf(getStringMonthDay().getStringMonth);
        const currentMonthIndex: number = Object.keys(MonthData).indexOf(StringMonth);

        return currentMonthIndex;
    };

    // Starting values of previous and next months indexes
    const prevMonthIndex = (getMonthIndex(getStringMonth) - 1 <= -1) ? 11 : getMonthIndex(getStringMonth) - 1;
    const nextMonthIndex = (getMonthIndex(getStringMonth) + 1 >= 12) ? 0 : getMonthIndex(getStringMonth) + 1;

    // Starting values of previous and next months short name (short names are used for arrays, objects)
    const prevMonthShort: string = Object.keys(MonthData)[prevMonthIndex] || '';
    const nextMonthShort: string = Object.keys(MonthData)[nextMonthIndex] || '';

    // gets next and prev months indexes, basic array fucntions
    const getNextPrevMonthIndex: (StringMonth: string) => {
        prevMonthIdx: string,
        nextMonthIdx: string,
    } = (
        StringMonth: string
    ) => {
            const currMonthIndex = getMonthIndex(StringMonth);

            // constant list is ordered => jan === 0 index, dec === 11.
            // if out of bounds index met, continue from the oposite side
            const indexNext = (currMonthIndex + 1 === 12) ? 0 : currMonthIndex + 1;
            const indexPrev = (currMonthIndex - 1 <= -1) ? 11 : currMonthIndex - 1;

            const nextMonthIndex: string = Object.keys(MonthData)[indexNext] || '';
            const prevMonthIndex: string = Object.keys(MonthData)[indexPrev] || ''

            // these are not indexes but object keys, that are got with indexes. Methods functionality changed 
            // while developing it, naming was not changes
            return {
                prevMonthIdx: prevMonthIndex,
                nextMonthIdx: nextMonthIndex,
            }
        };

    const getMonthsObject = (MonthName: string) => {
        const MonthValues = MonthData[MonthName];
        return {
            dayCount: MonthValues?.dayCount,
            name: MonthValues?.name,
        }
    };

    // this recursion gets first day (monday, friday) of the month (first days index (from 1 to 7))
    // current day + todays day index + 1 could be the solution
    const getFirstMonthDay = (currentDate: number, iter: number = 1, prevDate: number = 0): number | undefined => {
        // goes week back
        prevDate = currentDate - 8;

        if (prevDate >= 2) return getFirstMonthDay(prevDate, iter = +1);

        if (prevDate === 1) {
            return (currentDate - 2);
        };

        if (prevDate <= 0) {
            // if(currentDate - iter-1 === 0) return 7
            return (currentDate - 1);
        };
    };

    // set state for everything
    const [date, setDate] = useState<CalendarValuesType>({
        weekDay: getDate.getDay(),
        year: getDate.getFullYear(),

        // currentMonth values
        dateNumber: getDayNumber,
        monthNumber: getDate.getMonth(),
        dayString: DayStringTransl[getStringDay] || '',
        monthString: MonthData[getStringMonth]?.name || '',
        monthStringShort: getStringMonth,
        firstDayOfMonth: getFirstMonthDay(23),
        currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,

        //prevMonths Values
        prevMonth: getMonthsObject(prevMonthShort).name || '',
        prevMonthShort: prevMonthShort || '',
        prevMonthDayCount: getMonthsObject(prevMonthShort).dayCount || null,

        // nextMonth values
        nextMonth: getMonthsObject(nextMonthShort).name || '',
        nextMonthShort: nextMonthShort || '',
        nextMonthDayCount: getMonthsObject(nextMonthShort).dayCount || null,
    });

    const [selectedDateRange, setSelectedDateRange] = useState<{
        start: {
            month: number | null,
            day: number | null,
        },
        finish: {
            month: number | null,
            day: number | null,
        },
    }>({
        start: {
            month: null,
            day: null,
        },
        finish: {
            month: null,
            day: null,
        },
    });
    // This gets an array, with last day date numbers of the month for the first row of calendar
    const prevMonthArr: number[] = [];

    const getDisplayPrevMonthDays = (
        firstDay: number,
        prevMonthDayCount: number,
        index: number = 1,
        tempArr: number[] = [],
    ) => {
        // reverse array (push puts values in the back of array, before reverse() => '31, 30, 29...')
        if (firstDay === index) {
            tempArr.reverse();
            prevMonthArr.push(...tempArr);

            return;
        };

        // push in previous month days left in the week, that are before first dates day
        tempArr.push(prevMonthDayCount)

        //continue recursion, update values
        getDisplayPrevMonthDays(firstDay, prevMonthDayCount - 1, index += 1, tempArr);
    };

    // method creates multi dimentsional array of days, in complete of 6 rows and 7 columns.
    // at row index === 0 it runs recursion function that gets prev months dates, that are visible in months view
    // then pushes it into daysArray multi => dimensional array
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

            //pushes in new empty array
            daysArray.push([]);

            //gets index i array
            const lastArray = daysArray[i];

            //gets last array element (number), from index i array (one before last array) 
            // as a reference for next numbers in next array
            const lastNumber = lastArray?.slice(-1)[0];

            // check if there was lastNumber aviable
            // @TODO: implement error catching, if lastNumber is not aviable
            if (lastNumber) {
                for (let j = 1; j < 8; j++) {
                    //checks if last number that is going to be pushed in array, is bigger than
                    // months day count, if so - start pushing next months start dates
                    if (lastNumber! + j > currMonthDayCount) {
                        for (let index = 1; index < 8 - j + 1; index++) {
                            //push in new number in last array
                            daysArray[i + 1]?.push(index);
                        }
                        break;
                    }
                    //push in new number in array
                    daysArray[i + 1]?.push(lastNumber + j);
                }
            }
            // throw new Error('lastNumber not found in lastArray?.slice(-1)[0]')
        }

        // return full calendar view w/ visible prev months dates, visible next months dates and current months dates
        return daysArray;
    };


    useEffect(() => {
        // console.log(date.firstDayOfMonth);
        console.log(selectedDateRange);

        // console.log((date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3)) >= 8 ? (date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3))) - 8 : (date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3)))), 'regexpresion');
        // console.log((date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3)) <= 0 ? 8 + date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3) : (date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3)), 'prev');
    }, [selectedDateRange])


    const handleMonthChange = (direction: number) => {
        // @TODO: do a better naming that date, setDate
        // Update Date state
        if (direction === -1) {
            setDate({
                ...date,
                // needs to be inspected
                dateNumber: date.dateNumber,
                // done
                monthNumber: date.monthNumber - 1,
                //done
                dayString: DayStringTransl[date.prevMonthShort] || '',
                //done
                monthString: MonthData[date.prevMonthShort]?.name || '',

                monthStringShort: date.prevMonthShort,
                //done
                currentMonthDayCount: date.prevMonthDayCount || null,
                // currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,
                //done
                firstDayOfMonth: (date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3)) <= 0 ? date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3) - 8 : date.firstDayOfMonth! + (date.currentMonthDayCount! - date.prevMonthDayCount! - 3),

                //done
                prevMonth: MonthData[getNextPrevMonthIndex(date.prevMonthShort!).prevMonthIdx]?.name!,
                //done
                prevMonthShort: Object.keys(MonthData)[(getMonthIndex(date.prevMonthShort) - 1 <= -1) ? 11 : getMonthIndex(date.prevMonthShort) - 1]!,
                //done
                prevMonthDayCount: MonthData[getNextPrevMonthIndex(date.prevMonthShort).prevMonthIdx]?.dayCount || null,
                //done
                nextMonth: date.monthString || '',
                //done
                nextMonthShort: date.monthStringShort || '',
                //done
                nextMonthDayCount: date.currentMonthDayCount || null,
            })
        }
        // @TODO: do a better naming that date, setDate
        if (direction === 1) {
            setDate({
                ...date,
                // needs to be inspected
                dateNumber: date.dateNumber,
                // done
                monthNumber: date.monthNumber + 1,
                //done
                dayString: DayStringTransl[date.nextMonthShort] || '',
                //done
                monthString: MonthData[date.nextMonthShort]?.name || '',

                monthStringShort: date.nextMonthShort,
                //done
                currentMonthDayCount: date.nextMonthDayCount || null,
                // currentMonthDayCount: MonthData[getStringMonth]?.dayCount || null,
                //done
                // firstDayOfMonth: (date.firstDayOfMonth! + (date.currentMonthDayCount! - date.nextMonthDayCount! + 3)) <= 0 ? 7 - date.firstDayOfMonth! - (date.currentMonthDayCount! + date.prevMonthDayCount! - 3) : date.firstDayOfMonth! + (date.currentMonthDayCount! - date.nextMonthDayCount! - 3),
                firstDayOfMonth: (date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3)) >= 8 ? (date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3))) - 8 : (date.firstDayOfMonth! + ((date.currentMonthDayCount! - date.nextMonthDayCount! + 3)))),


                //done
                prevMonth: date.monthString,
                //done
                prevMonthShort: date.monthStringShort,
                //done
                prevMonthDayCount: date.currentMonthDayCount || null,
                //done
                nextMonth: MonthData[getNextPrevMonthIndex(date.nextMonthShort!).nextMonthIdx]?.name! || '',

                //done
                nextMonthShort: Object.keys(MonthData)[(getMonthIndex(date.nextMonthShort) + 1 >= 12) ? 0 : getMonthIndex(date.nextMonthShort) + 1]! || '',

                //done
                nextMonthDayCount: MonthData[getNextPrevMonthIndex(date.nextMonthShort).nextMonthIdx]?.dayCount || null,
            })
        }
    }

    const handleCalendarDayClick = (clickedDay: number) => {
        console.log(clickedDay);
        if (!selectedDateRange.start.day) setSelectedDateRange({ ...selectedDateRange, start: { day: clickedDay, month: 5 } });

        // reverse dates, if finish date bigger than start date
        if (!selectedDateRange.finish.day) {
            if (selectedDateRange.start.day && selectedDateRange.start.day > clickedDay) {

            }
            setSelectedDateRange({ ...selectedDateRange, finish: { month: 3, day: clickedDay } })
        }
        if (selectedDateRange.finish.day && selectedDateRange.start.day) {
            setSelectedDateRange({ 
                start: { month: null, day: null }, 
                finish: { month: null, day: null } 
            })
        }
    };

    const inRangeStyling = {
        backgroundColor: 'yellow'

    };

    const selectStyling = (position: number) => {
        if (selectedDateRange.start.day === position || selectedDateRange.finish.day === position) {
            return {
                backgroundColor: 'green',
                color: '#262829',
            }
        }
        if ((selectedDateRange.start.day && selectedDateRange.start.day > position)
            && (selectedDateRange.finish.day && selectedDateRange.finish.day < position)) {
            return {
                backgroundColor: 'greenyellow',
                color: '#262829',
            }
        }
    }
    if (!date.firstDayOfMonth) return null;

    //@TODO: get rid of ! marks
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
                                        <div
                                            className={styles.gridElementNonPrimary}
                                            key={value}
                                            style={selectStyling(value)}
                                        >
                                            <input className={styles.inpButton} type="button" onClick={() => console.log(value)} />
                                            {value}
                                        </div>
                                    );
                                }
                                if ((rowIndex === 4 || rowIndex === 5) && value < 20) {
                                    return (
                                        <div
                                            className={styles.gridElementNonPrimary}
                                            key={value}
                                            style={selectStyling(value)}
                                        >
                                            <input className={styles.inpButton} type="button" onClick={() => console.log(value)} />
                                            {value}
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        className={styles.gridElement}
                                        key={value}
                                        style={selectStyling(value)}
                                    >
                                        <input className={styles.inpButton} type="button" onClick={() => handleCalendarDayClick(value)} />
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