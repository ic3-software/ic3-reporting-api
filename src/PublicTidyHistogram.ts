import {SortingType} from "./PublicTidyTableTypes";
import {FormFieldObject, FormFields} from "./PublicTemplateForm";

export enum TidyHistogramBucketFormat {
    INTERVAL = 'interval',
    MATH_INTERVAL = 'mathInterval',
    MATH_INTERVAL_REVERSED = 'mathIntervalReversed',
    FROM_ONLY = 'fromOnly',
    TO_ONLY = 'toOnly'
}

export enum TidyHistogramBucketType {
    /**
     * [from, to)
     */
    LEFT_CLOSED = 'leftClosed',

    /**
     * (from, to]
     */
    RIGHT_CLOSED = 'rightClosed'
}

export enum HistogramBinType {
    AUTOMATIC_WITH_BINS = "automatic",
    USER_DEFINED = "userDefined",

    /**
     * Makes sure that the automatic buckets do not consist of floating point numbers with many decimals.
     * E.g., it uses [0, 0.5, 1] instead of [0.001, 0.4955, 0.99]. User cannot set the number of bins however.
     */
    INTERVAL_STEPS = "roundedIntervals"
}

export interface TidyHistogramOptions extends FormFieldObject {

    /**
     * Bucket Mode.
     *
     * Automatically create buckets or define them yourself.
     */
    binType: HistogramBinType;

    /**
     * Bucket Count.
     *
     * The number of buckets to auto generate.
     */
    numberOfBins: number;

    /**
     * Number of buckets per interval step.
     */
    prettyIntervalCount: number;

    /**
     * Custom Buckets.
     *
     * A list of objects `{from,to,name}`. Each object describes the range `from < x <= to`. No `from` or `to`
     * means that the range is unbounded on that side.
     */
    customBins: string;

    /**
     * Sort Buckets.
     *
     * Sort the buckets in this order. The sort uses the `from` of each bucket.
     */
    sortBins: SortingType;

    /**
     * Bucket Name Format.
     *
     * How to format the names for the bucket. If there is a name in the user defined specification,
     * then the bucket takes that name.
     */
    bucketFormat: TidyHistogramBucketFormat;

    /**
     * Bucket Type.
     *
     * Which side of the bucket is closed?
     */
    intervalType: TidyHistogramBucketType;

    /**
     * Include row ids of the rows that are in the bucket. Added in the table as a column with array values. E.g.,
     * value [0,4,5] means rows 0, 4 and 5 are in the bucket.
     */
    includeRowIds?: boolean;
}

export const TidyHistogramMetaOptions = (group?: string, hideSort = false): FormFields<TidyHistogramOptions> => {
    return {
        'binType': {
            group,
            fieldType: "option",
            editorConf: {
                allowDuplicate: true,
                optionValues: Object.values(HistogramBinType),
                optionName: "HistogramBinType"
            },
            defaultValue: HistogramBinType.AUTOMATIC_WITH_BINS
        },
        'numberOfBins': {
            group,
            fieldType: "number",
            defaultValue: 10,
            dependsOn: "binType",
            dependsOnVisibility: dependsOnValue => dependsOnValue === HistogramBinType.AUTOMATIC_WITH_BINS
        },
        'customBins': {
            group,
            fieldType: "json",
            defaultValue: '[{"to": 10},{"from":10,"to":100},{"from":100}]',
            dependsOn: "binType",
            dependsOnVisibility: dependsOnValue => dependsOnValue === HistogramBinType.USER_DEFINED
        },
        'prettyIntervalCount': {
            group,
            fieldType: "number",
            defaultValue: 4,
            dependsOn: "binType",
            dependsOnVisibility: dependsOnValue => dependsOnValue === HistogramBinType.INTERVAL_STEPS
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
        },
        "includeRowIds": {
            fieldType: 'boolean',
            visibility: false,
        }
    }
}

export const TidyHistogramBucketColName = "bucket";
export const TidyHistogramCountColName = "count";
export const TidyHistogramRowIdsName = "rowIds";
