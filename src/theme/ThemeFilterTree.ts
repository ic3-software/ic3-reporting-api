import {TreeFireEventMode} from "../PublicTidyTableInteractions";
import {FilterTidyTableChartOptions} from "./ThemeFilter";
import {LazyTreeClasses} from "./ThemeLazyTreeClasses";

export class FilterTreeClasses extends LazyTreeClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "ic3TreeFilter-root";

    /**
     *  Style applied to the tree item without control icons
     */
    static simpleItemLabel: "ic3TreeFilter-simpleItemLabel";

    /**
     *  Style applied to the tree item witht control icons
     */
    static itemLabelWithIcons: "ic3TreeFilter-itemLabelWithIcons";

    /**
     * + Ic3GlobalClasses
     * + Mui TreeView class names
     */

}

export declare type FilterTreeClassKey = keyof FilterTreeClasses;

export type FilterFireEventMode =
    TreeFireEventMode.ALL_SELECTED |
    TreeFireEventMode.COMPACT_ON_PARENT
    ;

/**
 * Filter Tree Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: FilterTree
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface FilterTreeChartOptions extends FilterTidyTableChartOptions {

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
     * Use Control Icons.
     *
     * Display a checkbox/radiobutton to the left of each item.
     */
    useControlIcons?: boolean;

    /**
     * Expand/Collapse Depth.
     *
     * Number of levels initially expanded.
     */
    startOpenDepth: number,


    /**
     * Cascade Selection.
     *
     * Select all children as well. Does not apply if single selection.
     */
    cascadeSelection: boolean,

    /**
     * Fire Mode.
     *
     * When firing an event, do not fire children if the parent is selected (i.e. the filter is used as an MDX filter).
     *
     * Does not apply if single selection.
     */
    fireMode: FilterFireEventMode,

    /**
     * Add Search.
     *
     * Add a search bar above the tree.
     */
    addSearch: boolean,

    /**
     * Search Placeholder.
     *
     * Text displayed when the search bar is empty.
     */
    searchPlaceholder?: string;

    /**
     * Dropdown (aka. Autocomplete).
     *
     * The tree is displayed as a dropdown.
     */
    autoComplete: boolean;

    /**
     * Variant.
     */
    autoCompleteVariant: string;

    /**
     * Size (Dropdown/Autocomplete).
     *
     * Rendered items size.
     */
    autoCompleteSize?: 'small' | 'medium';

    /**
     * Limit Chips.
     *
     * Maximum number of chips that will be visible
     */
    autoCompleteLimitChips: number;
}

export interface FilterTreeProps {
    printing: boolean;
    variant?: string;
    size: 'small' | 'medium';
}