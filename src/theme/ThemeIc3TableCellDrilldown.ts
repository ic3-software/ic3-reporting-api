export class ThemeIc3TableCellDrilldownClasses {


    public static loading = "Ic3TableCellDrilldown-loading";
    public static normal = "Ic3TableCellDrilldown-normal";
    public static expanded = "Ic3TableCellDrilldown-expanded";
    public static iconDiv = "Ic3TableCellDrilldown-iconDiv";

}

export declare type ThemeIc3TableCellDrilldownClassesKey = keyof ThemeIc3TableCellDrilldownClasses;

export interface Ic3TableCellDrilldownProps {
    levelDepth: number;
    hasRender: boolean;
    hasChildren: boolean;
}