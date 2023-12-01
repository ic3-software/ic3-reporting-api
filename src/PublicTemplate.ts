import {ITidyTable} from "./PublicTidyTable";
import {ITidyTableInteraction} from "./PublicTidyTableInteractions";
import {IWidgetPublicContext} from "./PublicContext";
import {FormFieldObject, FormFields, IFormColumnChooserFieldDef} from "./PublicTemplateForm";
import {IWidgetVariantManager} from "./IWidgetVariantManager";
import {ReactElement} from "react";
import {Theme} from "@mui/material/styles";
import {WidgetTemplateChartOptions, WidgetTemplateIDs} from "./PublicTemplates";
import {ChartTemplateDataMapping, IFormFieldGranularityItem} from "./PublicTidyTableTypes";
import {ResizingConstraintOptions} from "./theme/ThemeWidgetBox";
import {QueryType} from "./ITypes";
import {ILogger} from "./Logger";

export interface IRectanglePosition {
    top: number;
    left: number;
}

export interface IRectangleSize {
    height: number;
    width: number;
}

export interface IRectangle extends IRectanglePosition, IRectangleSize {
}

/**
 * Widget box configuration when the widget is rendered in the responsive grid layout.
 * This is used instead of the regular rectangle and positionOrder configuration.
 */
export interface IWidgetBoxGridLayoutInfo {

    /**
     * Handy (same as in IWidgetDefinition).
     */
    widgetId: string;

    /**
     * The responsive grid layout is made of a single flex (row) box.
     * The index in the only row of the 'flex' layout.
     */
    position: number;

    /**
     * A part of the total number of columns in the 'flex' layout.
     */
    colSpan: number;

    /**
     * The actual physical height.
     */
    height: number;

    /**
     * The group (i.e., nested grid layout) this widget belongs to.
     */
    group?: IWidgetBoxGroupGridLayoutInfo;

}

/**
 * Support for nested grid layout : a grid item can be a group of widgets rendered as a grid layout.
 *
 * The actual number of columns of this nested grid layout is the colSpan of the group seen as a regular
 * item of the containing grid layout. The group inherit both the column and row spacing of its containing
 * grid layout and has no margin.
 *
 * For the sake of simplicity a group cannot contain a group.
 */
export interface IWidgetBoxGroupGridLayoutInfo {

    groupId: string;

    /**
     * A group is a regular item of its containing grid layout.
     * @see IWidgetBoxGridLayoutInfo
     */
    position: number;

    /**
     * A group is a regular item of its containing grid layout.
     * @see IWidgetBoxGridLayoutInfo
     */
    colSpan: number;

    /**
     * A group is a regular item of its containing grid layout.
     * @see IWidgetBoxGridLayoutInfo
     */
    height: number;

}

export interface IWidgetLayoutData {

    /**
     * Keep box header settings for additional (i.e., generated) pages.
     */
    keepBoxHeader: boolean;

    /**
     * Keep box header settings for additional (i.e., generated) pages.
     */
    keepTableHeader: boolean;

    startRow: number;
    endRow: number;

}

export interface IWidgetLayoutInfo extends IRectangle {

    pageNb: number;

    positionOrder: number;

    gridLayoutInfo?: IWidgetBoxGridLayoutInfo;

    data?: IWidgetLayoutData;

    resizingConstraint?: ResizingConstraintOptions;

    /**
     * When _ printing _, the widget's layout has been converted and this scale has been applied to compute
     * the new widget size.
     */
    widgetContentScaled?: number;

}

export type IPublicWidgetTemplateDefinition<T extends FormFieldObject> =
    IPublicWidgetReactTemplateDefinition<T> | IPublicWidgetJsTemplateDefinition<T>;

export enum IWidgetTemplateMdxBuilderAxisPropsConstraint {
    DateType = 'DateType',
    GeoLatLong = 'GeoLatLong',
    GeoIso2Code = 'GeoIso2Code',
}

export interface IWidgetTemplateMdxBuilderAxisProps {

    /**
     * Unique name used in the UI and if mdxAxisName not defined for building the query.
     * If name is 'rows' for example, then in the query it will use 'ON "rows"'.
     */
    name: string,

