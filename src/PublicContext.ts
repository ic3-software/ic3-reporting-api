import {LazyTreeViewProps} from "./LazyTreeView";
import {ITidyTable} from "./PublicTidyTable";
import {ITidyTableTransformation} from "./ITidyTableTransformation";
import {Theme} from "@mui/material/styles";
import {ThemeFormatters, ThemeTextFormatter} from "./PublicTheme";
import {ITidyColumn, ITidyNumericColumn} from "./PublicTidyColumn";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {ITidyMath} from "./PublicTidyMath";
import {ILogger} from "./Logger";
import {AppNotification} from "./INotification";
import {WidgetNotificationHandler} from "./IcEvent";
import {TidyRowFilter} from "./PublicTidyTableTypes";

export enum WidgetRenderLayoutStatus {
    RENDERING = "RENDERING",
    RENDERED = "RENDERED",
}

export enum WidgetWarningSeverity {
    WARNING,
    ERROR
}

export enum IContentMessageType { info, error}

export interface IPublicContext {

    logger(): ILogger;

    isAppConsole(): boolean;

    isAppReportViewer(): boolean;

    isAppReportEditor(): boolean;

    isAppReportEditorPreview(): boolean;

    isAppReportAppEditor(): boolean;

    isAppGadgetEditor(): boolean;

    /**
     * React, returns true when loaded
     */
    useGoogleMapHook(): boolean | Error;

    getTheme(): Theme;

    /**
     * Return the formatter for the current user's locale.
     */
    getThemeFormatter(): ThemeFormatters;

    getUserName(): string;

    getReportName(): string;

    getReportPath(): string;

    getReportFolderName(): string;

    getReportLocale(): string;

    /**
     * @param format Formatter. Defaults to `defaultNumber` from the theme.
     */
    getNumberFormatter(format: ThemeTextFormatter | null | undefined): (value: any | undefined) => string;

    /**
     * @param format Formatter. Defaults to `defaultDate` or `defaultDatetime` from the theme.
     */
    getDateFormatter(format: ThemeTextFormatter | null | undefined): (value: any | undefined) => string;

    /**
     * translate the content of a report (the title of widgets, content of some widgets...). This does use another file
     *
     * aka content localization
     */
    translateContent(content: string, ...args: any[]): string;

    /**
     * localized report application tags (e.g. edit, write, save.. )
     */
    localize(name: string, ...args: any[]): string;

    /**
     * localized report application error tags
     */
    localizeError(name: string, ...args: any[]): string;

    /**
     * Localization for transformations
     */
    localizeTransformationCaption(template: ITidyTableTransformation<any>): { info: string, description?: string };

    localizeFormField(pluginId: string, widgetTemplateId: string, name: string, ...args: any[]): [string, string | undefined, string | undefined];

    /**
     * markdown to sanitized html
     */
    markdownToHtml(markDown: string): string;

