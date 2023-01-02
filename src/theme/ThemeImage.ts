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

    /**
     * Resize the image, read more here, https://www.w3schools.com/css/css3_object-fit.asp.
     */
    resizeImage: ImageResizingOptions;
}

export enum ImageResizingOptions {
    NONE = "none",
    FILL = "fill",
    CONTAIN = "contain",
    COVER = "cover",
    SCALE_DOWN = "scale-down"
}
