import { ITidyTable } from "./PublicTidyTable";
import { ITidyTableInteraction } from "./PublicTidyTableInteractions";
import { IWidgetPublicContext } from "./PublicContext";
import { FormFieldDef, FormFieldObject, FormFields, IFormColumnChooserFieldDef } from "./PublicTemplateForm";
import { IWidgetVariantManager } from "./IWidgetVariantManager";
import { ITidyColumn } from "./PublicTidyColumn";
import { ReactElement } from "react";
import { Theme } from "@mui/material/styles";

type ChartTemplateWidgetProps = any;

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
     * For filters add lazy load feature to the axis
     */
    addLazyLoad?: true;

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
}

export interface IWidgetTemplateMdxBuilderMapping {

    /**
     * The order determines the order of the statements in the query. E.g., the first position is ON 0, the second ON 1,
     * etc., where '0' and '1' are replaced by the name.
     */
    mdxAxis: Readonly<IWidgetTemplateMdxBuilderAxisProps[]>;

    /**
     * The generated Mdx is for a filter (the cell values are not of interest)
     */
    mdxIsForFilter?: true;

    /**
     * the cell values are not needed
     */
    withoutCellValues?: true;

    /**
     * an MDX query if the builder is empty
     */
    mdxQueryIfEmpty?: boolean;
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
    reactElement: (data: IWidgetTemplateTidyData, options: T, header: string, props: ChartTemplateWidgetProps) => ReactElement;

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
    renderJS: (data: IWidgetTemplateTidyData, options: T, header: string, props: ChartTemplateWidgetProps) => void;

    dispose: () => void;

}

/**
 * The definition of a widget that renders using React.
 *
 * @see IPublicReactChartTemplate
 * @see FormFieldObject
 */
export interface IPublicWidgetReactTemplateDefinition<T extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition {

    jsCode: (context: IWidgetPublicContext) => IPublicReactChartTemplate<T>;

    reactComponent: true;
}

/**
 * The definition of a widget that renders using plain Javascript/Typescript.
 *
 * @see IPublicJsChartTemplate
 * @see FormFieldObject
 */
export interface IPublicWidgetJsTemplateDefinition<T extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition {

    jsCode: (context: IWidgetPublicContext, container: HTMLDivElement) => IPublicJsChartTemplate<T>;

    reactComponent?: false;
}


/**
 * List of special selection granularities (column selectors)
 */

export enum SelectionGranularityOptions {
    PivotTableTopHeader = 'ic3pivotTableTopHeader',
    PivotTableLeftHeader = 'ic3pivotTableLeftHeader',
    PivotTableCell = 'ic3pivotTableCell',
}

/**
 * Definition - static - of a widget template
 */
interface IPublicCommonWidgetTemplateDefinition {

    /**
     * Determine the widget icon in the widget infos.
     * Used for finding the right documentation.
     */
    type: WidgetTemplateDefinitionType;

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

    /**
     * If and only if not null, hide option 'Interactions' > 'Drilldown' > 'Pivot Table Like' and set it default value to withDrilldownPivotTableLikeAs.
     */
    withDrilldownPivotTableLikeAs?: boolean;

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
         * The list of columns that can be part of the selection. The end-user can then select the actual
         * columns from the Interaction/Selection configuration (see Selection Granularity).
         */
        allowedColumns: (column: ITidyColumn) => boolean;

        optionValues?: undefined;

    } | {
        allowedColumns?: undefined;

        optionValues?: SelectionGranularityOptions[];
    }

    mdxBuilderSettings?: IWidgetTemplateMdxBuilderMapping;

    /**
     * The meta information required for editing the widget options.
     */
    chartOptionsMeta?: FormFieldDef[] | FormFields<FormFieldObject>;

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

    resolveDefinition?: (library: IResolveDefinitionLibrary) => Promise<IPublicWidgetTemplateDefinition<any>>;

    /**
     * When defining new widgets using amCharts 4, this method registers the icCube license.
     */
    registerAmCharts4?: (callback: (am4core: any) => void) => void;

    /**
     * When opening "Use Global Filter" option on Interaction tab
     */
    enableUseGlobalFilter?: boolean;
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


export interface IChartVisualizationInput {

    table: ITidyTable;
    inter: ITidyTableInteraction;

    options: { [key: string]: any };
}

export interface IWidgetTemplateTidyData {

    table: ITidyTable;
    inter: ITidyTableInteraction;

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
 * ( e.g publish: 'onClick'  )
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

export interface IResolveDefinitionLibrary {

    wrapTemplateDefinition(id: string): Promise<IPublicWidgetTemplateDefinition<any>>;

}