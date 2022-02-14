import {IWidgetEditorPublicContext} from "./PublicContext";
import {ITidyColumn} from "./PublicTidyColumn";
import * as React from "react";
import {AutocompleteRenderInputParams, AutocompleteRenderOptionState} from "@mui/material/Autocomplete/Autocomplete";
import {TidyColumnsType, TidyTableColumnSelector} from "./PublicTidyTableTypes";


export function formFieldIsSelection(field: IFormFieldDef<any>) {
    return field.group === IFormFieldGroupTypes.Selection;
}

export interface IFormFieldDef<DEFAULT_VALUE_TYPE> {

    /**
     * The path of the field within the edited bean.
     */
    fieldPath: string;

    /**
     * Default: false ,
     *
     * If defaultValue is defined,
     */
    mandatory?: boolean;

    /**
     * The default value defined at field level (note: can be defined at Theme level as well).
     */
    defaultValue?: DEFAULT_VALUE_TYPE;

    /**
     * Override fieldPath to search for a default value in the Theme.
     */
    defaultValuePath?: string;

    /**
     * The optional group a field belongs too
     *
     * @see IFormGroupsFieldDef
     * @see IFormBooleanFieldDef
     */
    group?: string;

    /**
     * When defined, the value is added as a prefix to the fieldPath to defined the localization tag.
     */
    fieldPrefixTag?: IFormFieldGroupTypes | string;

    /**
     * When defined, this tag is used for localization
     */
    localizationTag?: string;

    /**
     * Default: "string".
     */
    fieldType: FormFieldType;

    /**
     * Override default localization.
     */
    fieldDescription?: string;

    /**
     * Default: false
     */
    readOnly?: boolean;

    /**
     * An optional field path value. The value of this field depends on the value of the dependsOn field.
     */
    dependsOn?: string | string[];

    /**
     * When defined a function that returns the visibility of the field according to the dependsOn value.
     */
    dependsOnVisibility?: boolean | ((dependsOnValue?: any) => boolean);

    /**
     * When defined a function that returns the visibility of the field.
     */
    visibility?: boolean | ((context: IWidgetEditorPublicContext) => boolean);

    /**
     * When defined the content of the field is translated (using context.translateContent).
     *
     * Only works for chart/widgetOptions !!
     */
    translated?: boolean;

}

/**
 * The options (possibly edited and/or from the theme) of a widget.
 *
 * Aka Props
 */
export interface FormFieldObject {

    // we need this so extends FormFieldObject works (typescript uses the definition of the interface not it's name)
    readonly '0242ac130003': '0242ac130003';

}

export type FormFields<T extends FormFieldObject> = {
    [key in keyof Omit<T, '0242ac130003'>]-?:   // make the key mandatory even though the field is optional
    (
        // defaultValue mandatory if the field is non nullable in T
        Required<T>[key] extends FormFieldObject ? { defaultValue?: any } :
            undefined extends NonNullable<T>[key] ? { defaultValue?: any } : { defaultValue: unknown } | { mandatory: true }
        )
    &
    (
        // A field cannot both be mandatory and have a default value
        // Only use mandatory when there is an action required by the user
        Required<T>[key] extends FormFieldObject ? unknown : { defaultValue?: any, mandatory?: true } | { defaultValue?: any, mandatory?: false }
        )
    &
    (
        // matching T type with FormField type
        Required<T>[key] extends FormFieldObject ? Omit<IFormEmbeddedFieldDef<Required<T>[key]>, 'fieldPath'> :
            Required<T>[key] extends IPaletteDef ? Omit<IFormPaletteEditorFieldDef, 'fieldPath'> :
                Required<T>[key] extends IColorDef ? Omit<IFormColorEditorFieldDef, 'fieldPath'> :
                    Required<T>[key] extends TidyTableColumnSelector[] ? Omit<IFormColumnChooserFieldDef, 'fieldPath'> :
                        Required<T>[key] extends TidyTableColumnSelector ? Omit<IFormColumnChooserFieldDef, 'fieldPath'> :
                            Required<T>[key] extends boolean ? Omit<IFormBooleanFieldDef, 'fieldPath'> :
                                Required<T>[key] extends number ? Omit<IFormNumberFieldDef, 'fieldPath'> :
                                    Required<T>[key] extends string ? Omit<IFormOptionFieldSingleDef, 'fieldPath'>
                                        | Omit<IFormStringFieldDef, 'fieldPath'>
                                        | Omit<IFormFormatterPickerFieldDef, 'fieldPath'>
                                        | Omit<IFormWidgetVariantFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableTextExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableTextRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableHtmlRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableHtmlExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableNumericExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableNumericRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableColorRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableStringRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormTidyTableScaleRowExprFieldDef, 'fieldPath'>
                                        | Omit<IFormJsFieldDef, 'fieldPath'>
                                        | Omit<IFormJsonFieldDef, 'fieldPath'>
                                        | Omit<IFormMarkdownFieldDef, 'fieldPath'> :

                                        Required<T>[key] extends string[] ? Omit<IFormOptionFieldMultipleDef, 'fieldPath'>
                                            | Omit<IFormGroupsFieldDef, 'fieldPath'> :

                                            never /* type not supported */
        )
};

