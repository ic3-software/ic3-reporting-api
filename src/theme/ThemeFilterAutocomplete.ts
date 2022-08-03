import autocompleteClasses from "@mui/material/Autocomplete/autocompleteClasses";
import {FilterTidyTableChartOptions} from "./ThemeFilter";

export class FilterAutocompleteClasses {

    /**
     * Style applied to the root element
     */
    static readonly root = "root";

    /**
     * Style applied to the muiAutocomplete root element
     *
     * you've all classes of autocompleteClasses
     *
     * @see AutocompleteClasses
     */
    static readonly muiAutocomplete = autocompleteClasses.root;

    static readonly action = "MuiAutocomplete-action"

}

export declare type FilterAutocompleteClassesKey = keyof FilterAutocompleteClasses;

/**
 * Filter Autocomplete (aka. Dropdown) Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterAutocomplete
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterAutocompleteChartOptions extends FilterTidyTableChartOptions {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant: string;

    /**
     * Size.
     *
     * Rendered items size.
     */
    size: "small" | "medium";

    /**
     * Limit Items.
     *
     * Maximum number of items that will be visible when not focused. Set -1 to disable the limit.
     */
    limitTags: number;


    /**
     * Limit Chips.
     *
     * Maximum number of chips that will be visible
     */
    limitChips: number;

}