    /**
     * A bunch of mathematical functions related to the tidy table.
     */
    tidyMath(): ITidyMath;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableRowTextExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableTextExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, isRowSelected?: TidyRowFilter): (() => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableRowMarkdownExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableMarkdownExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableRowNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * same as  createTableRowNumericExpr but returning a string
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableRowNumericStringExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string | undefined) | undefined;

    /*
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableScaleRowNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     * @param selectedColumns get the row of these columns using `_rowOfSelectedColumns` or `_selectedColumns`.
     * @param isRowSelected function for usage with `totalSelectedOrTotal`. Use tableInter.isSelected(rowIdx).
     */
    createTableNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => number | undefined) | undefined;

    /**
     * same as  createTableNumericExpr but returning a javascript object
     */
    createTableNumericStringExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => any | undefined) | undefined;


    /**
     * same as  createTableNumericExpr but returning a javascript object
     */
    createTableNumericJSExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => any | undefined) | undefined;

    /**
     * Event methods that do not depend on a Table
     *
     * @see ITidyTableInteractionEvent for more
     */

    /**
     * actionName if the action is bound to a channel, clears the event (has no value)
     */
    fireClearEventName(actionName: string): void;

    /**
     * actionName if the action is bound to a channel, send an Mdx Event (value,mdx)
     */
    fireMdxEventName(actionName: string, value: string, mdx: string): void;

    /**
     * Used for publishing app notifications (e.g., print the report).
     */
    fireAppNotification(notification: AppNotification): void;

    formatDate(value: Date | string | undefined | null, format: ThemeTextFormatter | null | undefined, locale?: string): string;

    formatNumber(value: number | string | undefined | null, format: ThemeTextFormatter | null | undefined, locale?: string): string;

    /**
     * A shortcut for formatNumber( theme.formatter.defaultNumber )
     */
    formatAmount(value: number | string | undefined | null, locale?: string): string;

    /**
     * A shortcut for formatNumber( theme.formatter.defaultPercent )
     */
    formatPercent(value: number | string | undefined | null, locale?: string): string;

}

export interface IWidgetStableContext extends IPublicContext {

    getTemplateId(): string;

    getNsId(): string;

    getWidgetId(): string;

    getTemplateId(): string;

    isPrintingMode(): boolean;

    renderWidgetContentMessage(type: IContentMessageType, message: string): any;

    renderLazyTreeView<T>(props: LazyTreeViewProps): T;

    wrapWithTooltip(tooltip: string | undefined, wrappedElement: React.ReactElement): React.ReactElement;

    onWidgetRenderStatusChange(status: WidgetRenderLayoutStatus): void;

    /**
     * Event methods that do not depend on a Table
     *
     * @see ITidyTableInteractionEvent for more
     */

    /**
     * returns true if the actionName in bound to a channel
     */
    firesEvent(actionName: string): boolean;

    /**
     * actionName if the action is bound to a channel, clears the event (has no value)
     */
    fireClearEvent(actionName: string): void;

    /**
     * actionName if the action is bound to a channel, send an Mdx Event (value,mdx)
     */
    fireMdxEvent(actionName: string, value: string, mdx: string): void;

    fireMdxEvents(events: {actionName: string, value: string, mdx: string}[]): void;

    /**
     * Cypress testing purpose, after a rendering of the chart
     */
    incrementWidgetContentRendering(): void;

    getWidgetTemplateDefinition(qualifiedId: string): IPublicWidgetTemplateDefinition<any>;

    resolveWidgetTemplateDefinition(definition: IPublicWidgetTemplateDefinition<any>): Promise<IPublicWidgetTemplateDefinition<any>>;

    /**
     * React -> combines useReduxOwnProps and setReduxOwnProps with a similar syntax to Redux.useState
     *
     * Note it's NOT the initial value but value if undefined
     */
    useReduxOwnPropsState<T>(fieldName: string, valueIfUndefined?: T): [T, (newValue: T | undefined) => void];

    /**
     * React -> useSelector on widgetOwnProps[fieldName]
     */
    useReduxOwnProps<T>(fieldName: string): T;

    /**
     * Redux -> set in Redux value in widgetOwnProps[fieldName]
     */
    setReduxOwnProps(fieldName: string, value: any): void;


    /**
     * Google map
     */

    /**
     * React only, like an use function
     *
     * Loads Google map library with the API key as set
     *
     * return
     *          true when the google map is ready (lib loaded)
     *          error when
     */
    reactUseGoogleMap(): boolean | Error;

    /**
     * React only, like an use function
     *
     * reactUseGoogleMap() + rendered the map into the div referenced by ref with mapOptions
     *
     * @param mapOptions google.maps.MapOptions
     * @param ref ref React.RefObject<HTMLDivElement>
     *
     * return
     *          undefined if loading
     *          {map} google.maps.Map instance when loaded
     *          {error} if loaded on error
     */
    reactUseGoogleMapPlus(mapOptions: any, ref: any): undefined | { map?: any; error?: Error };