    /**
     * The axis can be empty
     */
    isOptional?: true;

    /**
     * All axes with the same (not null) value for mdxAxisName are put as a tuple on the same axis. And the roles are
     * comma separated.
     */
    mdxAxisName?: string,

    /**
     * Disable empty
     */
    disableNonEmpty?: true;

    /**
     * For filters add lazy load feature to the axis.
     */
    withLazySearch?: true;

    /**
     * Allow only a single member
     */
    singleMember?: true,

    /**
     * Allow a multiple hierarchies to build a crossjoin
     */
    multipleHierarchy?: true,

    /**
     * Additional constraints for the set/members
     */
    constraint?: IWidgetTemplateMdxBuilderAxisPropsConstraint;

    decoration?: {
        with?: string,
        set: string,
    }

    /**
     * Show the mdxAxis names in this order in the builder
     */
    showOrder?: number;

    /**
     * Allows to overwrite the ON "rows"in the MDX query  (to be used on modifyDefinition function)
     */
    overwriteAxisName?: string;

    /**
     * This is used to give end customers information on the limit of the query (column have 1000 by default, rows 100'000)
     */
    infoForSizing?: "TIDY_ROW" | "TIDY_COL";

}

export interface IWidgetTemplateMdxBuilderMapping {

    /**
     * The order determines the order of the statements in the query. E.g., the first position is ON 0, the second ON 1,
     * etc., where '0' and '1' are replaced by the name.
     */
    mdxAxis: Readonly<IWidgetTemplateMdxBuilderAxisProps[]>;

    /**
     * The generated MDX is for a filter (the cell values are not of interest).
     */
    mdxIsForFilter?: true;

    /**
     * The cell values are not needed.
     */
    withoutCellValues?: true;

    /**
     * The cell values are not needed if there is a single axis in the query.
     */
    withoutCellValuesSingleAxis?: true;

    /**
     * An MDX query if the builder is empty.
     */
    mdxQueryIfEmpty?: boolean;


    /**
     *  model is a IMdxQueryBuilderModel, that is not shared publicly yet
     *
     *  returns a modified definition or an MDX statement in a string
     *
     *  If we return a string (MDX Statement), the Filters are still going to be appended to the end
     */
    modifyDefinition?: (model: any, definition: IWidgetTemplateMdxBuilderMapping) => IWidgetTemplateMdxBuilderMapping | string,
}

/**
 * A widget that renders using React.
 *
 * @see FormFieldObject
 */
export interface IPublicReactChartTemplate<T extends FormFieldObject> {

    /**
     * @param data the actual result of the widget's query
     * @param options the options (possibly edited and/or from the theme) of this widget
     * @param header aka. widget title
     */
    reactElement: (data: IWidgetTemplateTidyData, options: T, header: string) => ReactElement;

}

/**
 * A widget that renders using plain Javascript/Typescript.
 *
 * @see FormFieldObject
 */
export interface IPublicJsChartTemplate<T extends FormFieldObject> {

    /**
     * @param data the actual result of the widget's query
     * @param options the options (possibly edited and/or from the theme) of this widget
     * @param header aka. widget title
     */
    renderJS: (data: IWidgetTemplateTidyData, options: T, header: string) => void;

    renderOnResizeJS?: (data: IWidgetTemplateTidyData, options: T, header: string, info: IWidgetLayoutInfo) => void;

    dispose: () => void;

}

export interface IPublicWidgetReactProps<OPTIONS> {
    wContext: IWidgetPublicContext,
    data: IWidgetTemplateTidyData,
    options: OPTIONS,
    widgetHeader: string
}

/**
 *
 *
 * @see IPublicReactChartTemplate
 * @see FormFieldObject
 */
export interface IPublicWidgetReactTemplateDefinition<OPTIONS extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition<OPTIONS> {

    /**
     * Deprecated: use reactEl instead.
     */
    jsCode?: (context: IWidgetPublicContext) => IPublicReactChartTemplate<OPTIONS>;

    /**
     * The React Hook component  (function with props as parameter)
     */
    reactEl?: React.FunctionComponent<IPublicWidgetReactProps<OPTIONS>>;

