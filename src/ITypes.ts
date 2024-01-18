export type PaperSizeName = "A5" | "A4" | "A3" | "B5" | "B4" | "Letter" | "Legal" | "Ledger" | "JIS-B5" | "JIS-B4";
export type PaperOrientation = "portrait" | "landscape";
export type PaperSizeUnits = "px" | "mm" | "cm" | "in";

export enum CompareTextInterpretationType {
    MORE = "more=better",
    LESS = "less=better",
    NONE = "none"
}

export enum TargetTextPosition {
    DISABLE = "DISABLE",
    ALIGN_TOP = "ALIGN_TOP",
    ALIGN_BOTTOM = "ALIGN_BOTTOM",
}

export enum TargetTextIconSet {
    TREND_ICONS = "TREND_ICONS",
    TRIANGLE_ICONS = "TRIANGLE_ICONS",
}

export enum SparkChartType {
    LINE = 'line',
    COLUMN = 'column'
}

export enum SparklinePosition {
    BELOW_VALUE = "BELOW_VALUE",
    RIGHT_OF_VALUE = "RIGHT_OF_VALUE"
}

export enum QueryType {
    MDX = "mdx",
    SQL = 'sql',
    EMBEDDED = 'embedded',
    HTTP_CSV = "HTTP_CSV"
}

/**
 * Set to `true` to hide the icon.
 */
export interface IWidgetBoxIconsDefinition {
    disableQueryRunning?: boolean;
    disableQueryFilter?: boolean;
    disableQueryCellOnError?: boolean;
    disableQueryMaxRowsReached?: boolean;
    disableDrilldown?: boolean;
    disableHelp?: boolean;
    disableInteractionSwitch?: boolean;
}

export type IUserMenuOptions =
    'editGadget' |
    'editWidget' |
    'deleteWidget' |
    'deleteGadget' |
    'convertGadgetToWidget' |
    'addEventToAllQueries' |
    'migrateWidget' |
    'maximize' |
    'clearSorting' |
    'showData' |
    'resetQuery' |
    'clearState' |
    'clearSelection' |
    'toInitialSelectionOnEditing' |
    'toInitialSelection' |
    'export_xls' |
    'export_png' |
    'export_svg';


