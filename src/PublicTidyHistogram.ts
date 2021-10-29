import {TidyMath} from "./PublicTidyMath";
import {SortingType, TidyColumnsType} from "./PublicTidyTableTypes";
import {ThemeTextFormatter} from "./PublicTheme";
import {IPublicContext} from "./PublicContext";
import {ITidyTable} from "./PublicTidyTable";
import {ITidyColumn} from "./PublicTidyColumn";
import {FormFieldObject, FormFields} from "./PublicTemplateForm";

export enum TidyHistogramBucketFormat {
    INTERVAL = 'interval',
    MATH_INTERVAL = 'mathInterval',
    MATH_INTERVAL_REVERSED = 'mathIntervalReversed',
    FROM_ONLY = 'fromOnly',
    TO_ONLY = 'toOnly'
}

export enum TidyHistogramBucketType {
    LEFT_CLOSED = 'leftClosed',
    RIGHT_CLOSED = 'rightClosed'
}

export interface TidyHistogramOptions extends FormFieldObject {
    binType: "automatic" | "userDefined"
    numberOfBins: number;
    customBins: string;
    sortBins: SortingType;
    bucketFormat: TidyHistogramBucketFormat;
    intervalType: TidyHistogramBucketType;
}

export class TidyHistogram {

    public static bucketName = "bucket";
    public static countName = "count";
    private readonly context: IPublicContext;
    private readonly table: ITidyTable;
    private readonly valueCol: ITidyColumn;
    private readonly options: TidyHistogramOptions;

    constructor(context: IPublicContext, table: ITidyTable, valueCol: ITidyColumn, options: TidyHistogramOptions) {
        this.context = context;
        this.table = table;
        this.valueCol = valueCol;
        this.options = options;
    }

    static getMetaForHistogramOptions(group?: string, hideSort = false): FormFields<TidyHistogramOptions> {
        return {
            'binType': {
                group,
                fieldType: "option",
                editorConf: {
                    allowDuplicate: true,
                    optionValues: ["automatic", "userDefined"],
                    optionName: "HistogramBinType"
                },
                defaultValue: "automatic"
            },
            'numberOfBins': {
                group,
                fieldType: "number",
                defaultValue: 10,
                dependsOn: "binType",
                dependsOnVisibility: dependsOnValue => dependsOnValue === "automatic"
            },
            'customBins': {
                group,
                fieldType: "json",
                defaultValue: '[{"to": 10},{"from":10,"to":100},{"from":100}]',
                dependsOn: "binType",
                dependsOnVisibility: dependsOnValue => dependsOnValue === "userDefined"
            },
            'sortBins': {
                group,
                fieldType: "option",
                editorConf: {
                    optionValues: Object.values(SortingType),
                    optionName: "SortingType",
                },
                defaultValue: SortingType.ASCENDING,
                visibility: !hideSort
            },
            'bucketFormat': {
                group,
                fieldType: "option",
                defaultValue: TidyHistogramBucketFormat.INTERVAL,
                editorConf: {
                    optionValues: Object.values(TidyHistogramBucketFormat),
                    optionName: "TidyHistogramBucketFormat"
                }
            },
            "intervalType": {
                group,
                fieldType: 'option',
                defaultValue: TidyHistogramBucketType.RIGHT_CLOSED,
                editorConf: {
                    optionValues: Object.values(TidyHistogramBucketType),
                    optionName: "TidyHistogramBucketType"
                }
            }
        }
    }

    /**
     * Transform the table to a table where each row is a bucket in the histogram for that group
     */
    toHistogramTable(groupCol: ITidyColumn | undefined) {
        const valueCol = this.valueCol;
        const bins = this.options.binType == "userDefined" ? JSON.parse(this.options.customBins) : this.options.numberOfBins;
        const histData = TidyMath.hist(valueCol, {
            bins, intervalType: this.options.intervalType,
        });
        const context = this.context;
        const table = this.table;

        if (this.options.sortBins === SortingType.ASCENDING)
            histData.sort((a, b) => (a.from ?? -Infinity) - (b.from ?? -Infinity))
        else
            histData.sort((a, b) => (b.from ?? -Infinity) - (a.from ?? -Infinity))

        const bucketColumnCaption = this.getBucketCaption();
        const countColumnCaption = context.localize("count");

        if (groupCol == null) {
            const nRows = histData.length;
            const binCol = table.createColumn(TidyHistogram.bucketName, new Array(nRows), TidyColumnsType.CHARACTER);
            const countCol = table.createColumn(TidyHistogram.countName, new Array(nRows), TidyColumnsType.NUMERIC);
            binCol.setCaption(bucketColumnCaption)
            countCol.setCaption(countColumnCaption)
            histData.forEach((bin, idx) => {
                const binName = bin.name ?? this.formatBin(bin.from, bin.to, valueCol.getNumberFormat());
                binCol.setValue(idx, binName);
                countCol.setValue(idx, bin.count);
            });
            table.setRowCount(nRows)
            table.setColumns([binCol, countCol]);
        } else {
            const binCol = table.createColumn<string>(TidyHistogram.bucketName, [], TidyColumnsType.CHARACTER);
            const countCol = table.createColumn<number>(TidyHistogram.countName, [], TidyColumnsType.NUMERIC);
            const groupIndex: number[] = [];
            binCol.setCaption(bucketColumnCaption)
            countCol.setCaption(countColumnCaption)
            const groupNames = groupCol.groupBy();
            histData.forEach(bin => {
                const binName = bin.name ?? this.formatBin(bin.from, bin.to, valueCol.getNumberFormat());
                if (bin.rows.length > 0) {
                    const groupCounts = {};
                    bin.rows.forEach(i => {
                        const dataKey = String(groupCol.getValue(i));
                        if (groupCounts[dataKey] == null) {
                            groupCounts[dataKey] = {count: 0, row: i};
                        }
                        groupCounts[dataKey].count++;
                    });
                    Object.keys(groupCounts).forEach(key => {
                        binCol.pushValue(binName);
                        countCol.pushValue(groupCounts[key]['count']);
                        groupIndex.push(groupCounts[key]['row'])
                    })
                } else {
                    groupNames.forEach((rows) => {
                        binCol.pushValue(binName);
                        countCol.pushValue(0);
                        groupIndex.push(rows[0]);
                    });
                }
            });
            const nRows = groupIndex.length;
            groupCol.reIndex(groupIndex);
            table.setRowCount(nRows)
            table.setColumns([binCol, groupCol, countCol]);
        }
    }

