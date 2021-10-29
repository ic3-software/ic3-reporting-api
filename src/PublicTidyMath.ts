import {ITidyBaseColumn, ITidyColumn, ITidyNumericColumn} from "./PublicTidyColumn";
import {HistogramData, HistogramOptions} from "./PublicTidyTableTypes";
import {TidyHistogramBucketType} from "./PublicTidyHistogram";

interface ITidyMath {
    /**
     * Mathematical functions, null is counted as zero in the sum.
     */
    sum(column: ITidyNumericColumn): number;

    /**
     * Get the extreme value of the column. Null values are skipped.
     * @param column
     * @returns the minimum value of the column. Returns undefined if the column has no values or if the column contains
     * a NaN-value.
     */
    min<T>(column: ITidyBaseColumn<T>): T | undefined;

    /**
     * Get the extreme value of the column. Null values are skipped.
     * @param column
     * @returns the maximum value of the column. Returns undefined if the column has no values or if the column contains
     * a NaN-value.
     */
    max<T>(column: ITidyBaseColumn<T>): T | undefined;

    /**
     * Get the maximum of the absolute values of the column.
     * @param column
     * @returns If x_1, x_2, ..., x_n are the columns values, then it returns max(|x_1|, ..., |x_n|). Null values are
     * skipped.
     */
    absoluteMax(column: ITidyNumericColumn): number | undefined;

    /**
     * Sum all values matching the lowest depth level of axis column
     */
    sumOnRoot(column: ITidyNumericColumn, tree: ITidyColumn): number;

    /**
     * Estimate the population mean of the column, skipping null values.
     *
     * @returns the mean of the numeric column. Returns undefined if the column has no values or if the column contains
     * a NaN-value.
     */
    mean(column: ITidyNumericColumn): number | undefined;

    /**
     * Estimate the population variance of the column. Null values are skipped.
     * @param column
     * @returns the variance of the column. Returns undefined if the column has no values or if the column contains a
     * NaN-value.
     */
    variance(column: ITidyNumericColumn): number | undefined;

    /**
     * Estimate the population standard deviation of the column. Null values are skipped.
     * @param column
     * @returns the standard deviation of the column. Returns undefined if the column has no values or if the column
     * contains a NaN-value.
     */
    standardDeviation(column: ITidyNumericColumn): number | undefined;

    /**
     * Return the number of non-null values in the column.
     */
    count(column: ITidyColumn): number;

    /**
     * Calculate the median of the column. Null-values are ignored.
     * @param column
     * @returns the median of the numeric column. Returns undefined if the column has no values or if the column contains
     * a NaN-value.
     */
    median(column: ITidyNumericColumn): number | undefined;

    /**
     * Creates a histogram data object from the column.
     * @param column
     * @param options see HistogramOptions
     *
     * @Returns an array of histogram buckets
     */
    hist(column: ITidyNumericColumn, options: Partial<HistogramOptions>): HistogramData[];

    /**
     * Return a regression model with one predictor: y = a0 + a1*x + error
     * @param y column x
     * @param x column y
     */
    ols(y: ITidyNumericColumn, x: ITidyNumericColumn): ((x: number) => number) | undefined;

    /**
     * Calculate the percentage w.r.t. the total of the column.
     * @param column
     * @param idx row index of the cell to calculate the percentage of.
     */
    percent(column: ITidyNumericColumn, idx: number): number | undefined;

    /**
     * Count the values in the column. For example: [a, b, b] -> {a: 1, b: 2}.
     */
    valueCounts<T>(column: ITidyBaseColumn<T>): Map<T, number>;

    /**
     * Normalize a numeric column so that its values are on [0, 1].
     * For each value x, return (x - x_min) / (x_max - x_min).
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleNormalize(column: ITidyNumericColumn, idx: number, min: number | undefined, max: number | undefined, val: number | undefined): number | undefined;

    /**
     * Scale a numeric column so that its values are on [-1, 1].
     * For each value x, return x / max(|x_1|, ..., |x_n|).
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleMaxAbsolute(column: ITidyNumericColumn, idx: number): number | undefined;

    /**
     * Standardize the column.
     * For each value x, return (x - x_mean) / x_stdev.
     *
     * @returns undefined if one of the values in the scalar could not be calculated.
     */
    scaleStandardize(column: ITidyNumericColumn, idx: number): number | undefined;

    /**
     * Returns the covariance between two columns. Nulls are interpreted as zeros.
     */
    covariance(x: ITidyNumericColumn, y: ITidyNumericColumn): number | undefined;
}

class TidyMathImpl implements ITidyMath {
    percent(column: ITidyNumericColumn, idx: number): number | undefined {
        const value = column.getValue(idx);
        if (value != null) {
            return value / this.sum(column);
        }
        return undefined;
    }

