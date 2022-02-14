import {FormFieldObject} from "../PublicTemplateForm";

export interface FilterButtonsProps extends FormFieldObject {
    /**
     * Predefined variants (add string to allow new variant without type augmentation)
     */
    variant: 'text' | 'outlined' | 'contained' | string;

    /**
     * Size of buttons
     */
    size: 'small' | 'medium' | 'large';


    /**
     * If true, buttons will be grouped together (visual effect)
     */
    group?: boolean;

    /**
     * If defined, buttons will be positioned in columns
     */
    columns?: number;

    /**
     * If defined, buttons will be grouped by layout
     */
    layout?: 'horizontal' | 'vertical'
}


export class FilterButtonsClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";

    /**
     *  Style applied to the mui button elements.
     */
    static readonly button = "FilterSlider-button";

    /**
     *  Style applied to the mui group element (if present).
     */
    static readonly group = "FilterSlider-group";

    /**
     * Slot for MuiButton component(s)
     */
    static readonly muiButton = "";

}


export declare type FilterButtonsClassKey = keyof FilterButtonsClasses;
