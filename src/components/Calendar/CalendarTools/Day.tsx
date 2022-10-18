import styles from './Day.module.css';

type DayProps = {
    nonPrimary?: boolean,
    handleCalendarDayClick: (clickedDay: number, pressedDateMonth: number) => void
    value: number,
    selectStyling: (position: number, monthPosition: number) => { backgroundColor: string, color: string} | undefined,
    monthNumber: number,
    actualMonthNumber: number,
} ;


const Day = ({
    nonPrimary, 
    handleCalendarDayClick, 
    value, 
    selectStyling,
    monthNumber,
}: DayProps) => {

    if (nonPrimary) {
        return (
            <div
                className={styles.gridElementNonPrimary}
                style={selectStyling(value, monthNumber)}
            >
                <input
                    className={styles.inpButton}
                    type="button"
                    onClick={() => handleCalendarDayClick(value, monthNumber)}
                />
                <span>{value}</span>
            </div>
        );
    }
    return (
        <div
            className={styles.gridElement}
            key={value}
            style={selectStyling(value, monthNumber)}
        >
            <input
                className={styles.inpButton}
                type="button"
                onClick={() => handleCalendarDayClick(value, monthNumber)}
            />
            <span>{value}</span>
        </div>
    );
};

export default Day;