export enum IFormFieldGroupTypes {
    Selection = 'selection',
    FilterGeneralOption = 'filterGeneralOptionsGroup',
    FilterItem = 'filterItemGroup',
}

export type FormFieldType =
    |
    /**
     * @see IFormReportPathFieldDef
     */
    "appPath" |
    /**
     * @see IFormAutocompleteFieldDef
     */
    "autocomplete" |
    /**
     * @see IFormBooleanFieldDef
     */
    "boolean" |
    /**
     * @see IFormColorEditorFieldDef
     */
    "color" |
    /**
     * @see IFormColumnChooserFieldDef
     */
    "columnsChooser" |
    /**
     * @see IFormColumnSelectionFieldDef
     */
    "columnSelection" |
    /**
     * @see IFormArrayStringRecordsFieldDef
     */
    "eventMappingArray" |
    /**
     * @see IFormEmbeddedFieldDef
     */
    "embedded" |
    /**
     * @see IFormFileUploaderFieldDef
     */
    "fileUploader" |
    /**
     * @see IFormFormatterPickerFieldDef
     */
    "formatterPicker" |
    /**
     * @see IFormBooleanFieldDef
     */
    "groupBoolean" |
    /**
     * @see IFormGroupsFieldDef
     */
    "groups" |
    /**
     * @see IFormJsFieldDef
     */
    "js" |
    /**
     * @see IFormJsonFieldDef
     */
    "json" |
    /**
     * @see IFormMarkdownFieldDef
     */
    "markdown" |
    /**
     * @see IFormMdxFieldDef
     */
    "mdxExpression" |
    /**
     * @see IFormMuiVariantFieldDef
     */
    "number" |
    /**
     * @see IFormOptionFieldDef
     */
    "option" |
    /**
     * @see IFormColorEditorFieldDef
     */
    "palette" |
    /**
     * @see IFormReportPathFieldDef
     */
    "reportFolder" |
    /**
     * @see IFormReportPathFieldDef
     */
    "reportPath" |
    /**
     * @see IFormReportPermaLinkFieldDef
     */
    "reportPermaLink" |
    /**
     * @see IFormStringFieldDef
     */
    "string" |
    /**
     * @see IFormTidyTableHtmlExprFieldDef
     */
    "tidyTableHtmlExpr" |
    /**
     * @see IFormTidyTableHtmlRowExprFieldDef
     */
    "tidyTableHtmlRowExpr" |
    /**
     * @see IFormTidyTableNumericExprFieldDef
     */
    "tidyTableNumericExpr" |
    /**
     * @see IFormTidyTableNumericRowExprFieldDef
     */
    "tidyTableNumericRowExpr" |
    /**
     * @see IFormTidyTableStringRowExprFieldDef
     */
    "tidyTableStringRowExpr" |
    /**
     * @see IFormTidyTableColorRowExprFieldDef
     */
    "tidyTableColorRowExpr" |
    /**
     * @see IFormTidyTableScaleRowExprFieldDef
     */
    "tidyTableScaleRowExpr" |
    /**
     * @see IFormTidyTableTextExprFieldDef
     */
    "tidyTableTextExpr" |
    /**
     * @see IFormTidyTableTextRowExprFieldDef
     */
    "tidyTableTextRowExpr" |
    /**
     * @see IFormWidgetVariantFieldDef
     */
    "widgetVariant"
    ;

