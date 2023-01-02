export class QueryBuilderNodeClasses {

    static readonly root = "ic3QueryBuilderNode-root";

    static readonly content = "ic3QueryBuilderNode-content";

    static readonly itemText = "ic3QueryBuilderNode-itemText";

    static readonly mdxIcon = "ic3QueryBuilderNode-mdxInfo";

    static readonly extraInfo = "ic3QueryBuilderNode-extraInfo";

    static readonly expandButton = "ic3QueryBuilderNode-expandButton";

}

export declare type QueryBuilderNodeClassKey = keyof QueryBuilderNodeClasses;

export interface QueryBuilderNodeProps {
    depth: number;
    type: string;
}