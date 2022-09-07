import {FormFieldDef, FormFieldObject, FormFields} from "./PublicTemplateForm";
import {ITidyTable} from "./PublicTidyTable";
import {IPublicContext} from "./PublicContext";

export interface ILocalizationContext {

    localizeDescription(...args: any[]): string;

    localizeDescriptionEx<T extends FormFieldObject>(context: ILocalizationContext, fieldMeta: FormFieldDef[] | FormFields<T>, persistentOption: T, ...fields: (keyof T)[]): string;

    localize(name: string, ...args: any[]): string;

}


export interface ITidyTableTransformation<OPTIONS extends FormFieldObject> {

    /**
     * The id of the transformation. Use this id to reference the transformation in the localization.
     */
    id: string;

    /**
     * The id of the editor group that the transformation is in.
     */
    groupId: string;

    /**
     * Internal usage: pluginID.id
     */
    qualifiedId?: string;

    /**
     * Widgets from these templates can use the transformation. Leave undefined for all widgets.
     * E.g., ic3.Table for the table widget.
     */
    allowedByWidgetTemplate?: string[];

    /**
     * Return the description to show below the transformation in the 'TRANSFORMATION' tab of the editor
     * @param context used for accessing localization functions
     * @param options user-set options for the transformation
     */
    getDescription?(context: ILocalizationContext, options: OPTIONS): string;

    /**
     * Return the field meta for the user-editable options
     */
    getFieldMeta(): FormFieldDef[] | FormFields<OPTIONS>;

    /**
     * Run the transformation.
     * @param context public context
     * @param table modify this table in the transformation. It is mutable.
     * @param options user-set options for the transformation
     */
    apply(context: IPublicContext, table: ITidyTable, options: OPTIONS): void;

}
