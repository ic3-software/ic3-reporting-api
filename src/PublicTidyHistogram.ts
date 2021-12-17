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
    binType: "automatic" | "userDefined"
    numberOfBins: number;
    customBins: string;
    sortBins: SortingType;
    bucketFormat: TidyHistogramBucketFormat;
    intervalType: TidyHistogramBucketType;
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
        }
    }
}

export const TidyHistogramBucketColName = "bucket";
export const TidyHistogramCountColName = "count";