    covariance(x: ITidyNumericColumn, y: ITidyNumericColumn): number | undefined {
        const xMean = this.mean(x);
        const yMean = this.mean(y);
        if (xMean == null || yMean == null) {
            return undefined;
        }
        let covSum = 0;
        let count = 0;
        for (let i = 0; i < x.length(); i++) {
            const xVal = x.getValue(i);
            const yVal = y.getValue(i);
            if (xVal != null && yVal != null) {
                covSum += (xVal - xMean) * (yVal - yMean);
                count++;
            }
        }
        return covSum / (count - 1);
    }

    scaleMaxAbsolute(column: ITidyNumericColumn, idx: number): number | undefined {
        const absMax = this.absoluteMax(column);
        const x = column.getValue(idx);
        if (x == null || absMax == null) {
            return undefined;
        }
        return x / absMax;
    }

    scaleNormalize(column: ITidyNumericColumn | undefined, idx: number, min: number | undefined, max: number | undefined, val: number | undefined): number | undefined {

        if (column == null && (min == null || max == null || val == null)) {
            throw new Error("missing default column");
        }

        if (min == null) {
            min = TidyMath.min(column!) ?? undefined;
        }

        if (max == null) {
            max = TidyMath.max(column!) ?? undefined;
        }

        if (val == null) {
            val = column!.getValue(idx) ?? undefined;
        }

        if (min == null || max == null || val == null) {
            return undefined;
        }

        if (min === max) {
            return 1;
        }

        return (val - min) / (max - min);
    }

    scaleStandardize(column: ITidyNumericColumn, idx: number): number | undefined {
        const mean = this.mean(column);
        const stdDev = this.standardDeviation(column);
        const x = column.getValue(idx);
        if (mean == null || stdDev == null || x == null) {
            return undefined;
        }
        return (x - mean) / stdDev;
    }

    @cached
    standardDeviation(column: ITidyNumericColumn): number | undefined {
        const variance = this.variance(column);
        if (variance == null) {
            return undefined;
        }
        return Math.sqrt(variance);
    }

    @cached
    variance(column: ITidyNumericColumn): number | undefined {

        const count = this.count(column);
        const columnMean = this.mean(column);
        if (columnMean == null) {
            return undefined;
        }
        let sum_errors_squared = 0;
        for (let i = 0; i < column.length(); i++) {
            const value = column.getValue(i);
            if (value != null) {
                sum_errors_squared += (value - columnMean) ** 2;
            }
        }
        const dof = count - 1;
        if (dof === 0)
            return undefined;

        return sum_errors_squared / dof;
    }

    @cached
    sum(column: ITidyNumericColumn): number {
        if (column.length() === 0) {
            return 0;  // https://en.wikipedia.org/wiki/Empty_sum
        }
        return column.getValues().reduce((a, b) => (a ?? 0) + (b ?? 0)) ?? 0;
    }

    @cached
    min<T>(column: ITidyBaseColumn<T>): T | undefined {
        let result: T | undefined = undefined;
        for (let i = 0; i < column.length(); i++) {
            const value = column.getValue(i);
            if (typeof value === "number" && isNaN(value)) {
                return undefined;
            }
            if (value == null) {
                continue;
            }
            if (result === undefined) {
                result = value;
            } else if (column.compare(value, result) < 0) {
                result = value;
            }
        }
        return result;
    }

    @cached
    max<T>(column: ITidyBaseColumn<T>): T | undefined {
        let result: T | undefined = undefined;
        for (let i = 0; i < column.length(); i++) {
            const value = column.getValue(i);
            if (typeof value === "number" && isNaN(value)) {
                return undefined;
            }
            if (value == null) {
                continue;
            }
            if (result === undefined) {
                result = value;
            } else if (column.compare(value, result) > 0) {
                result = value;
            }
        }
        return result;
    }

    @cached
    absoluteMax(column: ITidyNumericColumn): number | undefined {
        let max = 0;
        for (let i = 0; i < column.length(); i++) {
            const val = column.getValue(i);
            if (val != null) {
                if (isNaN(val)) return undefined;
                const v = Math.abs(val);
                if (v > max) max = v;
            }
        }
        return max;
    }

    sumOnRoot(column: ITidyNumericColumn, tree: ITidyBaseColumn<any>): number {
        if (tree.isHierarchy() && tree.length()) {
            let sum = 0;
            const N = column.length();
            for (let i = 0; i < N; i++) {
                const cLevel = tree.getLevelDepth(i);
                if (cLevel <= 0) {
                    sum += column.getValue(i) ?? 0;
                }
            }
            return sum;
        } else {
            return this.sum(column);
        }
    }

    @cached
    count(column: ITidyColumn): number {
        let count = 0;
        column.getValues().forEach(v => v != null && count++);
        return count;
    }

