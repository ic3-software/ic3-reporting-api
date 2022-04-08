import {FormFieldObject} from "../PublicTemplateForm";

/**
 * Image Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: Image
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface ImageChartOptions extends FormFieldObject {

    /**
     * URL.
     *
     * An absolute or relative URL.
     */
    urlToImage: string;

}

