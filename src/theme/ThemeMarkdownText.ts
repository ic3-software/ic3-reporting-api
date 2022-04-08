import {FormFieldObject} from "../PublicTemplateForm";
import {HtmlBoxVariant} from "./ThemeHtmlBox";

/**
 * Markdown Text Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: MarkdownText
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface MarkdownTextChartOptions extends FormFieldObject {

    /**
     * Variant.
     *
     * Allows for selecting a set of preset options. Note that a variant is possibly overriding defined options.
     */
    variant?: HtmlBoxVariant;

    /**
     * Markdown.
     *
     * A text following the basic syntax of the markdown (GitHub Flavored Markdown (GFM)) markup language
     * ([www](https://www.markdownguide.org/basic-syntax/)).
     */
    "$-markdown"?: string;

}
