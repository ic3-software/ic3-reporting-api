import {FormFieldObject} from "../PublicTemplateForm";

export class FilterPanelClasses {
    /**
     * Main content div
     */
    static readonly mainDiv = "ic3FilterPanel-root";

    /**
     * Div containing the loading spinner and text
     */
    static readonly loadingDiv = "ic3FilterPanel-loading";

    /**
     * Div with add filter and remove all filters buttons
     */
    static readonly headerDiv = "ic3FilterPanel-header";

    /**
     * Div containing the 'Filters' text and the help icon button
     */
    static readonly titleDiv = "ic3FilterPanel-title";

    /**
     * Div containing the 'Filters' text
     */
    static readonly titleDivText = "ic3FilterPanel-title-text";

    /**
     * Div containing the add and remove all buttons
     */
    static readonly headerDivButtons = "ic3FilterPanel-header-buttons";

    /**
     * Add button
     */
    static readonly headerDivAddButton = "ic3FilterPanel-HeaderDivAddButton";

    /**
     * Reset filter button
     */
    static readonly headerDivResetButton = "ic3FilterPanel-HeaderDivResetButton";

    /**
     * Div of the content root. Used for animation purposes.
     */
    static readonly contentDivRoot = "ic3FilterPanel-content-root";

    /**
     * Div with the stack of filter items
     */
    static readonly contentDiv = "ic3FilterPanel-content";

    /**
     * Div with no filters defined text
     */
    static readonly contentNoFilters = "ic3FilterPanel-NoFilters";

    /**
     * Main filter div
     */
    static readonly filterItemDiv = "ic3FilterPanel-filterItem";

    /**
     * Main filter div
     */
    static readonly filterItemDivHeader = "ic3FilterPanel-filterItemHeader";

    /**
     * Div around the filter clear button. Used for showing the tooltip when hovered.
     */
    static readonly filterItemClearButtonContainer = "ic3FilterPanel-ItemClearButtonContainer";

    /**
     * Class for the clear button itself.
     */
    static readonly filterItemClearButton = "ic3FilterPanel-ItemClearButton";

    static readonly filterItemRemoveButton = "ic3FilterPanel-ItemRemoveButton";

    /**
     * Classname for the TextField component
     */
    static readonly inputField = "ic3FilterPanel-filterInputfield";

    static readonly dateTimePicker = "ic3FilterPanel-dateTimePicker";

    /**
     * A div with the displayed values for the value selector in preview mode
     */
    static readonly inputFieldPreviewValues = "ic3FilterPanel-PreviewValue";

    /**
     * Classname for the field label
     */
    static readonly fieldName = "ic3FilterPanel-fieldName";

    /**
     * Div with selectable items for filters with few items
     */
    static readonly selectableContent = "ic3FilterPanel-selectableContent";

    /**
     * Icon to make the filter panel collapsed (only available on App Left Panel)
     */
    static readonly collapsibleIcon = "ic3FilterPanel-collapsibleIcon";

    /**
     * Div when it is collapsed
     */
    static readonly collapsedDiv = "ic3FilterPanel-collapsedDiv";

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

    /**
     * true if the filter panel is collapsible
     */
    isCollapsible?: boolean;
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
     * These filters are not allowed to be selected by the user. These filters are hidden from the add filter menu.
     */
    notAllowedFiltersConfig?: string;

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
    propertyFieldNameTemplate?: string;

    /**
     * Use the simple selection filter if and only if `useSimpleFilterCutoff` is not null and the level
     * has <= `useSimpleFilterCutoff` members.
     */
    useSimpleFilterCutoff?: number;

    /**
     * Per default, the filter panel allows users to filter on properties. You can disable that with this option.
     */
    hidePropertyFilters?: boolean;

    /**
     * Only allow users to select from these operators.
     */
    allowedOperatorsConfig?: IPGFilterItemFilterType[];

    /**
     * Set to `true` to show date picker shortcuts.
     */
    datePickerShortcuts?: boolean;

}

export type TextFilterType = "EQUALS"
    | "NOT_EQUALS"
    | "STARTS_WITH"
    | "ENDS_WITH"
    | "CONTAINS"
    | "NOT_CONTAINS"
    | "REGEX";

export type IPGFilterItemFilterType = TextFilterType
    | "IS_ANY_OF"
    | "IS_NONE_OF"
    | "GREATER_THAN"
    | "GREATER_EQUAL_THAN"
    | "SMALLER_THAN"
    | "SMALLER_EQUAL_THAN"
    | "BETWEEN"
    | "IS_EMPTY"
    | "IS_NOT_EMPTY";