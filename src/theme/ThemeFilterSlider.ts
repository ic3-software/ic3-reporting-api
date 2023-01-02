import {FilterTidyTableChartOptions} from "./ThemeFilter";

// TOM : needs clarification
export class FilterSliderClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "ic3FilterSlider-root";

    /**
     *  Style applied to the mui slider element.
     */
    static readonly slider = "ic3FilterSlider-slider";

    /**
     *  Style applied to the tooltip element.
     */
    static readonly tooltip = "ic3FilterSlider-tooltip"

    /**
     * Slot for MuiSlider component
     */
    static readonly muiSlider = "";

    /**
     * Slot for Selection Label (below the slider)
     */
    static readonly selectionLabel = "ic3FilterSlider-SelectionLabel";

    /**
     * root modifiers for horizontal or vertical slider
     */
    static readonly horizontal = "ic3FilterSlider-Horizontal";
    static readonly vertical = "ic3FilterSlider-Vertical";


}

export declare type FilterSliderClassKey = keyof FilterSliderClasses;

export enum FilterSliderRenderingType {

    MARKS = "MARKS",
    TOOLTIPS = "TOOLTIPS",
    MARKS_WITH_TOOLTIPS = "MARKS_WITH_TOOLTIPS",
    NONE = "NONE",
}

/**
 * Filter Slider Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterSlider
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterSliderChartOptions extends FilterTidyTableChartOptions {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * Size.
     */
    size: "small" | "medium";

    /**
     * Orientation.
     */
    orientation: "horizontal" | "vertical";

    /**
     * Style.
     */
    style: FilterSliderRenderingType;

    /**
     * Margins.
     *
     * Left/right (or top/down) margins of the slider.
     */
    margin: number;

    /**
     * Mark Each
     *
     * When active, adds a label for each nt step to the mark (1 for each step)
     */
    markLabelEach: number;

    /**
     * Selection Label.
     *
     * An optional label under the slider with selection information
     */
    selectionLabel?: string;
}
