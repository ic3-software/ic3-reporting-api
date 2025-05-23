import {BaseTableChartOptions} from "./ThemeBaseTable";

/**
 * List of classNames available
 */
export declare type TableClassKey = keyof TableClasses;


/**
 * All props of Mui-DataGridPro ( + variant )
 *
 * GridClasses
 *
 * https://mui.com/api/data-grid/data-grid-pro/
 */
export interface TableProps {

    noHeader: boolean;
    variant?: string;
    printing: boolean;
}


/**
 * Copy of
 * MUI CSS :  https://mui.com/api/data-grid/data-grid-pro/#css
 */
export class TableClasses {
    /* 	Styles applied to the root element if autoHeight={true}. */
    static readonly 'autoHeight' = "MuiDataGrid-autoHeight";
    /* 	Styles applied to the icon of the boolean cell. */
    static readonly 'booleanCell' = "MuiDataGrid-booleanCell";
    /* 	Styles applied to the cell element if the cell is editable. */
    static readonly 'cell--editable' = "MuiDataGrid-cell--editable";
    /* 	Styles applied to the cell element if the cell is in edit mode. */
    static readonly 'cell--editing' = "MuiDataGrid-cell--editing";
    /* 	Styles applied to the cell element if align="center". */
    static readonly 'cell--textCenter' = "MuiDataGrid-cell--textCenter";
    /* 	Styles applied to the cell element if align="left". */
    static readonly 'cell--textLeft' = "MuiDataGrid-cell--textLeft";
    /* 	Styles applied to the cell element if align="right". */
    static readonly 'cell--textRight' = "MuiDataGrid-cell--textRight";
    /* 	Styles applied to the cell element. */
    static readonly 'cell' = "MuiDataGrid-cell";
    /* 	Styles applied to the cell checkbox element. */
    static readonly 'cellCheckbox' = "MuiDataGrid-cellCheckbox";
    /* 	Styles applied to the selection checkbox element. */
    static readonly 'checkboxInput' = "MuiDataGrid-checkboxInput";
    /* 	Styles applied to the column header if headerAlign="center". */
    static readonly 'columnHeader--alignCenter' = "MuiDataGrid-columnHeader--alignCenter";
    /* 	Styles applied to the column header if headerAlign="left". */
    static readonly 'columnHeader--alignLeft' = "MuiDataGrid-columnHeader--alignLeft";
    /* 	Styles applied to the column header if headerAlign="right". */
    static readonly 'columnHeader--alignRight' = "MuiDataGrid-columnHeader--alignRight";
    /* 	Styles applied to the floating column header element when it is dragged. */
    static readonly 'columnHeader--dragging' = "MuiDataGrid-columnHeader--dragging";
    /* 	Styles applied to the column header if it is being dragged. */
    static readonly 'columnHeader--moving' = "MuiDataGrid-columnHeader--moving";
    /* 	Styles applied to the column header if the type of the column is number. */
    static readonly 'columnHeader--numeric' = "MuiDataGrid-columnHeader--numeric";
    /* 	Styles applied to the column header if the column is sortable. */
    static readonly 'columnHeader--sortable' = "MuiDataGrid-columnHeader--sortable";
    /* 	Styles applied to the column header if the column is sorted. */
    static readonly 'columnHeader--sorted' = "MuiDataGrid-columnHeader--sorted";
    /* 	Styles applied to the column header element. */
    static readonly 'columnHeader' = "MuiDataGrid-columnHeader";
    /* 	Styles applied to the header checkbox cell element. */
    static readonly 'columnHeaderCheckbox' = "MuiDataGrid-columnHeaderCheckbox";
    /* 	Styles applied to the column header's draggable container element. */
    static readonly 'columnHeaderDraggableContainer' = "MuiDataGrid-columnHeaderDraggableContainer";
    /* 	Styles applied to the column headers wrapper if a column is being dragged. */
    static readonly 'columnHeaderDropZone' = "MuiDataGrid-columnHeaderDropZone";
    /* 	Styles applied to the column header's title element; */
    static readonly 'columnHeaderTitle' = "MuiDataGrid-columnHeaderTitle";
    /* 	Styles applied to the column header's title container element. */
    static readonly 'columnHeaderTitleContainer' = "MuiDataGrid-columnHeaderTitleContainer";
    /* 	Styles applied to the column headers. */
    static readonly 'columnHeaders' = "MuiDataGrid-columnHeaders";
    /* 	Styles applied to the column header separator if the column is resizable. */
    static readonly 'columnSeparator--resizable' = "MuiDataGrid-columnSeparator--resizable";
    /* 	Styles applied to the column header separator if the column is being resized. */
    static readonly 'columnSeparator--resizing' = "MuiDataGrid-columnSeparator--resizing";
    /* 	Styles applied to the column header separator if the side is "left". */
    static readonly 'columnSeparator--sideLeft' = "MuiDataGrid-columnSeparator--sideLeft";
    /* 	Styles applied to the column header separator if the side is "right". */
    static readonly 'columnSeparator--sideRight' = "MuiDataGrid-columnSeparator--sideRight";
    /* 	Styles applied to the column header separator element. */
    static readonly 'columnSeparator' = "MuiDataGrid-columnSeparator";
    /* 	Styles applied to the columns panel element. */
    static readonly 'columnsPanel' = "MuiDataGrid-columnsPanel";
    /* 	Styles applied to the columns panel row element. */
    static readonly 'columnsPanelRow' = "MuiDataGrid-columnsPanelRow";
    /* 	Styles applied to the panel element. */
    static readonly 'panel' = "MuiDataGrid-panel";
    /* 	Styles applied to the panel header element. */
    static readonly 'panelHeader' = "MuiDataGrid-panelHeader";
    /* 	Styles applied to the panel wrapper element. */
    static readonly 'panelWrapper' = "MuiDataGrid-panelWrapper";
    /* 	Styles applied to the panel content element. */
    static readonly 'panelContent' = "MuiDataGrid-panelContent";
    /* 	Styles applied to the panel footer element. */
    static readonly 'panelFooter' = "MuiDataGrid-panelFooter";
    /* 	Styles applied to the paper element. */
    static readonly 'paper' = "MuiDataGrid-paper";
    /* 	Styles applied to root of the boolean edit component. */
    static readonly 'editBooleanCell' = "MuiDataGrid-editBooleanCell";
    /* 	Styles applied to the root of the filter form component. */
    static readonly 'filterForm' = "MuiDataGrid-filterForm";
    /* 	Styles applied to the root of the input component. */
    static readonly 'editInputCell' = "MuiDataGrid-editInputCell";
    /* 	Styles applied to the filter icon element. */
    static readonly 'filterIcon' = "MuiDataGrid-filterIcon";
    /* 	Styles applied to the footer container element. */
    static readonly 'footerContainer' = "MuiDataGrid-footerContainer";
    /* 	Styles applied to the column header icon's container. */
    static readonly 'iconButtonContainer' = "MuiDataGrid-iconButtonContainer";
    /* 	Styles applied to the column header separator icon element. */
    static readonly 'iconSeparator' = "MuiDataGrid-iconSeparator";
    /* 	Styles applied to the main container element. */
    static readonly 'main' = "MuiDataGrid-main";
    /* 	Styles applied to the menu element. */
    static readonly 'menu' = "MuiDataGrid-menu";
    /* 	Styles applied to the menu icon element. */
    static readonly 'menuIcon' = "MuiDataGrid-menuIcon";
    /* 	Styles applied to the menu icon button element. */
    static readonly 'menuIconButton' = "MuiDataGrid-menuIconButton";
    /* 	Styles applied to the menu icon element if the menu is open. */
    static readonly 'menuOpen' = "MuiDataGrid-menuOpen";
    /* 	Styles applied to the menu list element. */
    static readonly 'menuList' = "MuiDataGrid-menuList";
    /* 	Styles applied to the overlay element. */
    static readonly 'overlay' = "MuiDataGrid-overlay";
    /* 	Styles applied to the virtualization container. */
    static readonly 'virtualScroller' = "MuiDataGrid-virtualScroller";
    /* 	Styles applied to the virtualization content. */
    static readonly 'virtualScrollerContent' = "MuiDataGrid-virtualScrollerContent";
    /* 	Styles applied to the virtualization render zone. */
    static readonly 'virtualScrollerRenderZone' = "MuiDataGrid-virtualScrollerRenderZone";
    /* 	Styles applied to the pinned columns. */
    static readonly 'pinnedColumns' = "MuiDataGrid-pinnedColumns";
    /* 	Styles applied to the left pinned columns. */
    static readonly 'pinnedColumns--left' = "MuiDataGrid-pinnedColumns--left";
    /* 	Styles applied to the right pinned columns. */
    static readonly 'pinnedColumns--right' = "MuiDataGrid-pinnedColumns--right";
    /* 	Styles applied to the root element. */
    static readonly 'root' = "MuiDataGrid-root";
    /* 	Styles applied to the row element if the row is editable. */
    static readonly 'row--editable' = "MuiDataGrid-row--editable";
    /* 	Styles applied to the row element if the row is in edit mode. */
    static readonly 'row--editing' = "MuiDataGrid-row--editing";
    /* 	Styles applied to the row element. */
    static readonly 'row' = "MuiDataGrid-row";
    /* 	Styles applied to the footer row count element to show the total number of rows. Only works when pagination is disabled. */
    static readonly 'rowCount' = "MuiDataGrid-rowCount";
    /* 	Styles applied to both scroll area elements. */
    static readonly 'scrollArea' = "MuiDataGrid-scrollArea";
    /* 	Styles applied to the left scroll area element. */
    static readonly 'scrollArea--left' = "MuiDataGrid-scrollArea--left";
    /* 	Styles applied to the right scroll area element. */
    static readonly 'scrollArea--right' = "MuiDataGrid-scrollArea--right";
    /* 	Styles applied to the footer selected row count element. */
    static readonly 'selectedRowCount' = "MuiDataGrid-selectedRowCount";
    /* 	Styles applied to the sort icon element. */
    static readonly 'sortIcon' = "MuiDataGrid-sortIcon";
    /* 	Styles applied to the toolbar container element. */
    static readonly 'toolbarContainer' = "MuiDataGrid-toolbarContainer";
    /* 	Styles applied to the toolbar filter list element. */
    static readonly 'toolbarFilterList' = "MuiDataGrid-toolbarFilterList";
    /* 	Styles applied to both the cell and the column header if showColumnRightBorder={true}. */
    static readonly 'withBorder' = "MuiDataGrid-withBorder";
    /* 	Styles applied to the root of the grouping column of the tree data. */
    static readonly 'treeDataGroupingCell' = "MuiDataGrid-treeDataGroupingCell";
    /* 	Styles applied to the toggle of the grouping column of the tree data. */
    static readonly 'treeDataGroupingCellToggle' = "MuiDataGrid-treeDataGroupingCellToggle";

}

/**
 * Table Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: Table
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface TableChartOptions extends BaseTableChartOptions {

    /**
     * Name of a variant. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * Footer.
     *
     * Display a footer. Does not apply when the table is auto-expanding vertically.
     */
    footer: boolean;

    /**
     * Add Pagination.
     *
     * Incompatible with 'Row Count' and/or 'Selected Row Count' settings.
     */
    footerPagination: boolean;

    /**
     * Add Row Count.
     *
     * Incompatible with 'Pagination'.
     */
    footerRowCount: boolean;

    /**
     * Page Size.
     *
     * Set the initial number of rows in one page.
     */
    pageSize: number;

    /**
     * Page Size Options (CSV).
     *
     * Select the 'Page Size' dynamically using the component UI. A comma separated list of integer values.
     *
     * E.g., 10,20,50
     */
    rowsPerPageOptions: string;

    /**
     * Use column header groups.
     */
    useColumnGrouping: boolean;

    /**
     * Use checkbox selection. Adds a column with checkboxes as the first column.
     */
    useCheckboxSelection: boolean;

    /**
     * Show the first column as a hierarchy instead of a flat list.
     */
    showHierarchy: boolean;

    /**
     * MDX Console support for now.
     */
    showRowNumbers?: boolean;

}
