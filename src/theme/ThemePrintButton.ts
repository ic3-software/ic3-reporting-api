import {FormFieldObject} from "../PublicTemplateForm";

export class PrintButtonClasses {

    static readonly root: string = "ic3PrintButton";

    static readonly progress: string = "ic3PrintButton-progress";

    static readonly cancel: string = "ic3PrintButton-cancel";

}

export declare type PrintButtonClassKey = keyof PrintButtonClasses;

/**
 * Print Button Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: PrintButton
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface PrintButtonChartOptions extends FormFieldObject {

    caption: string;

    variant: "text" | "outlined" | "contained" | string;

    withDialog: boolean;

}

export interface StyledPrintButtonDivProps {

    variant: "text" | "outlined" | "contained" | string;

}