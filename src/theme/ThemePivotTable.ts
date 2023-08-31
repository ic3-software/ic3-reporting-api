import {BaseTableChartOptions} from "./ThemeBaseTable";

export class PivotTableClasses {

    static readonly main = "ic3-pt";

    static readonly cell = "ic3-pt-cell";

    static readonly totalRow = "ic3-pt-row.ic3-totalRow";

    static readonly leftHeaderCell = "ic3-pt-col.lh";

    static readonly leftHeaderTitle = "ic3-pt-col.lh .ic3-pt-header-label";

    static readonly topHeaderCell = "ic3-pt-col.th";

    static readonly topHeaderTitle = "ic3-pt-col.th .ic3-pt-header-label";

    static readonly column = "ic3-pt-col";

    static readonly columnSeparator = "ic3-pt .ic3-pt-col-separator";

    static readonly columnSeparatorContent = "ic3-pt .ic3-pt-col-separator-content";

    static readonly icon = "ic3-pt-icon";

    static readonly iconSort = "ic3-pt-icon-sort";

    static readonly emptyHeader = "ic3-pt-empty-header";

    static readonly selected = "ic3-pt-selected";

    static readonly hover = "ic3-pt-hover";

}

/**
 * List of classNames available
 */
export declare type PivotTableClassKey = keyof PivotTableClasses;

export interface PivotTableProps {

    variant?: string;
}

export enum PivotTableHoverEffectOptions {
    NONE = 'NONE',
    SELECTION_OR_ROW = 'SELECTION_OR_ROW',
    ROW_OR_COLUMN = 'ROW_OR_COLUMN',
    ROW_AND_COLUMN = 'ROW_AND_COLUMN',
    ROW_ONLY = 'ROW_ONLY',
    COLUMN_ONLY = 'COLUMN_ONLY',
}

/**
 * Pivot Table Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: PivotTable
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface PivotTableChartOptions extends BaseTableChartOptions {

    /**
     * Name of a variant. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * Left Header Names (CSV).
     *
     * Names of the columns in the left header. A comma separated list of values
     * ($h for the hierarchy name, $l for the level name). The last value repeat itsef.
     */
    cornerText?: string;

    /**
     * Sortable (CSV).
     *
     * Display the sort options for the top left header. A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    leftHeaderSortable: string;

    /**
     * Merge Left Header.
     *
     * Use a single cell int the top left corner of the table.
     */
    mergeLeftHeader: boolean;

    /**
     * Wrap Top Header.
     *
     * Display the top header content on multiple lines.
     */
    topHeaderWrap: boolean;

    /**
     * Flatten Top Header.
     *
     * Removes drilldown and parent/child relations from top header.
     */
    flattenTopHeader: boolean;

    /**
     * Left Header Alignment (CSV).
     *
     * The first column (possibly a multi-hierarchy axis). A comma separated list of values:
     * 'left', 'center', 'right'. The last value repeats itself.
     */
    columnLeftHeaderAlign: string;

    /**
     * Hover Behavior.
     *
     * Highlight rows and/or columns on hover.
     */
    hoverOptions: PivotTableHoverEffectOptions;

}

