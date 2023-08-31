import {FilterTidyTableChartOptions} from "./ThemeFilter";

// TOM : needs clarification
export class FilterAutocompleteClasses {


    /**
     * Style applied to the muiAutocomplete root element
     *
     * You've all mui classes https://mui.com/material-ui/api/autocomplete/
     */
    static readonly muiAutocomplete = "MuiAutocomplete-root";

    static readonly action = "MuiAutocomplete-action";

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
    variant?: "fixedHeight" | "standard" | "filled" | "outlined";

    /**
     * Size.
     *
     * Rendered items size.
     */
    size: "small" | "medium";


    /**
     * Limit Chips.
     *
     * Maximum number of chips that will be visible
     */
    limitChips: number;

    /**
     * Text to show when the filter is empty.
     */
    placeholderText?: string;

}

export type FilterAutocompleteProps =
    Pick<FilterAutocompleteChartOptions, 'variant' | 'size'>
    & { hideInput?: boolean }
    & { addHOverflow: boolean };