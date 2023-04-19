import {FormFieldObject} from "../PublicTemplateForm";
import {TableRowHeightOptions} from "../PublicTheme";

export enum TableColumnSizing {
    FLUID = "FLUID",
    FIXED = "FIXED",
    USER_RESIZABLE = "USER_RESIZABLE",
}

export interface BaseTableChartOptions extends FormFieldObject {

    /**
     * If active, the color defined in the Tidy Table are applied to the table
     */
    applyHeaderColorDecoration?: boolean;

    /**
     * Row Height.
     */
    tableSize: TableRowHeightOptions;

    /**
     * Width Mode.
     */
    columnSizing: TableColumnSizing;

    /**
     * The column widths when columnSizing == FLUID
     *
     * A comma separated list of column widths. Defines how the columns will grow compared to other columns
     * (e.g., 2 means twice as wide as 1). The last value repeats itself.
     */
    columnSizes_FLUID?: string;

    /**
     * The column widths when columnSizing == FIXED
     *
     * A comma separated list of column widths. The widths are defined in pixels (without the 'px'). Without any value,
     * similar to the Fluid mode. The 'auto' value means the columns are shrunk to the minimum width required by the
     * cell values and then expanded to fill all the available horizontal space. The last value repeats itself.
     */
    columnSizes_FIXED?: string;

    /**
     * The column widths when columnSizing == USER_RESIZABLE
     *
     * A comma separated list of column widths. The widths are defined in pixels (without the 'px'). Without any value,
     * similar to the Fluid mode. The 'auto' value means the columns are shrunk to the minimum width required by the
     * cell values and then expanded to fill all the available horizontal space. The last value repeats itself.
     */
    columnSizes_USER_RESIZABLE?: string;

    /**
     * Header Alignment (CSV).
     *
     * A comma separated list of values:  'left', 'center', 'right'. The last value repeats itself.
     */
    columnHeaderAlign: string;

    /**
     * Cell Alignment (CSV).
     *
     * A list of values: 'left', 'center', 'right'. The last value repeats itself.
     */
    columnCellAlign: string;

    /**
     * Pinned (CSV).
     *
     * A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnPinned: string;

    /**
     * Visible (CSV).
     *
     * A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnVisible: string;
    /**
     * Columns Header Menu.
     *
     * Activate the options of the menu in the header of the columns.
     */
    columnHeaderMenu: boolean;

    /**
     * Menu (CSV).
     *
     * A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnMenu: string;

    /**
     * Sortable (CSV).
     *
     * Display the sort options. A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnSortable: string;

    /**
     * Column Ordering (CSV).
     *
     * A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnOrdering: string;

    /**
     * Pinnable (CSV).
     *
     * Display the pin options. A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnPinnable: string;

    /**
     * Hideable (CSV).
     *
     * Display the show/hide options. A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnHideable: string;

    /**
     * Filterable (CSV).
     *
     * Display the filter options. A list of boolean values: 'true', 'false'. The last value repeats itself.
     */
    columnFilterable: string;

    /**
     * When exporting to excel, flag use the filtered and sorted version or the orignal table
     */
    exportOriginalTable: boolean;
}
