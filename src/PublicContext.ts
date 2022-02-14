import {LazyTreeViewProps} from "./LazyTreeView";
import {ITidyTable} from "./PublicTidyTable";
import {ITidyTableTransformation} from "./ITidyTableTransformation";
import {Theme} from "@mui/material/styles";
import {ThemeTextFormatter} from "./PublicTheme";
import {ITidyColumn} from "./PublicTidyColumn";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {ITidyMath} from "./PublicTidyMath";

export enum WidgetRenderLayoutStatus {
    RENDERING = "RENDERING",
    RENDERED = "RENDERED",
}

export enum IContentMessageType { info, error}

export interface IPublicContext {

    /**
     * React
     */
    useGoogleMapHook(): boolean | Error;

    getTheme(): Theme;

    getUserName(): string;

    getReportLocale(): string;

    getNumberFormatter(format: ThemeTextFormatter): (value: any | undefined) => string;

    /**
     * translate the content of a report (the title of widgets, content of some widgets...). This does use another file
     *
     * aka content localization
     */
    translateContent(content: string): string;

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
     */
    createTableRowTextExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): ((rowIdx: number) => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     */
    createTableTextExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): (() => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     */
    createTableRowMarkdownExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): ((rowIdx: number) => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     */
    createTableMarkdownExpr(field: string, table: ITidyTable, expression: string | undefined): (() => string) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     */
    createTableRowNumericExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * same as  createTableRowNumericExpr but returning a string
     */
    createTableRowNumericStringExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): ((rowIdx: number) => string | undefined) | undefined;

    createTableScaleRowNumericExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): ((rowIdx: number) => number | undefined) | undefined;

    /**
     * Not in widget public context because of transformation not applied from a widget context always.
     *
     * @param expression typically coming from a widget field so it cannot be null if there is a default value.
     * To prevent usage of the default, pass an "empty" string that makes this method returns
     * undefined.
     */
    createTableNumericExpr(field: string, table: ITidyTable, defaultColumn: ITidyColumn | undefined, expression: string | undefined): (() => number | undefined) | undefined;


}

export interface IWidgetPublicContext extends IPublicContext {

    getNsId(): string;

    getWidgetId(): string;

    getTemplateId(): string;

    getWidgetPageId(): string;

    isPrintingMode(): boolean;

    getGoogleMapRenderedDelayMS(): number;

    logInfoWidget(component: string, message: string): void;

    renderWidgetContentMessage(type: IContentMessageType, message: string): any;

    renderLazyTreeView<T>(props: LazyTreeViewProps): T;

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

    wrapWithTooltip(tooltip: string | undefined, wrappedElement: React.ReactElement): React.ReactElement;

    /**
     * Allows to setup a template specific callback on userMenuAction (e.g. setZoom in GoogleMaps action)
     *
     * if the callback returns an object, the object should contains a record with new values for the
     * template form fields, FormFieldDef (i.e.  {zoom:14} to set the zoom to 14). If in editing mode,
     * the edited options in the widget editor panel will be updated.
     */
    onUserMenuAction(callback: (userMenuAction: string, event: any) => Record<string, any> | undefined): void;

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
    useReduxOwnPropsState<T>(fieldName: string, valueIfUndefined?: T): [T, (newValue: T) => void];

    /**
     * React -> useSelector on widgetOwnProps[fieldName]
     */
    useReduxOwnProps<T>(fieldName: string): T;

    /**
     * Redux -> set in Redux value in widgetOwnProps[fieldName]
     */
    setReduxOwnProps(fieldName: string, value: any): void;
}

export interface IWidgetEditorPublicContext {

    /**
     * The variants available in the theme for the edited widget.
     */
    getWidgetVariantIds(componentName?: string): string[];

}