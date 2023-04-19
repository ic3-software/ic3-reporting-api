import {
    AxisCoordinate,
    ConvertToTypeParseSettings,
    EntityItem,
    GroupRowIndices,
    IMdxAxisSeriesInfo,
    ITidyColumnIndex,
    ITidyColumnsSource,
    MdxInfo,
    MdxMemberCoordinates,
    TidyCellError,
    TidyColumnsSubType,
    TidyColumnsType,
} from "./PublicTidyTableTypes";
import {TidyActionEvent} from "./IcEvent";
import {ThemeTextFormatter} from "./PublicTheme";
import {Property} from "csstype";
import {AppNotification} from "./INotification";
import {MdxNodeIdentifier} from "./PublicTidyTable";

export interface ITidyColumnTypedValue {

    value: any;
    fValue?: string;
    type: TidyColumnsType;

    /**
     * Insert this mdx value for this row. Leave undefined to set the mdx info of the row to undefined.
     */
    mdxInfo?: MdxInfo | null;

}

export type ITidyColumnAddValue = ITidyColumnAddValueInsert | ITidyColumnAddValueCopyRow;

export interface ITidyColumnAddValueInsert {

    options: "INSERT";

    value: ITidyColumnTypedValue;

}

export interface ITidyColumnAddValueCopyRow {

    options: "COPY_ROW";

    rowIndex: number;

}

/**
 * Properties with a special meaning
 */
export enum ITidyColumnNamedProperties {

    /**
     * The value of a cell.
     */
    mdxCellValue = "value",

    /**
     * The formatted value of a cell. For example, 5003 in euros is formatted as €5,003
     */
    mdxCellFormattedValue = "formattedValue",

    /**
     * MDX related colorings
     */
    mdxCellBackColor = "mdxCellBackColor",

    /**
     * MDX related colorings
     */
    mdxCellForeColor = "mdxCellForeColor",

    /**
     * The format string for the cell value. For example, euros are formatted using €#,###.
     * and percentages using #0.00%.
     */
    mdxCellFormatString = "mdxCellFormatString",

    /**
     * The main color of the cell
     */
    mdxCellColor = "color",

    /**
     * Column defined to fire an app. notification.
     *
     * The name of the notification (e.g., print-report).
     */
    appNotificationType = "appNotificationType",

    /**
     * Column defined to fire an app. notification.
     *
     * The parameters of the notification (e.g., page size, filename, ...) as a JSON or a string.
     */
    appNotificationPayload = "appNotificationPayload",

    /**
     * Column defined to fire events, the name of the event
     */
    eventName = "eventName",

    /**
     * Column defined to fire events, the value of the event (e.g. used in title)
     */
    eventValue = "eventValue",

    /**
     * Column defined to fire events, the mdx value of the event (e.g. used in queries)
     */
    eventMdxValue = "eventMdxValue",

    /**
     * Column defined as an MDX axis, the unique name of the column  (the name is the value of the column)
     */
    uniqueName = "uniqueName",

    /**
     * Column defined as an MDX axis, the caption of the column
     */
    caption = "caption",

    /**
     * Column defined as an MDX axis, the key of the column
     */
    mdxCellKey = "key",

    /**
     * Show this when hovering over the cell (or the visualisation representing the cell)
     */
    tooltip = "tooltip",

    /**
     * Name for datetime properties for levels of type Year, Month, Day, Hour, etc..
     */
    datetime = "datetime",
}

export const CharacterTidyColumnProperties = new Set<string>([

    ITidyColumnNamedProperties.mdxCellFormattedValue,
    ITidyColumnNamedProperties.uniqueName,

    ITidyColumnNamedProperties.mdxCellFormatString,

    ITidyColumnNamedProperties.appNotificationType,
    ITidyColumnNamedProperties.eventName,

    ITidyColumnNamedProperties.caption,
    ITidyColumnNamedProperties.tooltip,

]);

/**
 * A copy from XLSX CellObject (we don't want the link to the library !)
 */
export interface ITidyColumnXlsxCell {
    /** The raw value of the cell.  Can be omitted if a formula is specified */
    v?: string | number | boolean | Date;

