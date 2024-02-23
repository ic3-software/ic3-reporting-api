type DateType = any;  // This class returns dates of type DayJs. Import that package for the types.

export interface PublicDateShortcutUtils {
    /**
     * Get a date. See documentation for `new Date(…)` for the year, month and day arguments.
     */
    asDate(year: number, month: number, day: number): DateType;

    /**
     * Return the current datetime.
     */
    now(): DateType;

    /**
     * Return the current date. Returns the anchor date if it exists. The date returned has time 00:00:00.
     * To get the date and time, use `current()`.
     */
    currentDate(): DateType;

    /**
     * Return the current datetime. Returns the anchor datetime if it exists.
     */
    current(): DateType;

    /**
     * Returns the anchor date.
     */
    getAnchorDate(): DateType | null;

    /**
     * Return the date of today with the time 00:00:00. To get the date and time, use `now()`.
     */
    today(): DateType;
}