    reactComponent: true;

    /**
     * Only the widget template meta information is required when starting the application.
     *
     * This method gives the opportunity for a widget template to load (Webpack) its actual jsCode logic when required.
     * For example, AmCharts 4 widgets are loading the AmCharts 4 actual JS libraries once their rendering is actually
     * required.
     *
     * @param definitionW a resolved wrapped widget (extending widget).
     */
    resolveDefinition?: (definitionW?: IPublicWidgetTemplateDefinition<any>) => Promise<IPublicWidgetTemplateDefinition<OPTIONS>>;

}

/**
 * The definition of a widget that renders using plain Javascript/Typescript.
 *
 * @see IPublicJsChartTemplate
 * @see FormFieldObject
 */
export interface IPublicWidgetJsTemplateDefinition<OPTIONS extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition<OPTIONS> {

    /**
     * Actual widget rendering logic.
     */
    jsCode: (context: IWidgetPublicContext, container: HTMLDivElement) => IPublicJsChartTemplate<OPTIONS>;

    reactComponent?: false;

    /**
     * Only the widget template meta information is required when starting the application.
     *
     * This method gives the opportunity for a widget template to load (Webpack) its actual jsCode logic when required.
     * For example, AmCharts 4 widgets are loading the AmCharts 4 actual JS libraries once their rendering is actually
     * required.
     *
     * @param definitionW a resolved wrapped widget (extending widget).
     */
    resolveDefinition?: (definitionW?: IPublicWidgetTemplateDefinition<any>) => Promise<IPublicWidgetTemplateDefinition<OPTIONS>>;

}

/**
 * Definition - static - of a widget template
 */
interface IPublicCommonWidgetTemplateDefinition<OPTIONS extends FormFieldObject> {

    /**
     * Used for finding the right documentation of `typeForHelp` is not defined.
     * Determine the widget icon in the widget infos.
     */
    type: WidgetTemplateDefinitionType;

    /**
     * Used for finding the right documentation (override `type`).
     */
    typeForHelp?: WidgetTemplateDefinitionType;

    /**
     * Unique within the plugin. Must not contain any dot (this is NOT the templateId)
     *
     * The widget chooser is using that id to localize its name and description.
     *
     * <pre>
     *     plugin-id.id.$caption, ...
     *     plugin-id.id.$caption.description, ...
     * </pre>
     */
    id: string;

    /**
     * Internal usage: while investigating lazy registration (setup upon registration).
     */
    debug?: string;

    /**
     * Internal usage: the wrapped pluginId.templateId (setup upon registration).
     */
    wrapped?: string;

    /**
     * Internal usage: pluginId.templateId (setup upon registration).
     */
    qualifiedId?: string;

    /**
     * Internal usage: pluginId (setup upon registration).
     */
    pluginId?: string;

    /**
     * Used for localization right now.
     *
     * The widget chooser is using that id to localize its name.
     *
     * <pre>
     *     plugin-id.$groupId, ...
     * </pre>
     *
     * Should you like to reuse an existing group, localize the group using an existing one:
     *
     * <pre>
     *     MyPlugin.$myMaps, Maps
     * </pre>
     *
     * then widgets defined ih the group "myMaps" of the plugin whose id=MyPlugin will be shown
     * in the "Maps" group in the widget chooser.
     */
    groupId: string;

    /**
     * A way to ensure we do not display in the widget chooser templates that cannot
     * be used because the rendering depends on a given theme.
     */
    dependsOnTheme?: string;

    /**
     * A sort of "preview" of the widget in the widget chooser. Providing an empty string will display a default image.
     *
     * <pre>
     *     import donut from "./images/donut.svg";
     *
     *     {
     *          image: "donut",
     *     }
     * </pre>
     */
    image: string;

    /**
     * No widget box decoration.
     */
    noDecoration?: boolean;

    /**
     * No widget *** box *** header (aka. title) is rendered. This widget template is taking care of it.
     */
    withoutHeader?: boolean;

    /**
     * No title is being edited/rendered.
     */
    withoutTitle?: boolean;

