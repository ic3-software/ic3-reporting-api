/**
 * Tidy Column Types
 */

import {TidyHistogramBucketType} from "./PublicTidyHistogram";

export enum TidyColumnsType {
    /**
     * Values represent a color, e.g. 'red', 'rbg(10, 10, 10)' or '#fff'. Can be null.
     */
    COLOR = 'color',

    LONGITUDE = 'longitude',
    LATITUDE = 'latitude',

    /**
     * ISO2 location (country, region, city...) codes
     */
    ISO2_LOCATION_CODE = 'iso2Location',

    /**
     * date, time or combination of the two. Can be null.
     */
    DATETIME = 'datetime',

    /**
     * numeric data, e.g., double, float, integer, etc. Can be null.
     */
    NUMERIC = 'numeric',

    /**
     * Textual data, string type. Can be null.
     */
    CHARACTER = 'character',

    /**
     * Boolean data type, true, false. Can be null.
     */
    LOGICAL = 'logical',

    /**
     * array of values. Can be null.
     */
    LIST = 'list',

    /**
     * Column has values of multiple types
     */
    MIXED = 'mixed',

    /**
     * The column type is not known because there is no data
     */
    UNKNOWN = 'unknown',

    /**
     * The column has null values only
     */
    NULL = 'null',

    /**
     * Use any to opt-out of type checking
     */
    ANY = 'any'
}

export enum ITidyColumnsSource {
    QUERY = 'query',
    TRANSFORMATION = 'transformation',
    UNKNOWN = 'unknown'
}

/**
 * Defines a mapping that maps columns to the coordinate system of the chart.
 *
 * The key represents the internal name for the mapping (is converted to lowercase).
 * undefined --> the editor sets names to undefined upon removing of a mapping.
 */
export type ChartTemplateDataMapping = Record<string, TidyTableColumnSelector | undefined>

/**
 * Defines an index from column tag (name, mapping, role, etc..) to the name or index of the column in the table.
 * The column tag is converted to lower case.
 */
export type TidyColumnIndex = Record<string, string | number>;

export enum TidyTableMappingColumnSelectorOptions {

    ALL = '@IC3_ALL',
    ALL_NUMERIC = '@IC3_ALL_NUMERIC',
    ALL_CHARACTER = '@IC3_ALL_CHARACTER',
    ALL_MEASURES = '@IC3_ALL_MEASURES',
    ALL_AXIS = '@IC3_ALL_AXIS',

}

export type TidyTableColumnSelector = {
    /**
     * Search column by name
     */
    name: string;

    /**
     * If we want a property, the name of the column's property.
     */
    property?: string;
} | TidyTableMappingColumnSelectorOptions;

/**
 * Coordinate of an MDX member
 */
export interface MdxMemberCoordinates {
    /**
     * index of the axis. ON 0, ON 1, etc..
     */
    axisIdx: number;

    /**
     * index of the tuple in the axis. E.g. (AF, 2009) in [AF, 2008, AF, 2009, AF, 2010] has index 1.
     */
    tupleIdx: number;

    /**
     * index of the member in the tuple. E.g. AF in (AF, 2009) has index 0 and 2009 has index 1.
     */
    hierIdx: number;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * The coordinate of an MDX axis. If and only if the columns source is from ON 0, the hierIdx is defined.
 */
export interface AxisCoordinate extends Optional<MdxMemberCoordinates, "tupleIdx"> {
    /**
     * Object keeping track of the transformation from the original axis to the current column.
     * If this object is undefined, then the column can not be constructed using a coordinate transformation of the axis.
     */
    repetitionInfo?: MdxRepetitionInfo;
}

export interface MdxRepetitionInfo {
    /**
     * The number of members in the axis (From 'len' in the json axis guts).
     */
    axisLength: number;

    /**
     * Number of repetitions for each member. See ITidyBaseColumn > repeat.
     */
    repetition: number;
}

/**
 * identifier of a column value ( uniqueName if it´s an axis or idx if measure )
 */
export type TidyColumnCoordinateUniqueName = string;

export enum IAmcharts4DataKey {
    /**
     * The value of the axis. The value is a date if the user mapped a date column and the row number string if the
     * user mapped a character column. Use an adapter on the category axis to get the actual value of the label.
     */
    AXIS = "axis",

    /**
     * Tag for the rows in the result
     */
    ROW = "row",

