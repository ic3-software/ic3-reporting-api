type DateType = any;  // This class returns dates of type DayJs. Import that package for the types.

export interface PublicDateShortcutUtils<T = DateType> {
    /**
     * Get a date. See documentation for `new Date(…)` for the year, month and day arguments.
     */
    asDate(year: number, month: number, day: number): T;

    /**
     * Return the current datetime.
     */
    now(): T;

    /**
     * Return the current date. Returns the anchor date if it exists. The date returned has time 00:00:00.
     * To get the date and time, use `current()`.
     */
    currentDate(): T;

    /**
     * Return the current datetime. Returns the anchor datetime if it exists.
     */
    current(): T;

    /**
     * Returns the anchor date.
     */
    getAnchorDate(): T | null;

    /**
     * Return the date of today with the time 00:00:00. To get the date and time, use `now()`.
     */
    today(): T;

    /**
     * Get the bottom limit of the allowed date range (included). Returns `null` if no bottom limit.
     */
    minAllowedDate(): T | null;

    /**
     * Get the upper limit of the allowed date range (included). Returns `null` if no upper limit.
     */
    maxAllowedDate(): T | null;

    /**
     * Returns intersect of `range` and [minDate, maxDate].
     */
    clampDates(range: [T | null, T | null]): [T | null, T | null];
}