    /**
     * This widget does not require any query for rendering.
     */
    withoutQuery?: boolean;

    withoutSelection?: boolean;
    withoutDrilldown?: boolean;
    withoutEvents?: boolean;

    withoutUserMenu?: boolean;
    withoutGlobalFilter?: boolean;

    /**
     * Otherwise the widget box is rendering a floating icon to mention some data errors.
     */
    handleCellsOnError?: boolean;

    renderIfNotInViewport?: boolean;

    /**
     * This widget needs to render even if its query has not been executed yet. The default is false.
     */
    renderIfQueryNotExecuted?: boolean;

    /**
     * Whether or not this widget can expand vertically according to its actual data
     * (e.g., table, repetition widget).
     */
    withOptionAutoExpand?: boolean;

    /**
     * When auto-expand applies and the layout is multi-page, this options controls whether the table
     * header is repeating on each page.
     */
    withOptionAutoExpandKeepTableHeader?: boolean;

    withOptionAutoExpandHeightNotDependingOnWidth?: boolean;

    /**
     * If and only if not null, hide option 'Interactions' > 'Drilldown' > 'Pivot Table Like' and set it default value to withDrilldownPivotTableLikeAs.
     */
    withDrilldownPivotTableLikeAs?: boolean;

    /**
     * Extra options for in the widgets user menu when in viewer mode.
     */
    userMenuOptions?: string[];

    /**
     * Additional widget user menu options when in editing mode.
     */
    userMenuOptionsOnEditing?: string[];

    /**
     * Disables the user menu option to switch between selection and drilldown
     *
     * E.g a Pivot table can manage both modes
     */
    userMenuDisableInteractionMode?: boolean;

    /**
     * @deprecated
     */
    withoutTidyTable?: boolean;

    /**
     * This widget knows how to render a result without any data.
     * (e.g., data picker)
     */
    handlesNoData?: boolean;

    /**
     * This widget is responsible to notify its rendered status. Required with asynchronous rendering
     * (e.g., Google maps).
     *
     * @see IWidgetPublicContext#onWidgetRenderStatusChange
     */
    handlesWidgetStatus?: boolean;

    eventRoles?: ITemplateEventActionDef;

    selection?: {
        /**
         * The default selection granularity.
         */
        defaultGranularityItems?: IFormFieldGranularityItem[];

        /**
         * The list of columns/roles that can be part of the selection granularity. The granularity editor shows
         * when there are 2 or more roles.
         */
        granularityItems?: (table: ITidyTable) => IFormFieldGranularityItem[];
    }

    mdxBuilderSettings?: IWidgetTemplateMdxBuilderMapping;

    /**
     * Setup how to get default mappings from the table and options for this widget.
     * If undefined, it uses the default fallback logic.
     *
     * Note, the mapping keys must be in lower case.
     */
    defaultMapping?: (data: IWidgetTemplateTidyOptions<OPTIONS>) => ChartTemplateDataMapping;

    /**
     * The meta information required for editing the widget options.
     */
    chartOptionsMeta?: FormFields<OPTIONS>;

    /**
     * An optional hook that allows for modifying the chart options passed as parameter.
     * Used when extending existing widget definition.
     */
    hookChartOptions?: (options: any) => any;

    /**
     * When registering a variant add the following field editor meta:
     * <pre>
     * widgetVariant: {
     *    fieldType: "widgetVariant",
     *    localizationTag: "variant"   // icCube localization,
     * },
     * </pre>
     */
    registerVariants?: (theme: Theme, manager: IWidgetVariantManager) => void;

    /**
     * e.g., amCharts4.
     * */
    lazyLibs?: string;

    /**
     * Whether or not that component is using React for rendering.
     */
    reactComponent?: boolean;

    /**
     * Only the widget template meta information is required when starting the application.
     *
     * This method gives the opportunity for a widget template to load (Webpack) its actual jsCode logic when required.
     * For example, AmCharts 4 widgets are loading the AmCharts 4 actual JS libraries once their rendering is actually
     * required.
     *
     * @param definitionW a resolved wrapped widget (extending widget).
     */
    resolveDefinition?: (definitionW?: IPublicWidgetTemplateDefinition<any>) => Promise<IPublicWidgetTemplateDefinition<OPTIONS>>;