export type FormFieldTidyTableExprType =
    "tidyTableHtmlExpr" |
    "tidyTableHtmlRowExpr" |
    "tidyTableNumericExpr" |
    "tidyTableNumericRowExpr" |
    "tidyTableScaleRowExpr" |
    "tidyTableTextExpr" |
    "tidyTableTextRowExpr" |
    "tidyTableStringRowExpr" |
    "tidyTableColorRowExpr"
    ;

export function isTidyTableExpr(type: FormFieldType): type is FormFieldTidyTableExprType {
    return type === "tidyTableHtmlExpr"
        || type === "tidyTableHtmlRowExpr"
        || type === "tidyTableTextExpr"
        || type === "tidyTableTextRowExpr"
        || type === "tidyTableNumericExpr"
        || type === "tidyTableNumericRowExpr"
        || type === "tidyTableStringRowExpr"
        || type === "tidyTableColorRowExpr"
        || type === "tidyTableScaleRowExpr"
        ;
}

export function isTidyTableExprTable(type: FormFieldType) {
    return type === "tidyTableHtmlExpr"
        || type === "tidyTableTextExpr"
        || type === "tidyTableNumericExpr"
        ;
}

export function isTidyTableExprRow(type: FormFieldType): boolean {
    return type === "tidyTableHtmlRowExpr"
        || type === "tidyTableTextRowExpr"
        || type === "tidyTableNumericRowExpr"
        || type === "tidyTableStringRowExpr"
        || type === "tidyTableColorRowExpr"
        || type === "tidyTableScaleRowExpr"
        ;
}

export function isTidyTableExprText(type: FormFieldType) {
    return type === "tidyTableHtmlExpr"
        || type === "tidyTableHtmlRowExpr"
        || type === "tidyTableTextExpr"
        || type === "tidyTableTextRowExpr"
        ;
}

export function isTidyTableExprTextHtml(type: FormFieldType) {
    return type === "tidyTableHtmlExpr"
        || type === "tidyTableHtmlRowExpr"
        ;
}

export function isTidyTableExprNumeric(type: FormFieldType) {
    return type === "tidyTableNumericExpr"
        || type === "tidyTableNumericRowExpr"
        ;
}

export function isTidyTableExprScale(type: FormFieldType) {
    return type === "tidyTableScaleRowExpr"
        ;
}

/**
 * Error messages for field suggestions and value candidates.
 * Put translations in ReportLocalization.csv.
 */
export enum AutocompleteNoOptionsText {
    NO_OPTIONS = "NO_OPTIONS",
    NO_QUERY_RESULT = "NO_QUERY_RESULT",
}

export type CodeMirrorMode =
    "plain" |
    "mdx" |
    "sql" |
    "js" |
    "json" |
    "csv" |
    "md" |
    FormFieldTidyTableExprType
    ;

export function isCodeMirrorModeExpr(mode: CodeMirrorMode) {
    return mode === "tidyTableHtmlExpr"
        || mode === "tidyTableHtmlRowExpr"
        || mode === "tidyTableTextExpr"
        || mode === "tidyTableTextRowExpr"
        || mode === "tidyTableNumericExpr"
        || mode === "tidyTableNumericRowExpr"
        || mode === "tidyTableScaleRowExpr"
        || mode === "tidyTableStringRowExpr"
        || mode === "tidyTableColorRowExpr"
        ;
}

export type FormFieldDialogEditorModelType =
    "unknown" |
    "markdown" |
    "mdxExpression" |
    FormFieldTidyTableExprType
    ;

export interface IColorDef {

    /**
     * aka. name
     */
    path: string;

}

export interface IPaletteDef {

    /**
     * aka. name
     */
    path: string;

    reversed: boolean;

}

export interface IOption {

    id: string;
    caption: string;

}

/**
 * A generic object.
 *
 * Use the editorConf to provide the list of options to choose from and the function that is displaying
 * the label/caption of the options. Check the editorConf for more configuration.
 *
 * This is quite a generic editor that should not be used directly.
 *
 * @see FormFieldDef
 */
export interface IFormAutocompleteFieldDef<OPTION> extends IFormFieldDef<OPTION> {

    fieldType: "autocomplete",

