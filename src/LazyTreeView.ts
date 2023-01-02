import {EntityItem, MdxInfo, TreeRowPropsTreeData} from "./PublicTidyTableTypes";
import React, {ReactElement} from "react";

export type ScrollDirection = "forward" | "backward";

export interface ListOnScrollProps {
    scrollDirection: ScrollDirection;
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
}

/**
 * A copy of MUI TreeItemClasses
 */
export interface LazyTreeItemClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the transition component. */
    group: string;
    /** Styles applied to the content element. */
    content: string;
    /** Pseudo-class applied to the content element when expanded. */
    expanded: string;
    /** Pseudo-class applied to the content element when selected. */
    selected: string;
    /** Pseudo-class applied to the content element when focused. */
    focused: string;
    /** Pseudo-class applied to the element when disabled. */
    disabled: string;
    /** Styles applied to the tree node icon. */
    iconContainer: string;
    /** Styles applied to the label element. */
    label: string;
}

export interface ILazyTreeViewLoader {

    /**
     * This will build the tree with react children
     */
    mapTree<T>(expanded: (index: number) => boolean, factory: (index: number, isCollapsed: boolean) => T, filter?: (info: MdxInfo) => boolean): T[];

    /**
     * Returns true if and only if the node has children that are to be lazilly loaded.
     */
    hasLazyChildren(index: number): boolean;

    /**
     * Returns true if and only if the node has children in the already loaded data.
     */
    hasChildren(index: number): boolean;

    getColumnLevelDepth(index: number): number;

    lazyLoadChildren(index: number): void | number;

    getNodeIdAndCaption(index: number): [string, string];

    getNodeId(index: number): string;

    getItemCount(): number;

    setCallbackOnChange(callback: () => void): void;

    toEntityItems(nodeIds: string[]): EntityItem[];

    mapNodeIds<T>(nodeIds: string[], callbackfn: (columnIdx: number) => T | null | undefined): T[];

    map<T>(callback: (index: number) => T | undefined): T[];
}

/**
 * Controlled properties of LazyTreeView (doesn't has to be lazy)
 */
export interface LazyTreeViewProps {

    logId: string;

    lazyLoader: ILazyTreeViewLoader;

    /**
     *
     */
    addFilterSelected?: boolean;

    /**
     * Adds a search input to the tree filter
     */
    addSearch?: boolean;

    /**
     * Search/Filter text when controlled (addSearch needs to be false)
     */
    search?: string;

    /**
     * Message for the search/filter when empty
     */
    searchPlaceholder?: string;

    /**
     * Message for the search/filter component (might be 'compacted' selection)
     */
    searchMessage?: string;

    toggleFilterSelected?: string;

    disableSelection?: boolean;

    /**
     * the selection state is managed by the lazy tree as well
     */
    selected: string[];

    /**
     * Controlled mode for selection
     */
    setSelected?: (event: React.MouseEvent, treeNode: TreeRowPropsTreeData) => void;

    /**
     * Controlled mode for expanded or initial expanded if not controlled
     */
    expanded?: string[];

    /**
     * Controlled mode for expanded
     */
    setExpanded?: (nodeIdx: string[]) => void;

    /**
     * The level depth of initially open nodes ( 0 first level )
     */
    openDepthLevel?: number;

    /**
     * Material-UI tree item classes Partial<TreeItemClasses>
     */
    treeItemClasses?: Partial<LazyTreeItemClasses>;

    /**
     * Create a custom label for the tree item.
     * @param rowIndex the index of the data object (e.g. column, tidy table)
     * @param label current label. Use this label as text because the filtering is highlighted.
     */
    getTreeItemLabel?: (rowIndex: number, label: string | ReactElement) => string | ReactElement;

    /**
     * If undefined, width and height are calculated automatically.
     */
    width?: number;
    height?: number;

    /**
     * Height of an item in the tree. Defaults to 38.
     */
    itemSize?: number;

    /**
     * @See react-window List
     */
    initialScrollOffset?: number | undefined;

    /**
     * @See react-window List
     */
    onScroll?: ((props: ListOnScrollProps) => any) | undefined;

}
