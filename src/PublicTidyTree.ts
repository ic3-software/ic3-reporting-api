import {ITidyBaseColumn, ITidyColumn} from "./PublicTidyColumn";

/**
 * a tree node that with origin in a TidyColumn
 */
export interface TidyTreeNode {

    /**
     * the column the tree node was generated from
     */
    originalColumn?: ITidyColumn;

    /**
     * the rows that the node is created from
     */
    rowIds: number[];

    /**
     * the label/value of this node
     */
    nodeLabel: any;

    /**
     * children of this tree
     */
    children: TidyTreeNode[];

    /**
     * True if and only if the node is the root node
     */
    isRoot: boolean;
}

type ArrayReducer<T> = (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T;

/**
 * A tree structure that was generated from a TidyTable.
 *
 * Table:
 * budget type | cc
 * Monthly Budget | Savings
 * Monthly Budget | Mortgage/Rent
 * Yearly Budget | Car Payment
 *
 * converts to <nodeLabel> <rowIds>:
 * root [0,1,2]
 *  |
 *  --- Monthly Budget [0,1]
 *  |     |
 *  |     --- Savings [0]
 *  |     |
 *  |     --- Mortgage/Rent [1]
 *  |
 *  --- Yearly Budget [3]
 *       |
 *       --- Car Payment [3]
 *
 */
export class TidyTree {

    root: TidyTreeNode;

    constructor(root?: TidyTreeNode) {
        this.root = {
            rowIds: [],
            nodeLabel: 'root',
            children: [],
            isRoot: true,
            ...root
        };
    }

    /**
     * A unique id for each node of the tree
     * returns levelDepth + "--" + node.nodeLabel
     */
    static getUniqueId(node: TidyTreeNode, levelDepth: number): string {
        return levelDepth + "--" + node.nodeLabel + "--" + node.rowIds[0];
    }

    /**
     * Performs the specified action on each node of the tree.
     * If callbackfn return false, it will not perform a foreach on it's children.
     * The callback function does not run for the root node.
     * Leveldepth = number of nodes between node and the root node.
     */
    forEach<T>(callbackfn: ForEachNodeCallbackFn<T>, getTopParentStat?: (topParentNode: TidyTreeNode) => T): void {

        function forEachNested(children: TidyTreeNode[], levelDepth: number, parent: TidyTreeNode, callbackfn: ForEachNodeCallbackFn<T>, topParentStat?: T) {
            children.forEach((node, idx) => {
                if (callbackfn(node, levelDepth, parent, idx, topParentStat) !== false) {
                    forEachNested(node.children, levelDepth + 1, node, callbackfn, topParentStat);
                }
            })
        }

        this.root.children.forEach((topParentNode, idx) => {
            const topParentSummary = getTopParentStat != null ? getTopParentStat(topParentNode) : undefined;
            if (callbackfn(topParentNode, 0, this.root, idx, topParentSummary) !== false) {
                forEachNested(topParentNode.children, 1, topParentNode, callbackfn, topParentSummary);
            }
        });

    }

    /**
     * aggregates all children measures values on parents using aggregation function recursively
     * aggrfn is sum by default
     */
    getNodeValue<T>(node: TidyTreeNode, measure: ITidyBaseColumn<T>, aggrfn?: ArrayReducer<T>): T {
        if (node.originalColumn?.isHierarchy()) {
            return measure.getValue(node.rowIds[0]);
        }
        const aggregateValues = aggrfn ?? sumAggregation;
        if (node.isRoot) {
            return [...measure.getValues()].reduce(aggregateValues);
        }
        const values = node.rowIds.map(i => measure.getValue(i));
        return values.reduce(aggregateValues);
    }
}

function sumAggregation(a: any, b: any) {
    if (a == null)
        return b;
    if (b == null)
        return a;
    return a + b;
}

/**
 * Top parent node = the node that is a direct child of root and of which node is a descendant.
 */
export type ForEachNodeCallbackFn<T> = (node: TidyTreeNode, levelDepth: number, parent: TidyTreeNode, nodeChildrenIdx: number, parentSummary?: T) => boolean | void;