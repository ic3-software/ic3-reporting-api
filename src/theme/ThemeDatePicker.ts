import {SelectionBehaviour, TidyTableColumnSelector} from "../PublicTidyTableTypes";
import {FormFieldObject} from "../PublicTemplateForm";
import {PublicDateShortcutUtils} from "../PublicDateShortcutUtils";

// TOM : needs clarification
export class DatePickerClasses {

    /**
     * Style applied to the root element.
     */
    static readonly root = "ic3DatePicker-root";

    /**
     * Fix div inside the root.
     */
    static readonly container = "ic3DatePicker-container";


    static readonly rowDirection = "ic3DatePicker-row-direction";

    static readonly columnDirection = "ic3DatePicker-column-direction";

    /**
     * + Mui DatePicker and/or DateRangePicker classes
     */
    static readonly fieldSeparator = "ic3DatePicker-fieldSeparator";

    /**
     * Label showing the selected shortcut. Clicking this label opens the shortcut menu.
     */
    static readonly shortcutLabel = "ic3DatePicker-shortcutLabel";
}

export declare type DatePickerClassKey = keyof DatePickerClasses;

export enum DatePickerRangeDirection {
    auto = "AUTO",
    horizontal = "HORIZONTAL",
    vertical = "VERTICAL",
}

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
     * The label content (i.e Date)
     */
    label?: string;

    /**
     * Helper Text.
     *
     * A text below the date picker to help the user when entering the date
     */
    dateHelperText?: string;

    /**
     * Input Date Format.
     *
     * The input date format
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
     * The caption of the fired event.
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
     * The label content for the end date
     */
    endLabel?: string;

    // /**
    //  * Helper Text for the end date
    //  *
    //  * A text below the date picker to help the user when entering the date
    //  */
    // dateHelperEndText?: string;

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
     * The direction of the Picker, horizontal/vertical/auto
     *
     * "auto" will choose the direction depending on the ration width/height > 0.9
     */
    rangeDirection: DatePickerRangeDirection;
    /**
     * Dates.
     *
     * The column of the tidy table containing the dates to display.
     */
    dates?: TidyTableColumnSelector;

    /**
     * Shortcuts
     */
    shortcutsEnabled: boolean;

    /**
     *
     */
    shortcutsAnchorDate?: string;

    /**
     * From where to source the initial date.
     */
    initialDateFrom: InitialDateFrom;

    /**
     * Source the initial date/range from this shortcut.
     */
    initialShortcut?: string;

    /**
     * User can choose from the shortcuts in this group. Edit the groups in the theme plugin.
     */
    allowedShortcutGroup: string;

}

interface IShortcut<T> {
    /**
     * Show this name in the datepicker.
     *
     * Localize depending on the anchor date:
     * — if undefined, Translate with `shortcutItemsDatePicker.<name>` in the localization.
     * — if present, Translate with `shortcutItemsDatePicker.<name>.$anchor` in the localization. Fallback to translation with no anchor.
     */
    name: string;

    /**
     * Return the range of the dates that this shortcut selects. The date to return should be of type
     * Dayjs. See the `dayjs` library. Return `null` to clear the start/end value.
     */
    getValue: (util: PublicDateShortcutUtils) => T;

    /**
     * If an anchor date is defined, then this shortcut will show.
     * — true: only show the shortcut when there is an anchor date.
     * — false: do not show this shortcut when there is an anchor date.
     * — undefined: always show the shortcut.
     */
    needsAnchor?: boolean;
}

export type DatePickerShortcut = IShortcut<any>;

export type  DateRangePickerShortcut = IShortcut<[any, any]>;

export interface FilterDatePickerProps {

}

export enum InitialDateFrom {
    MANUAL_DATES = "manual",
    SHORTCUT = "shortcut",
}