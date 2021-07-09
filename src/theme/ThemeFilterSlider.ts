import {FormFieldObject} from "../PublicTemplateForm";

export enum FilterSliderRenderingType {

    MARKS = "MARKS",
    TOOLTIPS = "TOOLTIPS",
    MARKS_WITH_TOOLTIPS = "MARKS_WITH_TOOLTIPS",

}

export interface FilterSliderProps extends FormFieldObject {
    /**
     * Predefined variants
     */
    variant?: string;

    /**
     * Size of slider
     */
    size: 'small' | 'medium';

    /**
     * slider Orientation Vertical / Horizontal
     */
    orientation: "horizontal" | "vertical";

    /**
     * Styling the slider (marks/tooltips)
     */
    style: FilterSliderRenderingType;

    /**
     * The margin for starting/ending the slider (left/right or top/bottom)
     */
    margin: number;
}

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
