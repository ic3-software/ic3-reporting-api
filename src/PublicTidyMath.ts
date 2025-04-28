import {ITidyBaseColumnReadonly} from "./PublicTidyColumn";
import {HistogramData, HistogramOptions, TidyRowFilter} from "./PublicTidyTableTypes";
import {TrendLineType} from "./theme/ThemeAmCharts4";
import {ITidyTable} from "./PublicTidyTable";

/**
 * Utility class for doing maths in columns
 *
 *
 * As a general rule, functions will return NaN once a value of the column is Nan
 */
export interface ITidyMath {

    /**
     * For each not null column value (numbers including Nan or Infinity)
     *
     * @param callback true to stop the for each
     */
    forEachNotNull(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[], callback: (value: number) => void): void;

    /**
     * Sum of all values in the column.
     */
    sum(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[]): number | null;

    /**
     * Sum of all values in the column where filter evaluates to true. Returns the sum if filter is undefined.
     */
    sumFiltered(column: ITidyBaseColumnReadonly<number | null>, filter: TidyRowFilter | undefined): number | null;

    /**
     * Get the extreme value of the column. Null values are skipped.
     * @param column
     * @returns the minimum value of the column. Returns undefined if the column has no values.
     */
    min<T>(column: ITidyBaseColumnReadonly<T> | ITidyBaseColumnReadonly<T | null>[]): T | undefined;

    /**
     * Get the extreme value of the column. Null values are skipped.
     * @param column
     * @returns the maximum value of the column. Returns undefined if the column has no values.
     */
    max<T>(column: ITidyBaseColumnReadonly<T> | ITidyBaseColumnReadonly<T | null>[]): T | undefined;

    /**
     * Get the maximum of the absolute values of the column.
     * @param column
     * @returns If x_1, x_2, ..., x_n are the columns values, then it returns max(|x_1|, ..., |x_n|). Null values are
     * skipped.
     */
    absoluteMax(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[]): number | undefined;

    /**
     * Sum all values matching the lowest depth level of axis column
     */
    sumOnRoot(column: ITidyBaseColumnReadonly<number | null>, tree: ITidyBaseColumnReadonly<any>): number;

    /**
     * Estimate the population mean of the column, skipping null values.
     *
     * @returns the mean of the numeric column. Returns undefined if the column has no values.
     */
    mean(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[]): number | undefined;

    /**
     * Estimate the population variance of the column. Null values are skipped.
     * @param column
     * @returns the variance of the column. Returns undefined if the column has no values
     */
    variance(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[]): number | undefined;

    /**
     * Estimate the population standard deviation of the column. Null values are skipped.
     * @param column
     * @returns the standard deviation of the column. Returns undefined if the column has no values
     */
    standardDeviation(column: ITidyBaseColumnReadonly<number | null> | ITidyBaseColumnReadonly<number | null>[]): number | undefined;

    /**
     * Return the number of non-null values in the column.
     */
    count(column: ITidyBaseColumnReadonly<any> | ITidyBaseColumnReadonly<any>[]): number;

    /**
     * Calculate the median of the column. Null-values are ignored.
     * @param column
     * @returns the median of the numeric column. Returns undefined if the column has no values
     */
    median(column: ITidyBaseColumnReadonly<number | null>): number | undefined;

    /**
     * Creates a histogram data object from the column.
     * @param column
     * @param options see HistogramOptions
     *
     * @Returns an array of histogram buckets
     */
    hist(column: ITidyBaseColumnReadonly<number | null>, options: Partial<HistogramOptions>): HistogramData[];

    trendLine(trendLine: TrendLineType, y: ITidyBaseColumnReadonly<number | null>, x: ITidyBaseColumnReadonly<number | null>): ((x: number) => number) | undefined;

    /**
     * Return a regression model with one predictor: y = a0 + a1*x + error
     * @param y column x
     * @param x column y
     */
    ols(y: ITidyBaseColumnReadonly<number | null>, x: ITidyBaseColumnReadonly<number | null>): ((x: number) => number) | undefined;

    /**
     * Returns the previous value in the column , undefined if idx is 0
     * @param column
     * @param idx row index.
     */
    prev(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined | null;

    /**
     * Returns the next value in the column , undefined if idx is last one
     * @param column
     * @param idx row index.
     */
    next(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined | null;

    /**
     * Returns the first value in the column
     * @param column
     * @param idx row index.
     */
    first(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined | null;

    /**
     * Returns the last value in the column
     * @param column
     * @param idx row index.
     */
    last(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined | null;

    /**
     * Calculate the percentage w.r.t. the total of the column.
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percent(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Calculate the percentage w.r.t. the first value of the column.
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percentFirst(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Calculate the percentage w.r.t. the last value of the column.
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percentLast(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Calculate the percentage w.r.t. the table total value (all numeric columns).
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percentTable(table: ITidyTable, column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Calculate the percentage w.r.t. the row value of all numeric columns.
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percentRow(table: ITidyTable, column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined | null;

    /**
     * Count the values in the column. For example: [a, b, b] -> {a: 1, b: 2}.
     */
    valueCounts<T>(column: ITidyBaseColumnReadonly<T>): Map<T, number>;

    /**
     * Normalize a numeric column so that its values are on [0, 1].
     * For each value x, return (x - x_min) / (x_max - x_min).
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleNormalize(column: ITidyBaseColumnReadonly<number | null> | undefined, idx: number, min: number | undefined, max: number | undefined, val: number | undefined): number | undefined;

    /**
     * Scale a numeric column so that its values are on [-1, 1].
     * For each value x, return x / max(|x_1|, ..., |x_n|).
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleMaxAbsolute(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Standardize the column.
     * For each value x, return (x - x_mean) / x_stdev.
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleStandardize(column: ITidyBaseColumnReadonly<number | null>, idx: number): number | undefined;

    /**
     * Returns the covariance between two columns. Nulls are interpreted as zeros.
     */
    covariance(x: ITidyBaseColumnReadonly<number | null>, y: ITidyBaseColumnReadonly<number | null>): number | undefined;

}
