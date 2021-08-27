import {ITidyTable} from "./PublicTidyTable";
import {ChartTemplateDataMapping, TidyColumnsType} from "./PublicTidyTableTypes";
import {ITidyTableInteraction} from "./PublicTidyTableInteractions";
import {IWidgetPublicContext} from "./PublicContext";
import {FormFieldDef, FormFieldObject, FormFields} from "./PublicTemplateForm";
import {IWidgetVariantManager} from "./IWidgetVariantManager";
import {ITidyColumn} from "./PublicTidyColumn";
import {ReactElement} from "react";
import {Theme} from "@material-ui/core/styles";

type ChartTemplateWidgetProps = any;

export type IPublicWidgetTemplateDefinition<T extends FormFieldObject> =
    IPublicWidgetReactTemplateDefinition<T> | IPublicWidgetJsTemplateDefinition<T>;


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
 * Definition - static - of a widget template
 */
interface IPublicCommonWidgetTemplateDefinition {

    /**
     * Determine the widget icon in the widget infos.
     * Used for finding the right documentation.
     */
    type: WidgetTemplateDefinitionType;

    /**
     * Unique within the plugin. Must not contain any dot.
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
    withoutUserMenu?: boolean;

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
     * When defined, set the option as invisible and its value.
     */
    withDrilldownPivotTableLikeAs?: boolean;

    userMenuOptions?: string[];
    userMenuOptionsOnEditing?: string[];

    /**
     * @deprecated
     */
    withoutTidyTable?: boolean;

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

    }

    /**
     * The meta information that defined which data column to use in the widget.
     */
    dataMappingMeta?: IWidgetTemplateDataMappingDef[];

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

    resolveDefinition?: () => Promise<IPublicWidgetTemplateDefinition<any>>;

    /**
     * When defining new widgets using amCharts 4, this method registers the icCube license.
     */
    registerAmCharts4?: (callback: (am4core: any) => void) => void;

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

    mapping: ChartTemplateDataMapping;
    table: ITidyTable;
    inter: ITidyTableInteraction;

    options: { [key: string]: any };
}

export interface IWidgetTemplateTidyData {

    table: ITidyTable;
    inter: ITidyTableInteraction;

    mapping: ChartTemplateDataMapping;
}


export interface IChartVisualizationTypedInput<T extends FormFieldObject> {

    table: ITidyTable;
    inter: ITidyTableInteraction;
    mapping: ChartTemplateDataMapping;

    options: T;
}

/**
 * The mapping meta describes the coordinate system of the chart (e.g. axis, groups, values).
 * An error occurs when the columns in the mapping do not uniquely identify each row in the table.
 */
export interface IWidgetTemplateDataMappingDef {

    /**
     * The alias for the column.
     */
    mappingName: string;

    /**
     * When defined, adds the mapping options to a group in the widget editor.
     */
    mappingGroup?: string;

    /**
     * When defined, the value is added as a prefix to the fieldPath to defined the localization tag.
     */
    mappingTag?: string;

    /**
     * Only columns of this/these type(s) are allowed.
     */
    allowedTypes: TidyColumnsType[] | ((column: ITidyColumn) => boolean);

    /**
     * If true, fallback to a column that is both an Mdx axis and has a type that is allowed.
     * Note, properties of columns are not considered.
     */
    fallback?: boolean;

    /**
     * A column must be mapped to this alias, either by fallback or by user input.
     * Throw an error of no column is mapped to this alias.
     */
    mandatory?: boolean;

    isForDrilldown?: boolean;
}

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