export class ThemeIc3TableCellClasses {

}

export declare type ThemeIc3TableCellClassesKey = keyof ThemeIc3TableCellClasses;

export interface Ic3TableCellProps {
    align?: 'left' | 'right' | 'center';

    /**
     * True if and only if the cell has a cell-renderer.
     */
    hasRenderer?: boolean;
}