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
    LEFT_CLOSED = 'leftClosed',
    RIGHT_CLOSED = 'rightClosed'
}

export interface TidyHistogramOptions extends FormFieldObject {

    /**
     * Bucket Mode.
     *
     * Automatically create buckets or define them yourself.
     */
    binType: "automatic" | "userDefined"

    /**
     * Bucket Count.
     *
     * The number of buckets to auto generate.
     */
    numberOfBins: number;

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