    editorConf: {

        multiple?: boolean;
        groupBy?: (option: OPTION | undefined) => string;
        getOptionLabel?: (option: OPTION | undefined | null) => string;
        isOptionEqualToValue?: (option: OPTION | undefined | null, value: OPTION | undefined | null) => boolean;

        freeSolo?: boolean;

        optionValues?: OPTION[] | ((callback: ((suggestions: OPTION[]) => void), dependsOnValue?: any) => void);
        optionValuesObsolete?: boolean;
        optionValuesObsoleteMessage?: string;

        noOptionsText?: AutocompleteNoOptionsText;

        renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;

        renderOption?: (
            props: React.HTMLAttributes<HTMLLIElement>,
            option: OPTION,
            state: AutocompleteRenderOptionState,
            onClose: () => void
        ) => React.ReactNode;

        disableClearable?: boolean;

    }
}

/**
 * The "groupBoolean" allows for using that field as a group header and as a way
 * to enable/disable the options in the group.
 *
 * @see FormFieldDef
 * @see IFormGroupsFieldDef
 */
export interface IFormBooleanFieldDef extends IFormFieldDef<boolean> {

    fieldType: "boolean" | "groupBoolean",

}

/**
 * @see FormFieldDef
 */
export interface IFormColorEditorFieldDef extends IFormFieldDef<IColorDef> {

    fieldType: "color",

}

/**
 * @see FormFieldDef
 *
 * Use the fieldPath to access the column directly in the tidy table with table.getColumnByAlias(...).
 * If multiple columns are in this field, it returns the first column.
 *
 * If the columns chooser is mandatory, the widget or transformation returns an error if there is no column either
 * selected by the user or in the fallback.
 *
 */
export type IFormColumnChooserFieldDef = IFormColumnChooserSingleFieldDef | IFormColumnChooserMultipleFieldDef;

interface IFormColumnChooserSingleFieldDef extends IFormFieldDef<TidyTableColumnSelector> {

    fieldType: "columnsChooser",

    editorConf?: {

        /**
         * The user can select multiple columns / selectors
         */
        multiple?: false;

        /**
         * The user can select the same column more than once
         */
        allowDuplicate?: boolean;

        /**
         * Only columns of this/these type(s) are allowed.
         */
        allowedTypes?: TidyColumnsType[] | ((column: ITidyColumn) => boolean);

        /**
         * The user can select properties of columns
         */
        includeProperties?: boolean;

        /**
         * The user can choose a selector, see TidyTableMappingColumnSelectorOptions
         */
        includeSelectors?: boolean;

        /**
         * Fallback to a column that has a type that is allowed. Note, properties of columns are not considered.
         *
         * It finds the column to fallback on by
         * 1. role equal to fieldPath and type is allowed,
         * 2. role equal to editorConfig.alias and type is allowed,
         * 3. type is allowed.
         *
         * Already mapped columns are skipped.
         */
        fallback?: boolean;

        /**
         * In the expression editor, use the alias to reference the column. Use the alias in table.getColumnByAlias(...).
         */
        alias?: string;
    }

}

interface IFormColumnChooserMultipleFieldDef extends IFormFieldDef<TidyTableColumnSelector[]> {

    fieldType: "columnsChooser",

    editorConf?: {

        /**
         * The user can select multiple columns / selectors
         */
        multiple: true;

        /**
         * The user can select the same column more than once
         */
        allowDuplicate?: boolean;

        /**
         * Only columns of this/these type(s) are allowed.
         */
        allowedTypes?: TidyColumnsType[] | ((column: ITidyColumn) => boolean);

        /**
         * The user can select properties of columns
         */
        includeProperties?: boolean;

        /**
         * The user can choose a selector, see TidyTableMappingColumnSelectorOptions
         */
        includeSelectors?: boolean;

        /**
         * Fallback to a column that has a type that is allowed. Note, properties of columns are not considered.
         *
         * It finds the column to fallback on by
         * 1. role equal to fieldPath and type is allowed,
         * 2. role equal to editorConfig.alias and type is allowed,
         * 3. type is allowed.
         *
         * Already mapped columns are skipped.
         */
        fallback?: boolean;

        /**
         * In the expression editor, use the alias to reference the column. Use the alias in table.getColumnByAlias(...).
         */
        alias?: string;
    }

}


/**
 * @see FormFieldDef
 */
export interface IFormColumnSelectionFieldDef extends IFormFieldDef<any> {

    fieldType: "columnSelection",

    editorConf: {

        columnAlias: string;
        multiple?: boolean;

    }

}

/**
 * @see FormFieldDef
 */
export interface IFormEventMappingArrayFieldDef extends IFormFieldDef<any> {

    fieldType: "eventMappingArray",

}

