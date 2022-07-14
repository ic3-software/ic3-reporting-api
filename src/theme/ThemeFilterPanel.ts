import {FormFieldObject} from "../PublicTemplateForm";

export class FilterPanelClasses {
    /**
     * Main content div
     */
    static readonly mainDiv = "FilterPanel-root";

    /**
     * Div containing the loading spinner and text
     */
    static readonly loadingDiv = "FilterPanel-loading";

    /**
     * Div with add filter and remove all filters buttons
     */
    static readonly headerDiv = "FilterPanel-header";

    /**
     * Div containing the 'Filters' text and the help icon button
     */
    static readonly titleDiv = "FilterPanel-title";

    /**
     * Div containing the 'Filters' text
     */
    static readonly titleDivText = "FilterPanel-title-text";

    /**
     * Div containing the add and remove all buttons
     */
    static readonly headerDivButtons = "FilterPanel-header-buttons";

    /**
     * Add button
     */
    static readonly headerDivAddButton = "FilterPanel-HeaderDivAddButton";

    /**
     * Remove all button
     */
    static readonly headerDivRemoveAllButton = "FilterPanel-HeaderDivRemoveAllButton";

    /**
     * Div of the content root. Used for animation purposes.
     */
    static readonly contentDivRoot = "FilterPanel-content-root";

    /**
     * Div with the stack of filter items
     */
    static readonly contentDiv = "FilterPanel-content";

    /**
     * Div with no filters defined text
     */
    static readonly contentNoFilters = "FilterPanel-NoFilters";

    /**
     * Main filter div
     */
    static readonly filterItemDiv = "FilterPanel-filterItem";

    /**
     * Main filter div
     */
    static readonly filterItemDivHeader = "FilterPanel-filterItemHeader";

    static readonly filterItemClearButton = "FilterPanel-ItemClearButton";

    static readonly filterItemRemoveButton = "FilterPanel-ItemRemoveButton";

    /**
     * Classname for the TextField component
     */
    static readonly inputField = "FilterPanel-filterInputfield";

    /**
     * A div with the displayed values for the value selector in preview mode
     */
    static readonly inputFieldPreviewValues = "FilterPanel-PreviewValue";

    /**
     * Classname for the field label
     */
    static readonly fieldName = "FilterPanel-fieldName";

    /**
     * Div with selectable items for filters with few items
     */
    static readonly selectableContent = "FilterPanel-selectableContent";

}

export interface FilterPanelProps {

    /**
     * Variant defined in the theme. If the theme has variants, then the user can select one.
     */
    variant?: string;

    /**
     * If true, grow filter in row direction. If false, grow in column direction.
     */
    filterLayoutHorizontal?: boolean;
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

    /**
     * If true, grow filter in row direction. If false, grow in column direction.
     */
    filterLayoutHorizontal?: boolean;

    /**
     * If defined, the filter panel only shows items where this measure is not NULL. This means, for example, that
     * if there is a filter item setting Continent to Asia, then other filters, e.g., country, only show countries
     * with continent Asia.
     */
    measureMdx?: string;

    /**
     * Name template for the fields with properties. Use 'levelName' and 'propertyName' as placeholders.
     */
    propertyFieldNameTemplate: string;

    /**
     * Use the simple selection filter if and only if `useSimpleFilterCutoff` is not null and the level
     * has <= `useSimpleFilterCutoff` members.
     */
    useSimpleFilterCutoff?: number;
}