    /**
     * When there are no groups or levels in the data, this name is used.
     */
    NULL = "_"
}

/**
 * Objects that have this type are used in chart.data in amCharts.
 */
export type IAmCharts4Data = Record<string, any>;

export interface IAmCharts4DataTreeMap extends IAmCharts4Data {
    children: IAmCharts4Data[];
}

export type ITidyRow = any[];

export interface MdxInfo {
    /**
     *  mdx unique name
     */
    uniqueName: string;
    key: string;
    pun?: string;
    lcaption?: string;
    ld: number;
    cc?: number;

    /**
     * localized version, same as name if no localization
     */
    caption: string;

    /**
     * Not localized version
     */
    name: string;

    /**
     * Index of the member on the mdx-axis.
     */
    index: number;

    isAll?: boolean;
}

export interface IMdxAxisSeriesInfo {

    hierarchyName?: string;
    hierarchyUN?: string;
    hierarchyType?: string;

    /**
     * A single level name is being specified in the guts for all the axis values.
     */
    levelUN?: string;

    /**
     * The unique name of the default member of the dimension.
     */
    defaultMemberUN?: string;
    defaultMemberName?: string;
    defaultMemberCaption?: string;
    defaultMemberKey?: string;
}

export interface EntityItem {

    uniqueName: string; /* mdx unique name */
    name: string; /* not localized version */
    caption: string; /* localized version , same as name if no localization */
    key?: string;

    hierUN?: string;
    parentUN?: string;
    selected?: boolean;
    empty?: boolean;

    tupleUNames?: string[];  /* it's a tuple */
    tidyIdxHint?: number;   /* if it's a rowIdx from a tidy table, potentially the rowIdx (on drilldown it's broken) */
}

export interface TidyCellError {
    errorCode: string;
    errorDescription: string;
}

/**
 * This is produced by a hit (click) event
 *
 * it might actually 'select' one or multiple rows in a Tidy table (e.g. all rows for [Time].[2010])
 * it can be defined using one or multiple TidyColumns ( kinda forEachMatchingRow)
 *
 * uniqueNames are used so it survives drill-downs, filter or new queries, in this
 * scenario a coordinate might not longer match any rowIdx
 */
export interface ITidyTableSelection {
    /**
     * If the Table changes this rowIdx might not longer be valid
     * It's the clicked/hit row
     */
    hitRowIdx: number,

    /**
     * A list of unique names that identify the selection
     */
    rowIdentifier: string | string[];

    /**
     * A list with the columns names (for info)
     */
    columnNames: string | string[];
}

export enum SelectionBehaviour {
    /**
     * Clear the event value. Default behaviour.
     */
    CLEAR_EVENT = "CLEAR_EVENT",

    /**
     * Select all items in the filter.
     */
    SELECT_ALL = "SELECT_ALL",

    /**
     * Select no items in the filter and clear the event.
     */
    SELECT_NONE = "SELECT_NONE",

    /**
     * Fire the default member. The selection remains empty.
     */
    MDX_DEFAULT = "MDX_DEFAULT",

    /**
     * Fire the empty set in the event. The selection remains empty.
     */
    EMPTY_SET = "EMPTY_SET",

    /**
     * The filter can not be empty. The click is canceled. If no initial selection, the first value is used.
     */
    NOT_ALLOW_EMPTY = "NOT_ALLOW_EMPTY",
}

export enum SortingType {
    ASCENDING = 'ASCENDING',
    DESCENDING = 'DESCENDING'
}

export interface HistogramBucket {
    /**
     * Bucket start range. Undefined = -Infinity.
     */
    from?: number;

    /**
     * Bucket end range. Undefined = Infinity.
     */
    to?: number;

    /**
     * The name of the bucket
     */
    name?: string;
}

export interface HistogramData extends HistogramBucket {
    /**
     * Number of values that fall in the range [from, to).
     */
    count: number;

    /**
     * Row indices where the value falls in the bucket
     */
    rows: number[];
}

export interface HistogramOptions {
    /**
     * The number of bins to use in the histogram or an object with custom bins. Default = 10.
     *
     * If bins is a number, then the algorithm generates the bins. The included endpoint of the bin is rounded with
     * a precision of 1e10 in the direction that makes the bin larger.
     */
    bins: number | HistogramBucket[];

    /**
     * The type of interval. Default = RIGHT_CLOSED.
     */
    intervalType: TidyHistogramBucketType;

    /**
     * If true, put the minimum value in the first bucket if intervalType = (from, to] or put the maximum value
     * in the last bucket if intervalType = [from, to).
     * If false, exclude the minimum or maximum value in the above scenario.
     * Default = true.
     */
    includeEndPoints: boolean;
}

export enum InterpolationType {
    NONE = 'none',
    RGB = 'rgb',
    HCL = 'hcl',
    HSL = 'hsl',
    LAB = 'lab'
}