    /**
     * Add a buckets column to the table
     */
    addHistogramBucketsColumn() {
        const valueCol = this.valueCol;
        const bins = this.options.binType == "userDefined" ? JSON.parse(this.options.customBins) : this.options.numberOfBins;
        const histData = TidyMath.hist(valueCol, {
            bins, intervalType: this.options.intervalType,
        });
        const table = this.table;

        const nRows = table.getRowCount();
        const binColumn = table.createColumn<string>(TidyHistogram.bucketName, new Array(nRows), TidyColumnsType.CHARACTER);
        const binFrom = table.createColumn<number | undefined>("from", new Array(nRows), TidyColumnsType.NUMERIC);
        const binTo = table.createColumn<number | undefined>("to", new Array(nRows), TidyColumnsType.NUMERIC);
        binColumn.setProperty(binFrom);
        binColumn.setProperty(binTo);
        binColumn.setCaption(this.getBucketCaption());

        histData.forEach(bin => {
            if (bin.rows.length > 0) {
                const binName = this.formatBin(bin.from, bin.to, valueCol.getNumberFormat());
                bin.rows.forEach(i => {
                    binColumn.setValue(i, binName);
                    binFrom.setValue(i, bin.from);
                    binTo.setValue(i, bin.to);
                });
            }
        });
        table.addColumn(binColumn);
    }

    private getBucketCaption() {
        return this.valueCol.getCaption();
    }

    private formatBin(from: number | undefined, to: number | undefined, format: ThemeTextFormatter | undefined): string {

        const context = this.context;
        const numberFormat = format ?? context.getTheme().ic3.formatter.text.defaultNumber;
        const numberFormatter = context.getNumberFormatter(numberFormat);

        switch (this.options.bucketFormat) {
            case TidyHistogramBucketFormat.FROM_ONLY:
                if (from == null) {
                    return to != null ? "< " + numberFormatter(to) : "";
                }
                return numberFormatter(from);

            case TidyHistogramBucketFormat.INTERVAL:

                if (from == null && to != null)
                    return "< " + numberFormatter(to);

                if (to == null && from != null)
                    return "> " + numberFormatter(from);

                const fromStr = numberFormatter(from);
                const toStr = numberFormatter(to);
                return fromStr + " - " + toStr;

            case TidyHistogramBucketFormat.TO_ONLY:
                if (to == null) {
                    return from != null ? "> " + numberFormatter(from) : "";
                }
                return numberFormatter(to);

            case TidyHistogramBucketFormat.MATH_INTERVAL:
                const left1 = this.options.intervalType === TidyHistogramBucketType.LEFT_CLOSED ? '[' : '(';
                const right1 = this.options.intervalType === TidyHistogramBucketType.LEFT_CLOSED ? ')' : ']';
                const fromStr2 = from == null ? "(−∞" : (left1 + numberFormatter(from));
                const toStr2 = to == null ? "+∞)" : (numberFormatter(to) + right1);
                return fromStr2 + ", " + toStr2;

            case TidyHistogramBucketFormat.MATH_INTERVAL_REVERSED:
                const left2 = this.options.intervalType === TidyHistogramBucketType.LEFT_CLOSED ? '[' : ']';
                const right2 = this.options.intervalType === TidyHistogramBucketType.LEFT_CLOSED ? '[' : ']';
                const fromStr3 = from == null ? "]−∞" : (left2 + numberFormatter(from));
                const toStr3 = to == null ? "+∞[" : numberFormatter(to) + right2;
                return fromStr3 + ", " + toStr3;

        }

        throw Error("bucket format not found: " + this.options.bucketFormat);
    }

}