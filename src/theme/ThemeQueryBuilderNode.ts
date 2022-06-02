export class ThemeQueryBuilderNodeClasses {

    static readonly root = "root";

}

export declare type ThemeQueryBuilderNodeClassKey = keyof ThemeQueryBuilderNodeClasses;

export interface QueryBuilderNodeProps {
    depth: number;
    type: string;
}