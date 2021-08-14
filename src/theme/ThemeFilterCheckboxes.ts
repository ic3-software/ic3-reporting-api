import {FormFieldObject} from "../PublicTemplateForm";

export interface FilterCheckboxProps extends FormFieldObject {
    /**
     * Size of buttons
     */
    size: 'small' | 'medium';

    /**
     * If defined, buttons will be positioned in columns
     */
    columns?: number;
}


export class FilterCheckBoxesClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";
}


export declare type FilterCheckboxesClassKey = keyof FilterCheckBoxesClasses;