/**
 * Contains the ordering of the groups.
 *
 * An optional (and invisible) field that is defining how the groups are ordered (does not need to contain all
 * the groups). When none defined, the groups order depends on the field order themselves.
 *
 * @see FormFieldDef
 * @see IFormBooleanFieldDef
 */
export interface IFormGroupsFieldDef extends IFormFieldDef<string[]> {

    fieldType: "groups",
    groups: string[];

}

/**
 * @see FormFieldDef
 */
export interface IFormJsFieldDef extends IFormFieldDef<string> {

    fieldType: "js",

}

/**
 * @see FormFieldDef
 */
export interface IFormJsonFieldDef extends IFormFieldDef<string> {

    fieldType: "json",

}

/**
 * @see FormFieldDef
 */
export interface IFormFileUploaderFieldDef extends IFormFieldDef<any> {

    fieldType: "fileUploader",

    editorConf: {

        acceptedFileExt?: string;
        dropMessage: string;

    }

}

/**
 * @see FormFieldDef
 */
export interface IFormMarkdownFieldDef extends IFormFieldDef<string> {

    fieldType: "markdown",

}

export type MdxExpressionType = "calcMeasure" | "drilldown";

/**
 * @see FormFieldDef
 */
export interface IFormMdxFieldDef extends IFormFieldDef<string> {

    fieldType: "mdxExpression",

    editorConf: {

        mdxExpressionType: MdxExpressionType;

        metaReadOnly?: boolean;
        schemaName?: string;
        cubeName?: string;

    }
}

/**
 * @see FormFieldDef
 */
export interface IFormNumberFieldDef extends IFormFieldDef<number> {

    fieldType: "number",

}

/**
 * A string that is chosen from the list of available values (aka. options).
 *
 * Typically used to edit an "enum" where the user can select the value from a list of "localized" options.
 * The editorConf is setup as following:
 * <pre>
 *      editorConf: {
 *          optionValues: Object.values(SortingType),
 *          optionName: "SortingType"                    -- localization purpose
 *      }
 * </pre>
 *
 * This editor is not limited to enum as the editorConf.optionValues is accepting a function resolving the
 * actual list of options as an array of {id,caption} objects. E.g., editing a locale, theme, etc...
 *
 * Editing a list of strings is supported using the editorConf.multiple flag.
 *
 * @see FormFieldDef
 */

export type IFormOptionFieldDef = IFormOptionFieldMultipleDef | IFormOptionFieldSingleDef;

export interface IFormOptionFieldMultipleDef extends IFormFieldDef<string[]> {

    fieldType: "option",

    editorConf: {
        freeSolo?: boolean;

        multiple: true;
        allowDuplicate?: boolean;

        optionValues?: string[] | IOption[] | ((callback: ((suggestions: string[] | IOption[]) => void), dependsOnValue?: any) => void);
        optionName?: string;

        getCaption?: (id: string) => string;
    }
}


export interface IFormOptionFieldSingleDef extends IFormFieldDef<string> {

    fieldType: "option",

    editorConf: {

        freeSolo?: boolean;

        multiple?: false;
        allowDuplicate?: boolean;

        optionValues?: string[] | IOption[] | ((callback: ((suggestions: string[] | IOption[]) => void), dependsOnValue?: any) => void);
        optionName?: string;

        getCaption?: (id: string) => string;
    }

}

export interface IFormEmbeddedFieldDef<T extends FormFieldObject> extends IFormFieldDef<T> {

    fieldType: "embedded",

    editorConf: {

        fieldPathPrefix: string;

        meta: FormFields<T>;

    }

}

/**
 * @see FormFieldDef
 */
export interface IFormPaletteEditorFieldDef extends IFormFieldDef<IPaletteDef> {

    fieldType: "palette",

    editorConfig?: {
        path: string,
        reversed: boolean
    }

}

/**
 * @see FormFieldDef
 */
export interface IFormReportPathFieldDef extends IFormFieldDef<string> {

    fieldType: "appPath" | "reportFolder" | "reportPath",

}

/**
 * @see FormFieldDef
 */
export interface IFormReportPermaLinkFieldDef extends IFormFieldDef<string> {

    fieldType: "reportPermaLink",

}

/**
 * Use editorConf.suggestions to provide a list of possible values. Then the editor is an autocomplete
 * displaying the suggestions using the freeSolo mode to enter any kind of value.
 *
 * @see FormFieldDef
 */
