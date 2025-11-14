import {FormFieldType, IFormFieldDef} from "./PublicTemplateForm";
import {TidyTableColumnSelector} from "./PublicTidyTableTypes";


export interface IFormTidyTableExprFieldDef<FIELD_TYPE extends FormFieldType> extends IFormFieldDef<string>  {
    fieldType: FIELD_TYPE,

    editorConf?: {
        /**
         * If true, user can use select a column in the dialog editor. This column then is the _currentColumn in the
         * expression when evaluating in the dialog editor.
         */
        userSelectsCurrentColumn?: boolean,

        /**
         * If true, user can use _currentColumn in the expression.
         * The default current column comes from the first dependsOn option.
         */
        useCurrentColumn?: boolean,

        /**
         * Selector for populating the current column in the editor.
         */
        initialCurrentColumn?: TidyTableColumnSelector,

        /**
         * If true, user can use _selectedColumns in the expression.
         * The default selected columns come from the second dependsOn option.
         */
        useSelectedColumns?: boolean,

        /**
         * Set here to override the available columns and roles in the completion meta.
         */
        completionMeta?: string[];
    },
}