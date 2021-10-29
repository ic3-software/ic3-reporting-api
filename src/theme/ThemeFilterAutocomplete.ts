import {FormFieldObject} from "../PublicTemplateForm";
import autocompleteClasses from "@mui/material/Autocomplete/autocompleteClasses";

export interface FilterAutocompleteProps extends FormFieldObject {

    /**
     * Predefined variants , "filled", "outlined" + custome ones
     */
    variant: string;

    /**
     * Size of the chips
     */
    size: 'small' | 'medium';

    /**
     * The maximum number of chips that will be visible when not focused. Set -1 to disable the limit.
     */
    limitTags: number;

}


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


}


export declare type FilterAutocompleteClassesKey = keyof FilterAutocompleteClasses;
