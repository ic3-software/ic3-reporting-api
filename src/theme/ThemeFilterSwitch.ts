import {FilterTidyTableChartOptions} from "./ThemeFilter";

export class FilterSwitchClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "ic3SwitchFilter-root";

    /**
     * Added class when switch has two options.
     */
    static readonly twoOptions = "ic3SwitchFilter-twoOptions";

}

export declare type FilterSwitchClassKey = keyof FilterSwitchClasses;

/**
 * Filter Switch Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterSwitch
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterSwitchChartOptions extends FilterTidyTableChartOptions {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * Text to show on the right of the switch.
     */
    labelRight: string;

    /**
     * Text to show on the left of the switch.
     */
    labelLeft: string;

}

export interface FilterSwitchProps {
    variant?: string;
}