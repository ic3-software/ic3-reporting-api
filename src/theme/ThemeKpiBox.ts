import {FormFieldObject} from "../PublicTemplateForm";
import {HtmlBoxVariant} from "./ThemeHtmlBox";

/**
 * KPI Box Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: KpiBox
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface KpiBoxChartOptions extends FormFieldObject {

    variant?: HtmlBoxVariant;

    /**
     * Pre Markdown.
     *
     * Expression that returns a markdown text. Evaluated once before row's markdown.
     */
    preMarkdown?: string;

    /**
     * Markdown.
     *
     * Expression that returns a markdown text. Evaluated for each row of the tidy table.
     */
    markdown: string;

    /**
     * Post Markdown.
     *
     * Expression that returns a markdown text. Evaluated once after row's markdown.
     */
    postMarkdown?: string;

}

