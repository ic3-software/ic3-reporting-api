import {SelectionBehaviour, TidyTableColumnSelector} from "../PublicTidyTableTypes";
import {FormFieldObject} from "../PublicTemplateForm";

export class DatePickerClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "root";

    /**
     * + Mui DatePicker and/or DateRangePicker classes
     */
}

export declare type DatePickerClassKey = keyof DatePickerClasses;

/**
 * Date Picker Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: DatePicker
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface DatePickerChartOptions extends FormFieldObject {

    /**
     * Helper Text.
     *
     * Display this text when the datepicker is empty.
     */
    helperText?: string;

    /**
     * Input Date Format.
     *
     * The input date format using the [date-fns](https://date-fns.org/v2.23.0/docs/format) syntax.
     * For example, dd => 22, MM => 02, MMM => Jan, MMMM => January, yyyy => 2025, EEEE -> Monday).
     */
    dateFormat: string;

    /**
     * Initial Date.
     *
     * The initial date. If not defined, the value on the third data row. A 'today' expression can be used:
     * today (+|-) n (d|w|m|y). E.g., today -1w means today minus one week.
     */
    initialDate?: string;

    /**
     * Min. Date.
     *
     * The first valid date. If not defined, the value of the first data row.
     * A 'today' expression can be used: today (+|-) n (d|w|m|y). E.g., today -1w means today minus one week.
     */
    minDate?: string;

    /**
     * Max. Date.
     *
     * The last valid date. If not defined, the value of the second data row.
     * A 'today' expression can be used: today (+|-) n (d|w|m|y). E.g., today -1w means today minus one week.
     */
    maxDate?: string;

    /**
     * Empty Behavior.
     *
     * Controls what to do if the date picker is empty.
     */
    emptyBehaviour: SelectionBehaviour;

    /**
     * Date Caption.
     *
     * The caption of the fired event. A back ticked format string using the [date-fns](https://date-fns.org/v2.23.0/docs/format) syntax.
     * For example, dd => 22, MM => 02, MMM => Jan, MMMM => January, yyyy => 2025, EEEE => Monday.
     */
    dateToCaption: string;

    /**
     * Date Unique Name.
     *
     * The value/unique-name of the fired event. The following variables are available: `HierarchyUName`,
     * `LevelUName`, `anyValidFormatString` (note the back ticks).
     */
    dateToUniqueName: string;

    /**
     * Range Picker.
     */
    rangePicker: boolean;

    /**
     * Range Picker: Initial End Date.
     *
     * The initial end date. If not defined, the value of the fourth data row. A 'today' expression can be used:
     * today (+|-) n (d|w|m|y). E.g., today -1w means today minus one week.
     */
    initialEndDate?: string;

    /**
     * Range Picker: Helper Text (End).
     *
     * Placeholder value for the end of the range. The widget shows this when the end of the range is empty.
     */
    helperEndText?: string;

    /**
     * Range Picker: Center Text.
     *
     * The text being displayed between the two dates.
     */
    centerText?: string;

    /**
     * Range Picker: Range Caption.
     *
     * The caption of the fired event. The following variables are available: `startUName`, `startCaption`,
     * `endUName`, `endCaption` (note the back ticks).
     */
    rangeToCaption: string;

    /**
     * Range Picker: Range Unique Name.
     *
     * The value/unique-name of the fired event. The following variables are available: `startUName`,
     * `startCaption`, `endUName`, `endCaption` (note the back ticks).
     */
    rangeToUniqueName: string;

    /**
     * Dates.
     *
     * The column of the tidy table containing the dates to display.
     */
    dates?: TidyTableColumnSelector;

}