    /**
     * When defining new widgets using amCharts 4, this method registers the icCube license.
     */
    registerAmCharts4?: (logger: ILogger, callback: (am4core: any) => void) => void;

    /**
     * When opening "Use Global Filter" option on Interaction tab
     */
    enableUseGlobalFilter?: boolean;

    /**
     *  Returns true if the widget fires a global event at initialization (start)
     */
    firesGlobalEventAtStart?: (options: OPTIONS | undefined, templateDef: IPublicWidgetTemplateDefinition<OPTIONS>) => boolean;

    /**
     * Limit on the rows of the tidy result to both prevent the server and the browser to process
     * too many items. Set to -1 to have no limit. Note that the server side is defining a limit as well.
     * See icCube/help?ic3topic=dashboards.gettingstarted.Configuration for more details.
     *
     * Note: can be overridden via Dashboards options (ic3report-config.js).
     */
    maxTidyRowCount?: number,

    /**
     * List of supported types of query.
     *
     * Defaults: all of them.
     */
    withQueryTypes?: QueryType[];

    /**
     * Change the data to show when the user presses show-data from the widget menu.
     * @param ownProps
     */
    getShowHideDataTable?: (table: ITidyTable | undefined, options: OPTIONS, ownProps: any) => ITidyTable | undefined;

}

/**
 * *********************************************************************************************************************
 *                  DO NOT CHANGE THEIR VALUE : USED FOR FINDING THE DOCUMENTATION.
 * *********************************************************************************************************************
 */
export enum WidgetTemplateDefinitionType {
    Chart = "chart",
    Filter = "filter",
    Map = "map",
    Misc = "misc",
}

export interface IWidgetTemplateTidyData {

    table: ITidyTable;
    inter: ITidyTableInteraction;

}

export interface IWidgetTemplateTidyOptions<T extends FormFieldObject> {
    table: ITidyTable;
    options: T;
}

export interface IChartVisualizationTypedInput<T extends FormFieldObject> {

    table: ITidyTable;
    inter: ITidyTableInteraction;

    options: T;
}

/**
 * The mapping meta are all the column that the user can select in the chart options. These options are checked for
 * validity. The widget generates an error if columns are selected that are not in the allowed properties, or if
 * columns are mandatory but there is no selection or fallback.
 */
export type IWidgetTemplateDataMappingDef = IFormColumnChooserFieldDef;

/**
 * Predefined roles
 */
export enum TemplateEventActionNames {
    SELECTION = 'Selection',

    // Notifications
    ADD_SELECTION = 'AddSelection',
    FILTER_TO_DEFAULT = 'FilterToDefault',
}

/**
 *
 * Definition of the actions supported by a template
 *
 *
 * ( e.g., publish: 'onClick'  )
 */
export interface ITemplateEventActionDef {

    /**
     *  The actions publishing to a channel
     */
    publish?: string[];

    /**
     *  The actions subscribing to a channel  (only new events value are sent, state change)
     */
    subscribe?: string[];

    /**
     *  The actions being notified by a channel  (on each new event generated)
     */
    notify?: string[];

    /**
     * The actions publishing to the 'selection' channel (it's internally managed by TidyTableInteraction)
     */
    selectionPublish?: string;

    /**
     * The actions subscribing to the 'selection' channel
     */
    selectionSubscribe?: string;

}

export interface IWrappedWidgetTemplateDefinition<WIDGET extends WidgetTemplateIDs> {

    /**
     * Some free text used while registering the wrapper (e.g., error purpose).
     */
    readonly registrationInfo: string;

    /**
     * e.g., ic3.Table
     */
    readonly wrappedWidgetTemplateId: WIDGET;

    /**
     * A function generating the widget template definition based on the wrapped widget template definition.
     */
    readonly wrapper: (wrapped: IPublicWidgetTemplateDefinition<WidgetTemplateChartOptions[WIDGET]>) => IPublicWidgetTemplateDefinition<FormFieldObject>;

}