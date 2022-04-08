import {FormFieldObject} from "../PublicTemplateForm";

export class FilterPanelClasses {
    /**
     * Main content div
     */
    static readonly mainDiv: string = "FilterPanel-root";

    /**
     * Div containing the loading spinner and text
     */
    static readonly loadingDiv: string = "FilterPanel-loading";

    /**
     * Header div with buttons and help icon
     */
    static readonly headerDiv: string = "FilterPanel-header";

    /**
     * Div with the stack of filter items
     */
    static readonly contentDiv: string = "FilterPanel-content";

    /**
     * Div containing the filters
     */
    static readonly filterStack: string = "FilterPanel-filterStack";

    /**
     * Main filter div
     */
    static readonly filterItemDiv: string = "FilterPanel-filterItem";

    /**
     * Classname for the TextField component
     */
    static readonly inputField: string = "FilterPanel-filterInputfield";

}

export declare type FilterPanelClassesKey = keyof FilterPanelClasses;

/**
 * Filter Panel Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterPanel
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterPanelChartOptions extends FormFieldObject {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * As Global Filter.
     *
     * In the widget interaction tab, enable 'Use Global Filter' to see the effects of this option.
     *
     * Default value can NOT be changed in a theme or variant
     */
    asGlobalFilter: boolean;

    /**
     * Schema Name.
     *
     * Using the schema defined at dashboard level when not defined.
     */
    schemaName?: string;

    /**
     * Cube Name.
     *
     * The cube to use. Leave blank to use the default cube.
     */
    cubeName?: string;

    /**
     * Allowed Filters.
     *
     * Only show these options in the data field selector.
     * Easily change by clicking 'Set Allowed Filters' in the user menu of the widget header.
     */
    customFilterConfig?: string;

    /**
     * Default Filters.
     *
     * These filters are in the filter panel upon opening the dashboard.
     * Easily change by clicking 'Set Default Filters' in the user menu of the widget header.
     */
    initialFilterConfig?: string;
}

