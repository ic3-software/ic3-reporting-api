import {SelectionBehaviour, WidgetTidySelectionOptions} from "./PublicTidyTableTypes";
import {ITidyBaseColumn, ITidyColumn} from "./PublicTidyColumn";
import {ILazyTreeViewLoader} from "./LazyTreeView";
import {PublicIcEvent} from "./IcEvent";
import {Theme} from "@mui/material/styles";
import {MdxNodeIdentifier} from "./PublicTidyTable";

export enum SelectionMode {
    /**
     * User can only select one item.
     */
    SINGLE = 'SINGLE',

    /**
     * User can select multiple items.
     */
    MULTIPLE = 'MULTIPLE'
}

export enum TreeFireEventMode {
    ALL_SELECTED = 'ALL_SELECTED',
    /**
     * if all children are selected,  fire only the parent
     */
    COMPACT_ON_PARENT = 'COMPACT_ON_PARENT'
}


export enum TidyPivotTableLikeNodeStatus {
    COLLAPSED,
    EXPANDED,
    NO_CHILDREN_OR_DRILLDOWN,
    WITH_DRILLDOWN,
    LOADING
}

export type TidyEvent = MouseEvent | TouchEvent;

export type IWidgetInteractionMode = "drilldown" | "selection";

export interface ITidyTableInteractionSelection {

    /**
     * Sets the selection at the creation of the widget
     */
    initializeSelection(isRangeSelection?: boolean): void;

    /**
     * Returns true if the selection if empty. Returns false otherwise.
     */
    isSelectionEmpty(): boolean;

    firstIdxSelected(): number | undefined;

    /**
     * A row is selected if all cells in the row are selected
     * @param rowIdx the index of the row
     */
    isSelected(rowIdx: number): boolean;

    /**
     * Returns true if and only if the column is selected.
     * @param colIdx index of the column in the tidy table.
     * @param hierIdx optional. Use to check if the hierarchy index is selected. Leave undefined to check the column.
     */
    isColumnSelected(colIdx: number, hierIdx?: number): boolean;

    /**
     * Returns true if and only if the cell is selected.
     * @param rowIdx
     */
    isCellSelected(rowIdx: number, colIdx: number): boolean;

    /**
     * For the sankey diagram, a row is selected if connecting nodes are in the selection.
     * @param rowIdx the index of the row
     * @param column selection should be in this column
     */
    isSelectedSankey(rowIdx: number, column: ITidyColumn): boolean;

    /**
     * map function on selected rows
     */
    mapSelectedRows<T>(callback: (rowIdx: number) => T | null | undefined): T[];

    /**
     * Creates a new Column of size Table row count with the following values
     *
     * @param selectedItemValue  if the row is selected
     * @param notSelectedItemValue  if the row is not selected
     * @param noSelectionValue   if defined an the selection is empty, all row values have this value
     */
    applySelectionToNewColumn<T>(selectedItemValue: T, notSelectedItemValue: T, noSelectionValue?: T): ITidyBaseColumn<T>;

    /**
     * Handles the row click event for the selection
     * @param rowIdx index of row clicked
     * @param event the mouse event of the click
     */
    handleClickSelection(rowIdx: number, event?: TidyEvent): void;

    /**
     * Handles the click event for the selection on a given column.
     *
     * If the column is not part of the selection columns of the widget nothing will happen
     *
     * @param column column index of the tidy table
     * @param event the mouse event of the click
     */
    handleColumnSelection(colIdx: number, event?: TidyEvent): void;

    /**
     * Handles the click event for the selection of a given cell
     *
     * If the columns is not part of the selection columns of the widget nothing will happen
     *
     * @param rowIdx row index of clicked cell in the tidy table
     * @param colIdx column index of clicked cell in the tidy table
     * @param event the mouse event of the click
     */
    handleCellSelection(rowIdx: number, colIdx: number, event?: TidyEvent): void;

    /**
     * Get the interaction mode:
     * undefined = no interactions in the widget,
     * selection = perform selection interaction,
     * drilldown = perform drilldown interaction.
     */
    getInteractionMode(): IWidgetInteractionMode | undefined;

    getColorOnSelection(theme: Theme, color: string | undefined, rowIdx: number): string | undefined;

    /**
     * Select multiple rows at once
     */
    handleMultipleRowSelection(rowIds: number[]): void;

    /**
     * Clear the selection and fire an empty event value. Note, this resets the
     * selection to the initial selection.
     */
    handleClearSelection(): void;

    /**
     * Get the selection mode (single or multiple) of the interaction object.
     */
    getSelectionMode(): SelectionMode;

    /**
     * Set the selection mode of the interaction.
     * @param mode
     */
    setSelectionMode(mode: SelectionMode): void;

    /**
     * Set the selection behaviour for when the selection is empty.
     * @param behaviour
     */
    setSelectionEmptyBehaviour(behaviour: SelectionBehaviour): void;

    setSelectionAllBehaviour(behaviour: SelectionBehaviour): void;

    /**
     * If the selection is on a tree, this determines how the fired event is optimized for the
     * tree structure. Collapsed means that if all children are selected, we only use the parent. Children means
     * that we use leaves only. All means that we fire both parent and child nodes.
     * @param mode
     */
    setTreeFireEventMode(mode: TreeFireEventMode): void;

    setTreeCascade(value: boolean): void;

    /**
     * the selection will treat a click without ctr or shift as with a ctr key pressed  (e.g. check boxes)
     */
    setNoKeyModifierAsCtrl(value?: boolean): void;

    /**
     * Set to true to enable selection on the interaction object.
     * @param enabled if true, the selection is enabled. If false, the interaction object does not respond to
     * methods setting the selection (e.g. click).
     */
    setSelectionActive(enabled?: boolean): void;

