import {
    TidyTableColumnIdentifier,
    TidyTableColumnSelector,
    TidyTableMappingColumnSelectorOptions,
    TidyTableRoleSelector
} from "./PublicTidyTableTypes";


export function isTidyTableMappingColumnSelectorOptions(v: unknown): v is TidyTableMappingColumnSelectorOptions {
    return typeof v === "string" && v.startsWith('@IC3_');
}

export function isTidyTableColumnIdentifier(v: any): v is TidyTableColumnIdentifier {
    return typeof v === "object" && v != null && typeof v["name"] === "string";
}

export function isTidyTableRoleSelector(v: any): v is TidyTableRoleSelector {
    return typeof v === "object" && v != null && typeof v["role"] === "string";
}

export function isTidyTableColumnSelector(v: unknown): v is TidyTableColumnSelector {
    return isTidyTableMappingColumnSelectorOptions(v)
        || isTidyTableColumnIdentifier(v)
        || isTidyTableRoleSelector(v)
        ;
}

export function isTidyTableColumnsChooser(columnChooserValue: unknown): columnChooserValue is (TidyTableColumnSelector | TidyTableColumnSelector[]) {
    // Type guarding
    if (Array.isArray(columnChooserValue)) {
        if (columnChooserValue.every(v => isTidyTableColumnSelector(v))) {
            return true;
        }
    } else {
        if (isTidyTableColumnSelector(columnChooserValue)) {
            return true;
        }
    }
    return false;
}