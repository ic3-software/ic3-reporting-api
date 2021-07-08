import {FormFieldDef, FormFieldObject, FormFields} from "./PublicTemplateForm";
import {ITidyTable} from "./PublicTidyTable";
import {IPublicContext} from "./PublicContext";

export interface ILocalizationContext {

    localizeDescription(...args: any[]): string;

    localizeDescriptionEx<T extends FormFieldObject>(context: ILocalizationContext, fieldMeta: FormFieldDef[] | FormFields<T>, persistentOption: T, ...fields: (keyof T)[]): string;

    localize(name: string, ...args: any[]): string;

}


export interface ITidyTableTransformation<OPTIONS extends FormFieldObject> {

    id: string;

    groupId: string;

    /**
     * Internal usage: pluginID.id
     */
    qualifiedId?: string;

    getDescription?(context: ILocalizationContext, options: OPTIONS): string;

    getFieldMeta(): FormFieldDef[] | FormFields<OPTIONS>;

    validateOptions(options: any): options is OPTIONS;

    apply(context: IPublicContext, table: ITidyTable, options: OPTIONS): void;

}