    /** Formatted text (if applicable) */
    w?: string;

    /**
     * The Excel Data Type of the cell.
     * b Boolean, n Number, e Error, s String, d Date, z Empty
     */
    t: 'b' | 'n' | 'e' | 's' | 'd' | 'z';

    /** Cell formula (if applicable) */
    f?: string;

    /** Range of enclosing array if formula is array formula (if applicable) */
    F?: string;

    /** Rich text encoding (if applicable) */
    r?: any;

    /** HTML rendering of the rich text (if applicable) */
    h?: string;

    /** Number format string associated with the cell (if requested) */
    z?: string | number;

    /** Cell hyperlink object (.Target holds link, .tooltip is tooltip) */
    l?: {
        /** Target of the link (HREF) */
        Target: string;

        /** Plaintext tooltip to display when mouse is over cell */
        Tooltip?: string;
    };

    /** The style/theme of the cell (if applicable) */
    s?: any;
}

// Remove null and undefined from T
type NonNullable<T> = Exclude<T, null | undefined>;

export type AllowedColumnType<T> = TidyColumnsType.UNKNOWN
    | TidyColumnsType.MIXED
    | (NonNullable<T> extends Property.Color ? TidyColumnsType.COLOR : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends string ? TidyColumnsType.CHARACTER : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends number ? TidyColumnsType.NUMERIC | TidyColumnsType.LATITUDE | TidyColumnsType.LONGITUDE : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends boolean ? TidyColumnsType.LOGICAL : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends any[] ? TidyColumnsType.LIST : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends Date ? TidyColumnsType.DATETIME : TidyColumnsType.UNKNOWN)
    | (NonNullable<T> extends unknown ? TidyColumnsType : TidyColumnsType.UNKNOWN)
    | (T extends null ? TidyColumnsType.NULL : TidyColumnsType.UNKNOWN);

export interface ITidyBaseColumnReadonly<T> {

    /**
     * Returns the length of the value array.
     */
    length(): number;

    /**
     * Returns true if and only if the column has zero rows.
     */
    isEmpty(): boolean;

    getSource(): ITidyColumnsSource;

    /**
     * Get the MDX role of the column
     */
    getRole(): string | undefined;

    /**
     * Return the type of the column
     */
    getType(): AllowedColumnType<T>;

    /**
     * e.g., List<T>.
     */
    getTypeParam(): TidyColumnsType | undefined;

    /**
     * E.g., datetime column: YEAR, ...
     */
    getSubType(): TidyColumnsSubType | undefined;

    /**
     * Check if column is of type
     * @param type check this type
     */
    is<T extends TidyColumnsType>(type: T): this is ITidyColumnIsType<T>;

    /**
     * Returns true if and only if the column is of the type(s) specified
     * @param typesToCheck one or more types to check this column against
     */
    isOfType(...typesToCheck: TidyColumnsType[]): boolean;

    /**
     * Returns the name of the column.
     */
    getName(): string;

    /**
     * Get the display name of the column. Both the name and the caption form the display name of the column.
     */
    getDisplayName(): string;

    /**
     * Returns the caption of the column. The caption is used for displaying localised
     * or custom captions for the axis, header, etc.
     */
    getCaption(): string;

    /**
     * Returns the formatter of the column.
     */
    getNumberFormat(): ThemeTextFormatter | undefined;

    /**
     * Returns true if the column is a hierarchical structure
     */
    isHierarchy(): boolean;

    /**
     * For hierarchical structures the tree depth (starts at zero).
     */
    getLevelDepthR(idx: number): number;

    /**
     * Returns the column values.
     */
    getValues(): ReadonlyArray<T>;

    /**
     * Get the value of the column at position idx.
     * @param idx the position to return the value of.
     */
    getValue(idx: number): T;

    /**
     * Function used for value comparison in sorting and ranking. Return a positive number if a > b, a negative
     * number if a < b and 0 otherwise.
     * @param a value 1
     * @param b value 2
     */
    compare(a: T, b: T): number;

