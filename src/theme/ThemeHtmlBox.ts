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
     * Used by the documentation dialog and possibly text box used for documentation.
     */
    "doc" |
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
