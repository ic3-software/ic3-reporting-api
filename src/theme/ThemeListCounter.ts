
export class ListCounterClasses {

    static readonly counter = "ic3Counter";

    /**
     * Classname added to the root when the orientation is vertical.
     */
    static readonly vertical = "ic3ListCounter-vertical";

    static readonly labelRoot = "ic3ListCounter-labelRoot";
    static readonly label = "ic3ListCounter-Label";
    static readonly labelRemove = "ic3ListCounter-labelRemove";

    static readonly labelSmallSize = "ic3ListCounter-Label-SizeMin";
    static readonly labelMediumSize = "ic3ListCounter-Label-SizeMedium";

}

export declare type ListCounterClassKey = keyof ListCounterClasses;

export interface ListCounterProps {

}