    /**
     * Apply a function to the groups of unique values in this column
     *
     * @param useMdx If true, use MDX-unique names to construct groups. If false, use the columns values.
     * Default = false.
     *
     * @returns a map with indexes for each group. Key -> row indeces
     */
    groupBy(useMdx?: boolean): Map<string, GroupRowIndices>;

    /**
     * Same as reIndex but creating a new column leaving this column untouched.
     *
     * @see ITidyBaseColumn.reIndex
     */
    reIndexN(index: number[]): ITidyBaseColumn<T>;

    /**
     * Returns the color of this columns header.
     */
    getHeaderColor(): string | undefined;

}

/**
 * Base interface for nullable column.
 */
export interface ITidyBaseColumn<T> extends ITidyBaseColumnReadonly<T> {
    /**
     * Set the color for the columns header
     */
    setHeaderColor(color: string | undefined): void;

    isSameDimensionality(other: ITidyBaseColumn<any>): boolean;

    getErrors(): (TidyCellError | undefined)[];

    /**
     * If an error occurred in the calculation of cells for a column, then the error can be
     * retrieved using this function.
     * @param idx the row index of the cell to retrieve the error of.
     */
    getError(idx: number): TidyCellError | undefined;

    /**
     * Returns first value where callback does not return undefined.
     * @param callback given the row index, outputs a value or undefined.
     */
    findFirst<P>(callback: (idx: number) => P | undefined): P | undefined;

    /**
     * Get the formatted value of the column at position idx.
     *
     * undefined - if the formatted_value is not available
     * null - if it's empty
     *
     * @param idx the position to return the value of.
     */
    getFormattedValue(idx: number): string | undefined;

    /**
     * Return the formatted value. Fallback on the value itself.
     */
    getFormattedValueOrValue(idx: number): string | undefined;

    getNumberFormatInfo(): string | undefined;

    /**
     * Get cell as expected by xlsx library (do not include the interface as it's lazy loaded !)
     * Does not return the format string.
     *
     * @param idx the position to return the value of.
     */
    getExcelCell(idx: number): ITidyColumnXlsxCell | undefined;

    /**
     * Returns excel format, best effort
     */
    getExcelFormat(): string | undefined;

    /**
     * Returns the type for Material-UI Table/Grid
     */
    getXGridType(): "string" | "number" | "date" | "dateTime" | "boolean" | undefined;

    /**
     * Return the cell decoration of the column
     */
    getCellDecoration(): PublicTidyColumnCellDecoration | undefined;

    /**
     * Returns true if the column has a property of requested name.
     */
    hasProperty(name: ITidyColumnNamedProperties | string): boolean;

    /**
     * Returns true if the column has color property or is a color column
     */
    hasColorProperty(): boolean;

    /**
     * Returns the color column (if defined).
     *
     * If the column has type 'color', then it returns itself. Else it returns the
     * column of the first property with type 'color'.
     */
    getColorColumn(): ITidyColorColumn | undefined;

    /**
     * Returns the color of a cell (if defined).
     *
     * If the column has type 'color', then it returns the cell value. Else it returns the
     * value at rowIdx of the first property with type 'color' (if it is defined).
     */
    getColor(rowIdx: number): Property.Color | undefined;

    /**
     * Returns the property at the specified property coordinate.
     * @param name name of the property.
     */
    getProperty(name: ITidyColumnNamedProperties | string): ITidyUnknownColumn;

    /**
     * Returns the property at the specified property coordinate.
     * @param name name of the property.
     */
    getOptionalProperty(name: ITidyColumnNamedProperties | string): ITidyUnknownColumn | undefined;

    /**
     * Get the value of the property for the given property coordinate and the given row (undefined if the property does not exist)
     * @param name name of the property.
     * @param rowIdx row index for the value to return.
     */
    getPropertyAt(name: ITidyColumnNamedProperties | string, rowIdx: number): any;

    /**
     * Return the properties of a column for a given cell index.
     *
     * @param idx row index of cell.
     * @deprecated
     */
    getPropertiesAt(idx: number): Record<string, any>;

    /**
     * Return available properties for this column as a list of columns.
     */
    getPropertiesAsColumns(): ITidyUnknownColumn[];