export interface IFormStringFieldDef extends IFormFieldDef<string> {

    fieldType: "string",

    editorConf?: {

        /**
         * A list of possible strings...
         */
        suggestions?: string[] | ((callback: ((candidates: string[]) => void), dependsOnValue?: any) => void);

        copyToClipboard?: boolean;
    }

}

/**
 * An HTML (markdown) text expression containing tidy table value accessor (e.g., Donut's center text).
 * The evaluation context is the table.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableHtmlExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableHtmlExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * An HTML (markdown) text expression containing tidy table value accessor (e.g., chart's tooltip).
 * The evaluation context is a row.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableHtmlRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableHtmlRowExpr",

    editorConf?: {
        defaultColumn?: boolean,

        /**
         * Default = available columns + roles. Set here to override.
         */
        completionMeta?: string[];
    },

}

/**
 * A numeric expression containing tidy table value accessor (e.g., chart's value axis minimum).
 * The evaluation context is the table.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableNumericExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableNumericExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * A string expression containing tidy table value accessor (e.g., chart's value axis minimum).
 * The evaluation context is the table.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableStringRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableStringRowExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * A color (i.e., string) expression containing tidy table value accessor (e.g., chart's value axis minimum).
 * The evaluation context is the table.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableColorRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableColorRowExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * A numeric expression containing tidy table value accessor (e.g., chart's value axis minimum).
 * The evaluation context is a row.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableNumericRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableNumericRowExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * A numeric expression containing tidy table value accessor (e.g., chart's value axis minimum).
 * The evaluation context is a row.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableScaleRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableScaleRowExpr",

    editorConf: {
        defaultColumn: true,
    },

}

/**
 * A text expression containing tidy table value accessor (e.g., Donut's center text).
 * The evaluation context is the table.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableTextExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableTextExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * A text expression containing tidy table value accessor (e.g., cell renderer link).
 * The evaluation context is a row.
 *
 * @see FormFieldDef
 */
export interface IFormTidyTableTextRowExprFieldDef extends IFormFieldDef<string> {

    fieldType: "tidyTableTextRowExpr",

    editorConf?: {
        defaultColumn?: boolean,
    },

}

/**
 * icCube variants (defined in the theme's ic3.widgetVariants).
 *
 * @see FormFieldDef
 */
export interface IFormWidgetVariantFieldDef extends IFormFieldDef<string> {

    fieldType: "widgetVariant",

    editorConf?: {
        componentName: string,
        predefinedVariants?: string[];
    }
}

 export interface IFormFormatterPickerFieldDef extends IFormFieldDef<string> {
    fieldType: "formatterPicker"
}


// ---------------------------------------------------------------------------------------------------------------------
//      Allows for typing the field meta definitions.
// ---------------------------------------------------------------------------------------------------------------------

export type FormFieldDef =
    IFormAutocompleteFieldDef<any> |
    IFormBooleanFieldDef |
    IFormColorEditorFieldDef |
    IFormColumnChooserFieldDef |
    IFormColumnSelectionFieldDef |
    IFormEventMappingArrayFieldDef |
    IFormFileUploaderFieldDef |
    IFormGroupsFieldDef |
    IFormJsFieldDef |
    IFormMarkdownFieldDef |
    IFormMdxFieldDef |
    IFormNumberFieldDef |
    IFormOptionFieldDef |
    IFormOptionFieldSingleDef |
    IFormOptionFieldMultipleDef |
    IFormPaletteEditorFieldDef |
    IFormReportPathFieldDef |
    IFormReportPermaLinkFieldDef |
    IFormStringFieldDef |
    IFormTidyTableHtmlExprFieldDef |
    IFormTidyTableHtmlRowExprFieldDef |
    IFormTidyTableNumericExprFieldDef |
    IFormTidyTableNumericRowExprFieldDef |
    IFormTidyTableStringRowExprFieldDef |
    IFormTidyTableColorRowExprFieldDef |
    IFormTidyTableScaleRowExprFieldDef |
    IFormTidyTableTextExprFieldDef |
    IFormTidyTableTextRowExprFieldDef |
    IFormWidgetVariantFieldDef |
    IFormFormatterPickerFieldDef
    ;


export function createGroupsMeta(groups: string[]): IFormGroupsFieldDef {
    return {
        fieldType: "groups",
        groups: groups,
        fieldPath: ""
    };
}