    /**
     * Returns latitude and longitude with the same logic as for internal maps
     *
     *
     */
    getMapCoordinates(table: ITidyTable): [ITidyNumericColumn, ITidyNumericColumn] | [];

    getGoogleMapRenderedDelayMS(): number;

    /**
     * Displays an warning icon in the widget header showing the warning when the user hovers the icon.
     * Be sure to clear all warnings before rendering using {@see widgetClearWarnings}
     */
    addWidgetWarning(warning: string, severity?: WidgetWarningSeverity): void;

    /**
     * Clear the warnings in the widget.
     */
    widgetClearWarnings(): void;

    /**
     * Notification
     *
     * like a listener on the components, for React the implementation uses a useEffect, it should
     * NOT be called conditionally.
     */
    useNotification(notifications: WidgetNotificationHandler | WidgetNotificationHandler[], deps: ReadonlyArray<unknown> | undefined): void;

    useUserMenu(handler: (userMenu: string) => any | void, deps: ReadonlyArray<unknown> | undefined): void;

    /**
     * doExport callback is called on each exportToExcel from the userMenu of the widget
     *
     * if the callback returns a tidyTable, this table will be exported
     * if undefined is returned no further action
     *
     * disabled === true, the doExport function is not used
     */
    onExportToExcel(doExport: undefined | ((fileName: string | undefined) => ITidyTable | undefined | null), disabled?: boolean): void;

    exportToExcel(table: ITidyTable, asPivotForExcel: boolean, rows: number[] | undefined): void;

    useUserMenuWidth(): number | undefined;

    /**
     * Get the (translated) file name for exporting. Does not include file extension. Method returns 'export-file'
     * if no file name is found.
     * @param defaultName if not undefined, method returns this.
     * @param defaultFileName
     */
    getExportFileName(defaultFileName?: string): string;


}

export interface IWidgetPublicContext extends IPublicContext {
    /**
     * Context unlikely to change during the lifecycle of a widget
     * more appropriate to use in a React hook context.
     */
    getStableContext(): IWidgetStableContext;

    /**
     * Get the width of the widget box in pixels.
     */
    getWidgetWidth(): number | undefined;

    /**
     * Get the height of the widget box in pixels.
     */
    getWidgetHeight(): number | undefined;

    getWidgetPageNb(): number;

    /**
     * Returns true if and only if the widgets has a header (from the chart box settings).
     */
    widgetHasHeader(): boolean;