    isWithEntityItem(): boolean;

    /**
     * Create and return the entity item at position idx for generating events.
     */
    getEntityItem(idx: number): EntityItem | undefined;

    /**
     * Get the entity item for the column. Used in column selection.
     * Returns empty array if there are no entityItems.
     * @param hierarchyIndeces only include these hierarchies for generating the EntityItem. Leave undefined to include
     * all.
     */
    getColumnEntityItem(hierarchyIndeces?: number[]): EntityItem[];

    /**
     * Get the index of the parent. Returns -1 if the parent is the root.
     * @param idx the index to find the parent of.
     */
    getParentIdx(idx: number): number;

    /**
     * Return the descendants of the node in the hierarchy at the index.
     * Returned set excludes the node itself.
     * @param index
     */
    getDescendants(index: number): number[];

    /**
     * Returns true if and only if the node in the hierarchy has children.
     */
    hasChildren(index: number): boolean;

    /**
     * Returns the children of the node at index.
     */
    getChildren(index: number): number[];

    /**
     * Return the siblings of the node in the hierarchy at the index.
     * Including the node itself.
     * @param index
     */
    getSiblings(index: number): number[];

    /**
     * Get the default member of the dimension that the column represents. Returns undefined
     * if the column is not a MDX dimension.
     */
    getHierarchyDefaultMember(): EntityItem | undefined;

    /**
     * Get the mdx coordinate (axeIdx,hierIdx,tupleIdx) of the cell at rowIdx. Defines a member in a MDX Query result axes
     */
    getMdxCoordinates(rowIdx: number): MdxMemberCoordinates | undefined;

    /**
     * Get the array of MDX info in the column.
     * Returns an empty array if there is no MDX info.
     */
    getMdxInfos(): (MdxInfo | undefined)[];

    /**
     * Returns the MDX info at a row index.
     */
    getMdxInfo(idx: number): MdxInfo | undefined;

    /**
     * Returns the key from the model. Values with the same key are the same in the underlying model. Rows
     * with the same value but with a different key, are treated as different values.
     * @param rowIdx
     */
    getUid(rowIdx: number): string;

    /**
     * Get extra information of the MDX axis used for this column, if available.
     */
    getAxisInfo(): IMdxAxisSeriesInfo | undefined;

    /**
     * Get the MDX axis coordinate, if available.
     * @see AxisCoordinate
     */
    getAxisCoordinate(): AxisCoordinate | undefined;

    /**
     * Get the axis values in this column.
     *
     * If it's an MDX Axis, the potentially sorted MDX axis (e.g. pivot table sort)
     *
     * If it's not, return undefined
     */
    mdxAxis(): ReadonlyArray<T> | undefined;

    /**
     * Get the unique values in this column.
     */
    unique(ignoreNull: boolean): T[];

    /**
     * Set the name of the column.
     * @param name set this as the caption of the column.
     *
     * Note, do not use this for columns that are in tables as it can cause duplicate columns in a table.
     * Use setCaption to change the name visible to the user.
     */
    setName(name: string): void;

    /**
     * Set the number/date formatter of the column, calculating and adding the 'formattedValue' property.
     */
    setNumberFormat(format: ThemeTextFormatter | undefined): void;

    /**
     * Set the caption of the column. The caption is used for displaying localised
     * or custom captions for the axis, header, etc.
     * @param caption set this as the caption of the column.
     */
    setCaption(caption: string): void;

    /**
     * Returns true if and only if the column has a caption different from the default. The default caption is the
     * columns name.
     */
    hasCaption(): boolean;

    /**
     * Convert the column to another type. This modifies the values to be of that type.
     *
     * If type is datetime, then the settings contain the date locale (default='en_US') and
     * the dateformat (default = 'yyyy-MM-dd').
     */
    convertToType(type: TidyColumnsType, settings?: ConvertToTypeParseSettings): void;

    /**
     * Same as convertToType but creating a new column.
     */
    convertToTypeN(type: TidyColumnsType, settings?: ConvertToTypeParseSettings): ITidyBaseColumn<T>;