    /**
     * Returns true if the selection is activated, e.g. the interaction object responds to click and other selection
     * events.
     */
    isSelectionActive(): boolean;
}


export interface ITidyTableDrilldown {

    handleDrilldown(rowIdx: number, event: TidyEvent | undefined, stopDrillDownDepth?: number): void;

    hasDrilldown(): boolean;

    hasNodeDrilldown(nodeInfo: MdxNodeIdentifier, stopDrillDownDepth?: number): boolean;
}

export interface ITidyTableInteractionEvent {

    /**
     * actionName if the action is bound to a channel, sends the events ( e.g. 'onClick' to the channel 'year' )
     */
    fireEvent(actionName: string, column: ITidyColumn | ITidyColumn[] | undefined, rowIdx: number | number[]): void;

    fireClearEvent(actionName: string): void;

    /**
     * actionName if the action is bound to a channel, sends the emptySet event, ∅
     */
    fireEmptySetEvent(actionName: string): void;

    /**
     * actionName if the action is bound to a channel, send an Mdx Event (value,mdx)
     */
    fireMdxEvent(actionName: string, value: string, mdx: string): void;

    /**
     * returns the value of the event
     */
    getEventValue(actionName: string): PublicIcEvent | undefined;

    /**
     * returns true if the actionName in bound to a channel
     */
    firesEvent(actionName: string): boolean;

    /**
     * register a callback that will be called each time an event is send to the channel bound to the actionName
     */
    onNotification(actionName: string, callback: (event: any) => void): void;
}

export interface ITidyTableInteraction extends ITidyTableInteractionSelection, ITidyTableInteractionEvent, ITidyTableDrilldown {

    /**
     * Handles a row hit/click, doing a selection or a drilldown depending on the widget status
     *
     * The column(s) for the selection or the drilldown are based on the widget options/settings
     *
     * This does not fire any event. To fire an event, use fireEvent.
     *
     * @see fireEvent
     */
    handleRowHit(rowIdx: number, event: TidyEvent | undefined): void;

    /**
     * Handles a cell click in the tidy table.
     * @param rowIdx row index of the cell
     * @param colIdx column index of the cell
     * @param event mouse/touch event
     *
     * @see handleRowHit
     */
    handleCellHit(rowIdx: number, colIdx: number, event: TidyEvent | undefined): void;

    /**
     * Handles a column click in the tidy table.
     * @param colIdx index of clicked column in the tidy table
     * @param event mouse/touch event
     *
     * @see handleRowHit
     */
    handleColumnHit(colIdx: number, event: TidyEvent | undefined):void;

    /**
     * Handles a row hit for the sankey diagram. The sankey differs from normal selection because it makes a tuple,
     * not a set.
     */
    handleRowHitSankey(rowIdx: number, column: ITidyColumn, event: TidyEvent | undefined): void;

    /**
     * Collapsed / Expand on a column row (i.e. it's a tree)
     */
    toggleCollapse(column: ITidyColumn, rowIdx: number): void;

    /**
     * returns the collapse/expand state that has not yet been set by the end user (i.e. first time, on drilldowns..)
     */
    setCollapseUnsetFunction(collapseUnsetFunction?: (nodeInfo: MdxNodeIdentifier) => boolean): void;

    /**
     * Map a function to the visible rows only. Used in tree structures with expanded or collapsed items.
     * @param column column to map the values of
     * @param mapper function
     * @param inverse per default, all items are expanded. If inverse is true, all items are collapsed per default.
     */
    mapVisibleRows<T>(column: ITidyColumn, mapper: (index: number) => T, inverse?: boolean): T[];

    // mapTreeVisibleRows<T extends ReactElement>(column: ITidyColumn, mapper: (index: number) => T, filter?: (info: MdxInfo) => boolean): T[];

    isCollapsed(column: ITidyColumn, rowIdx: number): boolean;

    /**
     * Is the node loading
     */
    isLoading(column: ITidyColumn, rowIdx: number): boolean;

    setSelectionColumns(columns: ITidyColumn[] | ((oldColumns: ITidyColumn[]) => ITidyColumn[])): void;

    /**
     * Change the default drilldown column.
     * @param column column to use for the drill-downs. Use undefined to reset to default.
     */
    setDrilldownColumn(column: ITidyColumn | undefined): void;

    /**
     * Pivot Type behavior ( nodes can collapse/expand + drilldown might return some values)
     *
     * pay attention that the query needs to set the flag, pivot table like (to insert data)
     */
    pivotTableLikeDrilldown(event: TidyEvent, column: ITidyColumn, rowIdx: number, stopDrillDownDepth?: number): void;

    pivotTableLikeDrilldownOnNode(event: TidyEvent, nodeInfo: MdxNodeIdentifier, stopDrillDownDepth?: number): void;

    pivotTableLikeNodeStatus(column: ITidyColumn, rowIdx: number, stopDrillDownDepth?: number): TidyPivotTableLikeNodeStatus;

    asLazyTreeViewLoader(column: ITidyColumn): ILazyTreeViewLoader;

    getCompactedSelectionNames(): string[] | undefined;

    /**
     * Returns true if the column is used for the row selection.
     */
    isSelectable(col: ITidyColumn): boolean;

    isHierarchyIdxSelectable(hierIndex: number): boolean;

    getSelectedRows(): number[];

    // Sort the selection by column-values order if multiple are selected? Tree -> true
    setSortSelectionToColumnOrder(value: boolean): void;

    /**
     * Returns the widgets selection options.
     */
    getWidgetSelectionOptions(): WidgetTidySelectionOptions;
}

