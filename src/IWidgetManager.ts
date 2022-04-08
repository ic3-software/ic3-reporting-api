import {IPublicWidgetTemplateDefinition, IWrappedWidgetTemplateDefinition} from "./PublicTemplate";
import {WidgetTemplateIDs} from "./PublicTemplates";
import {FormFieldObject} from "./PublicTemplateForm";

export interface IWidgetManager {

    registerWidget<OPTIONS extends FormFieldObject>(widget: IPublicWidgetTemplateDefinition<OPTIONS>): void;

    registerWrappedWidget<WIDGET extends WidgetTemplateIDs>(widget: IWrappedWidgetTemplateDefinition<WIDGET>): void;

}