    /**
     * Create a new column with the content of this column changing both its name and its caption.
     */
    duplicate(name: string, caption: string): ITidyBaseColumn<T>;

    /**
     * Change the values of the column.
     * @param values the new values for the column.
     * @param newType the new type of the column. Leave undefined for automatic inference.
     */
    setValues<P>(values: P[], newType?: AllowedColumnType<P>): void;

    /**
     * Apply a transformation to all values in the column. Note, this functions alters the values in the column.
     * @param fun function with one parameter. Describes the transformation. In the function, index represents the
     * index of the internal data structure.
     * @param newType new type for the column. Leave blank for auto inference of the type.
     */
    apply<P>(fun: (value: T, index: number) => P, newType?: AllowedColumnType<P>): void;

    /**
     * Insert values at a row index.
     * Structure: Map: row idx -> values to insert
     *
     * e.g., add totals.
     */
    insertValues(inserts: Map<number, ITidyColumnAddValue[]>): void;

    /**
     * Repeat the values in the column.
     *
     * Examples:
     * column.getValues() --> ['a','b','c']
     * column.repeat(6,1) --> ['a','b','c','a','b','c']
     * column.repeat(6,2) --> ['a','a','b','b','c','c']
     * column.repeat(12,2) --> ['a','a','b','b','c','c','a','a','b','b','c','c']
     *
     * @param newLength new length of the array.
     * @param repetition how many times to repeat each value.
     */
    repeat(newLength: number, repetition?: number): void;

    /**
     * Same as repeat but creating a new column leaving this column untouched.
     *
     * @see repeat
     */
    repeatN(newLength: number, repetition?: number): ITidyBaseColumn<T>;

    /**
     * Push a value to the end of the column's values.
     */
    pushValue(pushValue: ITidyColumnTypedValue): void;

    /**
     * Apply a new index to the column and its properties (e.g., limiting rows, reordering rows, copying rows).
     *
     * Examples:
     * <pre>
     *      initial values       -> [ 'a', 'b', 'c']
     *        reIndex: [2,1,0]   -> [ 'c', 'b', 'a']
     *        reIndex: [2,2,1]   -> [ 'c', 'c', 'b']
     *        reIndex: [0,1,2,2] -> [ 'a', 'b', 'c','c']
     *        reIndex: [0]       -> [ 'a' ]
     *        reIndex: [0,5]     -> [ 'a', null ]
     * </pre>
     *
     * @param index new row indices
     *
     * @see ITidyColumn.reIndexN
     */
    reIndex(index: number[]): void;

    /**
     * Set the formatted values. Use this if you have the formatted values pre-calculated
     * or a function to calculate the formatted values.
     * @param caption the caption for the added property
     */
    setFormattedValues(formattedValues: (string | null)[] | ((value: T | undefined) => string), caption?: string): void;

    /**
     * Set the colors for the column.
     * @param caption the caption for the added property
     */
    setColors(colors: (Property.Color | null)[], caption?: string): void;

    /**
     * Return a new column with transformed values.
     * @param fun function with one parameter. Describes the transformation.
     * @param columnName the name of the new column.
     * @param newType new type for the column. Leave blank for auto inference of the type.
     */
    mapToColumn<P>(fun: (value: T, index: number) => P, columnName: string, newType: AllowedColumnType<P>): ITidyBaseColumn<P>;

    /**
     *
     * if it's an mdx axis, for each row of the undelying mdx Axis
     * if no, for each row
     *
     * @see mdxAxis
     */
    mapAxisOrRows<K>(callbackfn: (rowIdx: number, column: ITidyBaseColumn<T>) => K): K[];

    /**
     * @param callbackFn  if the return value of callbackFn is undefined, then it is not included in the returned array.
     * @param forceMapAllRows if true, also include values returned by callbackFn that are undefined.
     */
    mapAllRows<P>(callbackFn: (index: number, column: ITidyBaseColumn<T>) => P | undefined, forceMapAllRows?: boolean): P[];

