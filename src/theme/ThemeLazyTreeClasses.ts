export class LazyTreeClasses {

    /**
     * Style applied to the root element.
     */
    static readonly lazyRoot = 'ic3LazyTreeView-root';

    /** Styles applied to the search toolbar element */
    static readonly toolbar = 'ic3LazyTreeView-toolbar';

    /** Styles applied to the search search input element */
    static readonly input = 'ic3LazyTreeView-toolbar-input';

    /** Styles applied to the select filter button (on) */
    static readonly button = 'ic3LazyTreeView-toolbar-button';

    /** Styles applied to the select filter button (on) */
    static readonly buttonFilterSelectedOn = 'ic3LazyTreeView-toolbar-buttonOn';

    /** Styles applied to the select filter button (off) */
    static readonly buttonFilterSelectedOff = 'ic3LazyTreeView-toolbar-buttonOff';

    /** Styles applied to the TreeRoot element */
    static readonly treeRoot = 'ic3LazyTreeView-treeRoot';

    /**
     * Item classes
     */
    static readonly itemRoot = 'ic3LazyTreeView-itemRoot';

    static readonly itemContainer = 'ic3LazyTreeView-itemContainer';

    static readonly leftDiv = 'ic3LazyTreeView-itemLeftDiv';

    static readonly itemLabelContainer = 'ic3LazyTreeView-itemLabelContainer';

    static readonly itemIcon = 'ic3LazyTreeView-itemIcon';
}

export declare type LazyTreeClassesClassKey = keyof LazyTreeClasses;

export interface LazyTreeProps {

}