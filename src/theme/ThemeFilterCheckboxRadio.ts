import {FilterTidyTableChartOptions} from "./ThemeFilter";

export class FilterCheckBoxRadioClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";


    /**
     *  Style container for a single Radio or Checkbox
     */
    static readonly radioCheckBoxContainer = "FilterCheckboxRadio-container";


    /**
     *  root element class decoration when the items are radio components  (single selection)
     */
    static readonly radioFlag = "FilterCheckboxRadio-Radio";

    /**
     *  root element class decoration when the items are checkbox components (multiple selection)
     */
    static readonly checkboxFlag = "FilterCheckboxRadio-Checkbox";


}

export declare type FilterCheckboxRadioClassKey = keyof FilterCheckBoxRadioClasses;

/**
 * Filter Checkboxes Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterCheckboxRadio
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterCheckboxRadioChartOptions extends FilterTidyTableChartOptions {

    /**
     * Variant.
     *
     * Allows for selecting a set of theme defined variants
     */
    variant?: string;

    /**
     * Size.
     */
    size: "small" | "medium";

    /**
     * Grid Column Count.
     *
     * The checkboxes will be displayed on a grid. Set the number of columns of the grid in this field.
     */
    columns?: number;

}