    /**
     * Map the rows that are visible given a hierarchical axis and an array of boolean values
     * @param expanded a function indicating for each index if it is expanded or not. If it is collapsed, then all
     * children are not visible.
     * @param fun function to apply
     */
    mapVisibleRows<P>(expanded: (rowIdx: number) => boolean, fun: (index: number) => P): P[];

    /**
     * Apply a function to all visible nodes in the column. A nodes' children are visible if expanded evaluates to
     * true for that node.
     * @param filter Possibly filter the nodes.
     */
    mapTreeVisibleRows<P>(expanded: (rowIdx: number) => boolean, fun: (rowIdx: number, isCollapsed: boolean) => P, filter?: (info: MdxInfo) => boolean): P[];

    /**
     * Set a property on the column. If the property already exists, it is overwritten.
     * @param property the column to set as a property. Ensure that the lengths are the same.
     */
    setProperty(property: ITidyColumn): void;

    /**
     * Delete a property on the column
     */
    deleteProperty(propertyName: ITidyColumn | string): void;

    /**
     * @param column the initial selection as a column
     * @param items the initial selection (name, ...)
     */
    getInitialSelectionRowIndices(column: ITidyColumn | undefined, items: any[]): number[];

    /**
     * The ITidyTableSelection row identifier for the row (uniqueName if it's an MDX like column)
     */
    getSelectionRowIdentifier(idx: number): string;

    /**
     * Returns the row index of the first occurrence where the values of this column equals value.
     * Returns undefined if it did not find the value.
     *
     * @param value value to search for.
     */
    getRowIndexOf(value: T): number | undefined;

    /**
     * For a hierarchical columns returns a a list of transformed colummns  columns as needed by a pivot
     * table like structure
     *
     * (e.g.  a columns with Year, Quarter and Month will be converteded into 3 columns [Year,Quarter,Month])
     *
     * .. still experimental
     *
     * If not, hierarchical, return this
     */
    toFlatColumns(nullValue: any): ITidyUnknownColumn[];

    /**
     * Returns the tree-path for the node, including the node itself. The path starts at the node at rowIdx and contains
     * its parents.
     * @param rowIdx column index of the node.
     */
    getNodePath(rowIdx: number): number[];

    /**
     * Returns if present a notification as defined by the properties of the columns
     */
    getAppNotification(rowIdx: number): AppNotification | undefined;

    /**
     * Returns if present an action as defined by the properties of the columns
     */
    getEventAction(rowIdx: number): [string, TidyActionEvent] | undefined;

    mapUniqueNames<T>(uniqueNames: string[], mapper: (idx: number) => T | null | undefined): T[];

    /**
     * Cell decoration
     */
    setCellDecoration(decoration: PublicTidyColumnCellDecoration): void;

    /**
     * Return the index of the column.
     * @see tidyTable.
     */
    getIndex(): ITidyColumnIndex[];

    /**
     * undefined if it's not an Mdx member column
     */
    getQueryNodeIdentifier(idx: number): MdxNodeIdentifier | undefined;

    /**
     * Returns the group key at the row index for use with table.toAmcharts4Data.
     */
    getAmcharts4GroupKey(rowIdx: number): string;

    /**
     * Mark the column as a total column. Total columns have a different styling and css-class in tables and pivot
     * tables.
     * @param isTotal new value. Set to true to mark this column as a total. Use false to remove the mark.
     * @see isTotalColumn
     */
    setIsTotalColumn(isTotal: boolean): void;

    /**
     * Returns true if and only if the column contains total values.
     * @see setTotalColumn
     */
    getIsTotalColumn(): boolean;

    /**
     * return true if the column was created from an MDX axis (i.e.   [Geo].[Countries] on 0 )
     */
    isMdxAxis(): boolean;
}

export interface PublicTidyColumnCellDecorationRenderedOptions {
    cellWidth?: number;
    cellHeight: number;
}

export interface BaseTidyColumnCellDecoration {

    handlesCellsOnError?: boolean;

    appliesToCell?: (rowIdx: number) => boolean;

