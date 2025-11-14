import {FormFieldObject} from "../PublicTemplateForm";
import {FilterPanelChartOptions} from "./ThemeFilterPanel";

/**
 * Single Panel Filter Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID : ic3
 *      Widget/Template ID: SinglePanelFilter
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface SinglePanelFilterChartOptions extends FormFieldObject, Pick<FilterPanelChartOptions,
    "variant" | "initialFilterConfig" | "measureMdx" | "useSimpleFilterCutoff" | "useSimpleFilterCutoff" |
    "allowedOperatorsConfig" | "datePickerShortcuts" | "shortcutsAnchorDate" | "allowedShortcutGroup"> {

    /**
     * The ID of the level / hierarchy that is used in the filter. Equal to `IPGFilterItem.fieldId`.
     */
    levelId: string;

}

