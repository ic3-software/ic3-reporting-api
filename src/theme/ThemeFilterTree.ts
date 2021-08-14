import {FormFieldObject} from "../PublicTemplateForm";
import {TreeFireEventMode} from "../PublicTidyTableInteractions";

export interface FilterTreeOptions extends FormFieldObject {
    /**
     * variants (if any)
     */
    variant?: string;

    /**
     * size
     */
    size: 'small' | 'medium';

    /**
     * add control icons for the tree item buttons
     */
    useControlIcons?: boolean;

    /**
     * Depth of the opened tree items at start
     */
    startOpenDepth: number,


    /**
     * On user item click, selects/unselects all children as well
     */
    cascadeSelection: boolean,

    /**
     * When firing an event, do not fire children if the parent is selected (i.e. the filter is used as an MDX filter)
     */
    fireMode: TreeFireEventMode.ALL_SELECTED | TreeFireEventMode.COMPACT_ON_PARENT,

    /**
     * Search feature to the tree
     *  if tree, adds an input field on top
     *  if autocomplete, uses the autocomplete to filter the tree
     */
    addSearch: boolean,

    /**
     *
     */
    searchPlaceholder?: string;

    /**
     * Switches the filter to an autocomplete with a collapsible tree
     */
    autoComplete: boolean;


    /**
     * Autocomplete predefined variants , "filled", "outlined" + custome ones
     */
    autoCompleteVariant: string;

    /**
     * Autocomplete size of buttons
     */
    autoCompleteSize?: 'small' | 'medium';

    /**
     * Autocomplete, the maximum number of tags that will be visible when not focused. Set -1 to disable the limit.
     */
    autoCompleteLimitTags: number;
}

export class FilterTreeClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";

    /**
     *  Style applied to the tree item without control icons
     */
    static simpleItemLabel: "TreeFilter-simpleItemLabel";

    /**
     *  Style applied to the tree item witht control icons
     */
    static itemLabelWithIcons: "TreeFilter-itemLabelWithIcons";

    /**
     * On top you've all classes of LazyTreeItemClasses, lazyTreeClasses and Ic3GlobalClasses
     */

}


export declare type FilterTreeClassKey = keyof FilterTreeClasses;
