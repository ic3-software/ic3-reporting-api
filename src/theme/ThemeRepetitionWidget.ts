import {FormFieldObject} from "../PublicTemplateForm";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";

/**
 * Repetition Widget Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: RepetitionWidget
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface RepetitionWidgetChartOptions extends FormFieldObject {

    /**
     * (Repetition) Rows.
     *
     * The items on the vertical axis. Refer to the editor documentation for default behavior.
     */
    row?: TidyTableColumnSelector;

    /**
     * (Repetition) Columns.
     *
     * The items on the horizontal axis. Refer to the editor documentation for default behavior.
     */
    column?: TidyTableColumnSelector;

    /**
     * Visual Row Count.
     *
     * Defaulted to the number of items in the vertical axis.
     */
    visualRowNumber?: number;

    /**
     * Visual Column Count.
     *
     * Defaulted to the number of items in the horizontal axis. When defined,
     * takes precedence over the visual column count.
     */
    visualColumnNumber?: number;

    /**
     * Right Padding.
     *
     * Defines the horizontal space between the repeated widgets.
     */
    rightPadding?: number;

    /**
     * Bottom Padding.
     *
     * Defines the vertical space between the repeated widgets.
     */
    bottomPadding?: number;

}

