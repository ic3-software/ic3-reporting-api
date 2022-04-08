import {FormFieldObject} from "../PublicTemplateForm";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";

export interface FilterTidyTableChartOptions extends FormFieldObject {

    /**
     * Items.
     *
     * The column defining the members used as items of the filter (default: first axis).
     */
    items: TidyTableColumnSelector;

    /**
     * Active.
     *
     * An item cannot be selected if the corresponding cell in this column evaluates to false.
     */
    itemActive?: TidyTableColumnSelector;


    /**
     * Color.
     *
     * Color of filter items.
     */
    color?: TidyTableColumnSelector;

    /**
     * Selection Color.
     *
     * The color of the item when it is selected. Leave blank to use the theme default.
     */
    colorActive?: TidyTableColumnSelector;

}