    /**
     *
     * If an object is returned the underlying code uses emotion css function to convert to a className so you can do className like css
     *
     * {
     *      fontSize: "0.7rem",
     *      ':hover': {
     *        fontSize: "1.4rem",
     *      }
     * }
     *
     */
    cssStyles?: (rowIdx: number) => Record<string, any> | undefined;
}

export interface ReactTidyColumnCellDecoration extends BaseTidyColumnCellDecoration {

    stringRenderer?: false;

    renderer?: (rowIdx: number, options?: PublicTidyColumnCellDecorationRenderedOptions) => React.ReactElement;

}

export interface HtmlTidyColumnCellDecoration extends BaseTidyColumnCellDecoration {

    stringRenderer: true;

    renderer: (rowIdx: number, options?: PublicTidyColumnCellDecorationRenderedOptions) => string;

}

export type PublicTidyColumnCellDecoration = ReactTidyColumnCellDecoration | HtmlTidyColumnCellDecoration;

export type ITidyColumn = ITidyBaseColumn<any>;
export type ITidyUnknownColumn = ITidyBaseColumn<unknown>;
export type ITidyNullColumn = ITidyBaseColumn<null>;
export type ITidyNumericColumn = ITidyBaseColumn<number | null>;
export type ITidyCharacterColumn = ITidyBaseColumn<string | null>;
export type ITidyColorColumn = ITidyBaseColumn<Property.Color | null>;
export type ITidyDateColumn = ITidyBaseColumn<Date | null>;
export type ITidyLogicalColumn = ITidyBaseColumn<boolean | null>;
export type ITidyListColumn = ITidyBaseColumn<any[] | null>;

export type ITidyColumnIsType<T extends TidyColumnsType> =
    T extends TidyColumnsType.ANY ? ITidyColumn :
        T extends TidyColumnsType.COLOR ? ITidyColorColumn :
            T extends TidyColumnsType.LONGITUDE ? ITidyBaseColumn<number | null> :
                T extends TidyColumnsType.LATITUDE ? ITidyBaseColumn<number | null> :
                    T extends TidyColumnsType.ISO2_LOCATION_CODE ? ITidyCharacterColumn :
                        T extends TidyColumnsType.DATETIME ? ITidyDateColumn :
                            T extends TidyColumnsType.NUMERIC ? ITidyNumericColumn :
                                T extends TidyColumnsType.CHARACTER ? ITidyCharacterColumn :
                                    T extends TidyColumnsType.LOGICAL ? ITidyLogicalColumn :
                                        T extends TidyColumnsType.LIST ? ITidyListColumn :
                                            T extends TidyColumnsType.MIXED ? ITidyColumn :
                                                T extends TidyColumnsType.NULL ? ITidyNullColumn :
                                                    ITidyUnknownColumn;

/**
 * Introduced for tidy table HTML expression (e.g., tooltip) completion.
 *
 * Quite simple for now: caption (as shown in the completion) to the actual Javascript method.
 */
export interface TidyTableExprColumnMeta {

    caption: string;

    method: string;

    /**
     * If true, then modifier only available when eval mode is "row".
     */
    argRow?: boolean;

    /**
     * If true, then modifier only available when the fieldMeta has allowTotalOfSelection set to true.
     */
    allowsSelectedTotal?: boolean;

}

export const TidyTableTextExprColumnMetas: TidyTableExprColumnMeta[] = [

    {caption: "total", method: "sum"},
    {caption: "average", method: "mean"},
    {caption: "median", method: "median"},
    {caption: "min", method: "min"},
    {caption: "max", method: "max"},
    {caption: "variance", method: "variance"},
    {caption: "standardDeviation", method: "standardDeviation"},
    {caption: "count", method: "count"},

    {caption: "percent", method: "percent", argRow: true},

    {caption: "caption", method: "getCaption"},

    {caption: "mdxName", method: "mdxName", argRow: true},
    {caption: "mdxCaption", method: "mdxCaption", argRow: true},
    {caption: "mdxUniqueName", method: "mdxUniqueName", argRow: true},
    {caption: "mdxKey", method: "mdxKey", argRow: true},

    {caption: "totalSelectedOrTotal", method: "sumFiltered", allowsSelectedTotal: true}

];