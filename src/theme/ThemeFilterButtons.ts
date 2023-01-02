import {FilterTidyTableChartOptions} from "./ThemeFilter";

export class FilterButtonsClasses {

    /**
     * Style applied to the root element.
     */
    static readonly container = "ic3FilterButtons-container";

    /**
     *  Style applied to the mui button elements.
     */
    static readonly button = "ic3FilterSlider-button";

    /**
     *  Style applied to the mui group element (if present).
     */
    static readonly group = "ic3FilterSlider-group";

    /**
     * Slot for MuiButton component(s)
     */
    static readonly muiButton = "";

}

export declare type FilterButtonsClassKey = keyof FilterButtonsClasses;

/**
 * Filter Buttons Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterButtons
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterButtonsChartOptions extends FilterTidyTableChartOptions {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant: "text" | "outlined" | "contained" | string;

    /**
     * Size.
     */
    size: "small" | "medium" | "large";

    /**
     * Grouped.
     *
     * When grouped, the buttons are rendered horizontally or vertically similarly to a toolbar.
     */
    group?: boolean;

    /**
     * Layout (Grouped).
     */
    layout?: "horizontal" | "vertical";

    /**
     * Grid Column Count
     *
     * The buttons will be displayed on a grid. This field sets the number of columns of the grid.
     * Not relevant if the buttons are 'Grouped'.
     */
    columns?: number;

}


