/**
 * The spinner when a widget is loading.
 */
export class ThemeIc3WidgetBoxSpinner {

    static readonly overlay = "Ic3WidgetBoxSpinner-spinnerOverlayEx";

    static readonly spinner = "Ic3WidgetBoxSpinner-spinner";

    static readonly spinnerProgress = "Ic3WidgetBoxSpinner-spinnerProgress";

}

export declare type ThemeIc3WidgetBoxSpinnerClassesKey = keyof ThemeIc3WidgetBoxSpinner;

export interface Ic3WidgetBoxSpinnerProps {
    /**
     * Size of the spinner. Default = 48.
     */
    size: number;
}