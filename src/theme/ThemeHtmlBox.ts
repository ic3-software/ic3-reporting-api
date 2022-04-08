import {IWidgetPublicContext} from "../PublicContext";

export interface HtmlBoxClasses {

    /**
     * Style applied to the root element.
     */
    root: string;

}

export declare type HtmlBoxClassKey = keyof HtmlBoxClasses;

export type HtmlBoxVariant =
    |
    "plain" |
    /**
     * Used by the editor documentation dialog and text box used for Live Demo documentation.
     */
    "doc" |
    /**
     * Used by the dashboard documentation dialog (e.g., filter panel usage, box help icon).
     */
    "dashboardDoc" |
    /**
     * Used by the widget box tooltip/help icon.
     */
    "widgetHelp" |
    /**
     * Used for data tooltips in the charts
     */
    "tooltip" |
    /**
     * Based on dashboard theme definition (h1,h2...)
     */
    "dashboardTheme"
    ;

export interface HtmlBoxProps {

    context?: IWidgetPublicContext;

    variant?: HtmlBoxVariant;

    html: string;

}
