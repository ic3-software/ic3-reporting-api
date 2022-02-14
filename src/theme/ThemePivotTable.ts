export class PivotTableClasses {

    static readonly main = "ic3-pt";

    static readonly cell = "ic3-pt-cell";

    static readonly leftHeaderCell = "ic3-pt-col.lh";

    static readonly leftHeaderTitle = "ic3-pt-col.lh .ic3-pt-header-label";

    static readonly topHeaderCell = "ic3-pt-col.th";

    static readonly topHeaderTitle = "ic3-pt-col.th .ic3-pt-header-label";

    static readonly column = "ic3-pt-col";

    static readonly columnSeparator = "ic3-pt .ic3-pt-col-separator";

    static readonly columnSeparatorContent = "ic3-pt .ic3-pt-col-separator-content";

    static readonly icon = "ic3-pt-icon";

    static readonly iconSort = "ic3-pt-icon-sort";

    static readonly emptyHeader = "ic3-pt-empty-header";

    static readonly selected = "ic3-pt-selected";

    static readonly hover = "ic3-pt-hover";

}

/**
 * List of classNames available
 */
export declare type PivotTableClassKey = keyof PivotTableClasses;

export interface PivotTableProps {

    variant?: string;
}