    getBoxSettings(): IPublicWidgetBoxSettings | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getTemplateId(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getNsId(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getWidgetId(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getTemplateId(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isPrintingMode(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    renderWidgetContentMessage(type: IContentMessageType, message: string): any;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    renderLazyTreeView<T>(props: LazyTreeViewProps): T;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    wrapWithTooltip(tooltip: string | undefined, wrappedElement: React.ReactElement): React.ReactElement;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    onWidgetRenderStatusChange(status: WidgetRenderLayoutStatus): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    firesEvent(actionName: string): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireClearEvent(actionName: string): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireMdxEvent(actionName: string, value: string, mdx: string): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireMdxEvents(events: { actionName: string, value: string, mdx: string }[]): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    incrementWidgetContentRendering(): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getWidgetTemplateDefinition(qualifiedId: string): IPublicWidgetTemplateDefinition<any>;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    resolveWidgetTemplateDefinition(definition: IPublicWidgetTemplateDefinition<any>): Promise<IPublicWidgetTemplateDefinition<any>>;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useReduxOwnPropsState<T>(fieldName: string, valueIfUndefined?: T): [T, (newValue: T | undefined) => void];

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useReduxOwnProps<T>(fieldName: string): T;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    setReduxOwnProps(fieldName: string, value: any): void;


    /**
     * @deprecated use the method in this.getStableContext()
     */
    reactUseGoogleMap(): boolean | Error;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    reactUseGoogleMapPlus(mapOptions: any, ref: any): undefined | { map?: any; error?: Error };

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getMapCoordinates(table: ITidyTable): [ITidyNumericColumn, ITidyNumericColumn] | [];

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getGoogleMapRenderedDelayMS(): number;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    addWidgetWarning(warning: string, severity?: WidgetWarningSeverity): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    widgetClearWarnings(): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useNotification(notifications: WidgetNotificationHandler | WidgetNotificationHandler[], deps: ReadonlyArray<unknown> | undefined): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useUserMenu(handler: (userMenu: string) => any | void, deps: ReadonlyArray<unknown> | undefined): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    onExportToExcel(doExport: undefined | ((fileName: string | undefined) => ITidyTable | undefined | null), disabled?: boolean): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    exportToExcel(table: ITidyTable, asPivotForExcel: boolean, rows: number[] | undefined): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useUserMenuWidth(): number | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getExportFileName(defaultFileName?: string): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    logger(): ILogger;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppConsole(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppReportViewer(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppReportEditor(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppReportEditorPreview(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppReportAppEditor(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    isAppGadgetEditor(): boolean;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    useGoogleMapHook(): boolean | Error;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getTheme(): Theme;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getThemeFormatter(): ThemeFormatters;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getUserName(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getReportName(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getReportPath(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getReportFolderName(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getReportLocale(): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getNumberFormatter(format: ThemeTextFormatter | null | undefined): (value: any | undefined) => string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    getDateFormatter(format: ThemeTextFormatter | null | undefined): (value: any | undefined) => string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    translateContent(content: string, ...args: any[]): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    localize(name: string, ...args: any[]): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    localizeError(name: string, ...args: any[]): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    localizeTransformationCaption(template: ITidyTableTransformation<any>): { info: string, description?: string };

    /**
     * @deprecated use the method in this.getStableContext()
     */
    localizeFormField(pluginId: string, widgetTemplateId: string, name: string, ...args: any[]): [string, string | undefined, string | undefined];

    /**
     * @deprecated use the method in this.getStableContext()
     */
    markdownToHtml(markDown: string): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    tidyMath(): ITidyMath;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableRowTextExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableTextExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, isRowSelected?: TidyRowFilter): (() => string) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableRowMarkdownExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableMarkdownExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => string) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableRowNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableRowNumericStringExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => string | undefined) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableScaleRowNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableNumericExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => number | undefined) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableNumericStringExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => any | undefined) | undefined;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    createTableNumericJSExpr(field: string, table: ITidyTable, currentColumn: ITidyColumn | undefined, expression: string | undefined, selectedColumns: ITidyColumn[] | undefined, isRowSelected?: TidyRowFilter): (() => any | undefined) | undefined;

    /**
     * Event methods that do not depend on a Table
     *
     * @see ITidyTableInteractionEvent for more
     */

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireClearEventName(actionName: string): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireMdxEventName(actionName: string, value: string, mdx: string): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    fireAppNotification(notification: AppNotification): void;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    formatDate(value: Date | string | undefined | null, format: ThemeTextFormatter | null | undefined, locale?: string): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    formatNumber(value: number | string | undefined | null, format: ThemeTextFormatter | null | undefined, locale?: string): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    formatAmount(value: number | string | undefined | null, locale?: string): string;

    /**
     * @deprecated use the method in this.getStableContext()
     */
    formatPercent(value: number | string | undefined | null, locale?: string): string;


}

export interface IPublicWidgetBoxSettings {
    widgetId: string;
    waitingEventOrResult?: string;
    emptyResult?: string;
}

export interface IWidgetEditorPublicContext {

    /**
     * The variants available in the theme for the edited widget.
     */
    getWidgetVariantIds(componentName?: string): string[];

}