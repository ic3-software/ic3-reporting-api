import {FilterTidyTableChartOptions} from "./ThemeFilter";

export class FilterSliderClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";

    /**
     *  Style applied to the mui slider element.
     */
    static readonly slider = "FilterSlider-slider";

    /**
     *  Style applied to the tooltip element.
     */
    static readonly tooltip = "FilterSlider-tooltip"

    /**
     * Slot for MuiSlider component
     */
    static readonly muiSlider = "";

}

export declare type FilterSliderClassKey = keyof FilterSliderClasses;

export enum FilterSliderRenderingType {

    MARKS = "MARKS",
    TOOLTIPS = "TOOLTIPS",
    MARKS_WITH_TOOLTIPS = "MARKS_WITH_TOOLTIPS",

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
}