    @cached
    mean(column: ITidyNumericColumn): number | undefined {
        const count = this.count(column);
        if (count !== 0) {
            const sum = this.sum(column);
            if (sum != null && !isNaN(sum)) {
                return sum / count;
            }
        }
        return undefined;
    }

    @cached
    median(column: ITidyNumericColumn): number | undefined {

        const values: number[] = [];

        for (const v of column.getValues()) {
            if (v != null) {
                if (isNaN(v))
                    return undefined;
                values.push(v);
            }
        }

        if (values.length === 0) {
            return undefined;
        }

        if (values.length === 1) {
            return values[0];
        }

        values.sort();
        const half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];

        return (values[half - 1] + values[half]) / 2.0;
    }

    hist(column: ITidyNumericColumn, options: Partial<HistogramOptions>): HistogramData[] {

        const bins = options.bins ?? 10;
        const rightClosed = options.intervalType !== TidyHistogramBucketType.LEFT_CLOSED;
        const includeEndPoints = options.includeEndPoints ?? true;

        let binData: HistogramData[];
        let lowestBin: HistogramData;
        let largestBin: HistogramData;
        if (typeof bins === "number") {
            const valueMin = this.min(column)
            const valueMax = this.max(column)
            if (bins <= 0 || column.length() === 0 || valueMin == null || valueMax == null) {
                return [];
            } else {
                binData = new Array<HistogramData>(bins);
                const valueRange = valueMax - valueMin;
                const valueStep = valueRange / bins;
                for (let b = 0; b < bins; b++) {
                    binData[b] = {
                        from: roundFloatingPointNumber(valueMin + valueStep * b, 6),
                        to: roundFloatingPointNumber(valueMin + valueStep * (b + 1), 6),
                        count: 0,
                        rows: []
                    };
                }
            }
            lowestBin = binData[0];
            largestBin = binData[binData.length - 1];
        } else {
            if (bins.length === 0) {
                return [];
            }
            binData = bins.map(b => {
                return {
                    ...b,
                    count: 0,
                    rows: []
                };
            });
            lowestBin = binData.reduce((a, b) => a.from == null ? a : b.from == null ? b : a.from < b.from ? a : b);
            largestBin = binData.reduce((a, b) => a.from == null ? b : b.from == null ? a : a.from < b.from ? b : a);
        }

        const columnValues = column.getValues();
        columnValues.forEach((value, idx) => {
            if (value == null) {
                return;
            }
            const rValue = roundFloatingPointNumber(value, 6);
            let bin: HistogramData | undefined;
            if (rightClosed) {
                bin = binData.find(b => (b.from == null || rValue > b.from) && (b.to == null || rValue <= b.to));
                if (bin == null && includeEndPoints) {
                    bin = lowestBin;
                }
            } else {
                bin = binData.find(b => (b.from == null || rValue >= b.from) && (b.to == null || rValue < b.to));
                if (bin == null && includeEndPoints) {
                    bin = largestBin;
                }
            }
            if (bin != null) {
                bin.count++;
                bin.rows.push(idx);
            }
        });
        return binData;
    }

    ols(y: ITidyNumericColumn, x: ITidyNumericColumn): ((x: number) => number) | undefined {

        if (x.length != y.length) {
            // Cannot make linear model, ${y.name} and ${x.name} are not of same length
            return undefined;
        }

        if (x.length() < 2) {
            // Cannot make linear model, number of rows < 2
            return undefined;
        }

        const xVar = this.variance(x);
        const xyCov = this.covariance(x, y);
        const yMean = this.mean(y);
        const xMean = this.mean(x);
        if (xVar == null || xyCov == null || yMean == null || xMean == null) {
            return undefined;
        }
        const beta = xyCov / xVar;
        const alpha = yMean - beta * xMean;

        return (x: number) => {
            return alpha + beta * x;
        }
    }

    valueCounts<T>(column: ITidyBaseColumn<T>): Map<T, number> {
        const counts = new Map<T, number>();
        column.getValues().forEach(value => {
            counts.set(value, (counts.get(value) ?? 0) + 1);
        })
        return counts;
    }
}

function roundFloatingPointNumber(num: number, decimals = 0) {
    return Math.round(num * Math.pow(10, decimals) + Number.EPSILON) / Math.pow(10, decimals);
}

/**
 * Cache the result of the function in the column. Note, the function should have one argument which is the column.
 */
function cached(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(column: ITidyColumn) => any>) {
    const originalMethod = descriptor.value;
    descriptor.value = function (column: ITidyColumn) {
        const cachedValue = column.getCachedValue(propertyName);
        if (cachedValue != null) {
            return cachedValue;
        }
        const returnValue = originalMethod?.apply(this, [column]);
        column.setCachedValue(propertyName, returnValue);
        return returnValue;
    };
}

export const TidyMath = new TidyMathImpl();