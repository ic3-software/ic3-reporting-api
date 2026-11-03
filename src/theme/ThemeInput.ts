import {FormFieldObject} from "../PublicTemplateForm";

/**
 * Input Options (fields of the "Chart" tab in the widget editor).
 *
 * The event is fired on 'Enter' (or on the button click if any).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: Input
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface InputChartOptions extends FormFieldObject {

    /**
     * Label.
     */
    label?: string;

    /**
     * Placeholder.
     *
     * The text displayed when the input box is empty.
     */
    placeholder?: string;

    /**
     * Initial Value.
     *
     * The value of the input box when the dashboard is opened. If defined, the event is fired at start.
     */
    initialValue?: string;

    /**
     * With Button.
     *
     * If true, an apply button is displayed inside the input box and fires the event (highlighted while the value is not applied).
     */
    withButton?: boolean;

    /**
     * Pattern.
     *
     * A regular expression the whole value must match (e.g., -?[0-9]+ for an integer without decimals). An invalid value is not fired.
     */
    pattern?: string;

    /**
     * Pattern Error Message.
     *
     * The message displayed when the value is not matching the pattern (e.g., You need to enter a valid number).
     */
    patternErrorMessage?: string;

}
