import {FormFieldObject, IFormEventMappingArrayFieldDefType} from "../PublicTemplateForm";

/**
 * Embedded Report Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: EmbeddedReport
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface EmbeddedReportChartOptions extends FormFieldObject {

    /**
     * Dashboard Name.
     *
     * You can use an event (e.g., @{dashboard-path}).
     */
    "$-MDX-reportName": string;

    /**
     * Events (from/to).
     *
     * Forwarded events.
     */
    "@params"?: IFormEventMappingArrayFieldDefType;

}
